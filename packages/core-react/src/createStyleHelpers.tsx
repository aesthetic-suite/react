import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Aesthetic, Theme, LocalSheet } from '@aesthetic/core';
import { Direction } from '@aesthetic/types';
import { isSSR } from '@aesthetic/utils';
import createHOC from './createHOC';
import {
  StyleResultGenerator,
  WithStylesWrappedProps,
  WrapperComponent,
  WrapperProps,
} from './types';

export default function createStyleHelpers<Result>(
  aesthetic: Aesthetic,
  {
    generate,
    useDirection,
    useTheme,
  }: {
    generate: (keys: unknown[], result: any, cache: Record<string, Result>) => Result;
    useDirection: () => Direction;
    useTheme: () => Theme;
  },
) /* infer */ {
  /**
   * Hook within a component to provide a style sheet.
   */
  function useStyles<T = unknown>(sheet: LocalSheet<T>): StyleResultGenerator<keyof T, Result> {
    const direction = useDirection();
    const theme = useTheme();
    const cache = useRef<Record<string, Result>>({});

    // Render the styles immediately for SSR since effects do not run
    const [result, setResult] = useState<Record<string, any>>(() => {
      if (isSSR() || global.AESTHETIC_CUSTOM_ENGINE) {
        return aesthetic.renderComponentStyles(sheet, {
          direction,
          theme: theme.name,
        });
      }

      return {};
    });

    // Re-render styles when the theme or direction change
    useEffect(() => {
      cache.current = {};

      setResult(
        aesthetic.renderComponentStyles(sheet, {
          direction,
          theme: theme.name,
        }),
      );
      // It wants to include `sheet` but that triggers an infinite render loop
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction, theme]);

    return useCallback((...keys: unknown[]) => generate(keys, result, cache.current), [result]);
  }

  /**
   * Wrap a React component with an HOC that injects the style to class name transfer function.
   */
  function withStyles<T = unknown>(sheet: LocalSheet<T>) /* infer */ {
    return function withStylesComposer<Props extends object = {}>(
      WrappedComponent: React.ComponentType<Props & WithStylesWrappedProps<keyof T, Result>>,
    ): React.FunctionComponent<Omit<Props, keyof WithStylesWrappedProps> & WrapperProps> &
      WrapperComponent {
      return createHOC(
        'withStyles',
        WrappedComponent,
        function WithStyles({ wrappedRef, ...props }) {
          const cx = useStyles(sheet);

          return <WrappedComponent {...(props as any)} ref={wrappedRef} cx={cx} />;
        },
      );
    };
  }

  return {
    useStyles,
    withStyles,
  };
}
