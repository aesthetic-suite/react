import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Aesthetic, Direction, LocalSheet, RenderResultSheet, Theme } from '@aesthetic/core';
import { isObject, objectLoop } from '@aesthetic/utils';
import createHOC from './createHOC';
import {
  StyleResultGenerator,
  StyleResultVariants,
  WithStylesWrappedProps,
  WrapperComponent,
  WrapperProps,
} from './types';

interface StyleHelperOptions<Result, Block extends object> {
  generate: <T extends string>(
    keys: T[],
    variants: Set<string>,
    results: RenderResultSheet<Result>,
  ) => Result;
  useDirection: () => Direction;
  useTheme: () => Theme<Block>;
}

export default function createStyleHelpers<Result, Block extends object>(
  aesthetic: Aesthetic<Result, Block>,
  { generate, useDirection, useTheme }: StyleHelperOptions<Result, Block>,
) /* infer */ {
  function cxWithCache(
    keys: unknown[],
    results: RenderResultSheet<Result>,
    cache: Record<string, Result>,
  ): Result {
    const variants = new Set<string>();
    let cacheKey = '';

    // Variant objects may only be passed as the first argument
    if (isObject(keys[0])) {
      objectLoop(keys.shift() as StyleResultVariants, (value, variant) => {
        if (value) {
          const type = `${variant}:${value}`;

          variants.add(type);
          cacheKey += type;
        }
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
    const theme = useTheme();
    const direction = useDirection();
    const classCache = useRef<Record<string, Result>>({});
    const initialMount = useRef(true);
    const [result, setResult] = useState<RenderResultSheet<Result>>(() =>
      aesthetic.renderComponentStyles(sheet, {
        direction,
        theme: theme.name,
      }),
    );

    useEffect(() => {
      // Avoid double rendering on first mount
      if (initialMount.current) {
        initialMount.current = false;

        return;
      }

      // Reset cache since styles are changing
      classCache.current = {};

      // Re-render styles when the theme or direction change
      setResult(
        aesthetic.renderComponentStyles(sheet, {
          direction,
          theme: theme.name,
        }),
      );

      // It wants to include `sheet` but that triggers an infinite render loop
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction, theme.name]);

    const cx = useCallback((...keys: unknown[]) => cxWithCache(keys, result, classCache.current), [
      result,
    ]) as StyleResultGenerator<keyof T, Result>;

    // Make the result available if need be, but behind a hidden API
    cx.result = result;

    return cx;
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
        // eslint-disable-next-line prefer-arrow-callback
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
