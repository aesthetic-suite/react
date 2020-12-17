import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Aesthetic, Theme, LocalSheet, RenderResultSheet } from '@aesthetic/core';
import { Direction } from '@aesthetic/types';
import { isDOM, isObject, objectLoop } from '@aesthetic/utils';
import createHOC from './createHOC';
import {
  StyleResultGenerator,
  WithStylesWrappedProps,
  WrapperComponent,
  WrapperProps,
} from './types';

export default function createStyleHelpers<Result, Block extends object>(
  aesthetic: Aesthetic<Result, Block>,
  {
    generate,
    useDirection,
    useTheme,
  }: {
    generate: <T extends string>(
      keys: T[],
      variants: string[],
      results: RenderResultSheet<Result>,
    ) => Result;
    useDirection: () => Direction;
    useTheme: () => Theme<Block>;
  },
) /* infer */ {
  function cxWithCache(
    keys: unknown[],
    results: RenderResultSheet<Result>,
    cache: Record<string, Result>,
  ): Result {
    const variants: string[] = [];
    let cacheKey = '';

    // Variant objects may only be passed as the first argument
    if (isObject(keys[0])) {
      objectLoop(keys.shift() as object, (value, subType) => {
        const type = `${subType}_${value}`;

        variants.push(type);
        cacheKey += type;
      });
    }

    cacheKey += keys.filter(Boolean).join('');

    if (!cache[cacheKey]) {
      // eslint-disable-next-line no-param-reassign
      cache[cacheKey] = generate(keys as string[], variants, results);
    }

    return cache[cacheKey];
  }

  /**
   * Hook within a component to provide a style sheet.
   */
  function useStyles<T = unknown>(
    sheet: LocalSheet<T, Block, Result>,
  ): StyleResultGenerator<keyof T, Result> {
    const direction = useDirection();
    const theme = useTheme();
    const cache = useRef<Record<string, Result>>({});

    // Render the styles immediately for SSR since effects do not run
    const [result, setResult] = useState<Record<string, any>>(() => {
      if (!isDOM() || global.AESTHETIC_CUSTOM_ENGINE) {
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

    return useCallback((...keys: unknown[]) => cxWithCache(keys, result, cache.current), [result]);
  }

  /**
   * Wrap a React component with an HOC that injects the style to class name transfer function.
   */
  function withStyles<T = unknown>(sheet: LocalSheet<T, Block, Result>) /* infer */ {
    return function withStylesComposer<Props extends object = {}>(
      WrappedComponent: React.ComponentType<Props & WithStylesWrappedProps<keyof T, Result>>,
    ): React.FunctionComponent<
      Omit<Props, keyof WithStylesWrappedProps<keyof T, Result>> & WrapperProps
    > &
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
