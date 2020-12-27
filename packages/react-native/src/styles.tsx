import React from 'react';
import { Utilities } from '@aesthetic/core';
import { createStyleHelpers } from '@aesthetic/core-react';
import { arrayLoop } from '@aesthetic/utils';
import aesthetic from './aesthetic';
import { useDirection } from './direction';
import { useTheme } from './theme';
import { InferProps, StyledComponent, NativeBlock, NativeStyles } from './types';

export const { getVariantsFromProps, useStyles, withStyles } = createStyleHelpers(aesthetic, {
  generate(keys, variants, results) {
    let style: NativeStyles = {};

    arrayLoop(keys, (key) => {
      const hash = results[key];

      if (!hash) {
        return;
      }

      if (hash.result) {
        style = hash.result;
      }

      if (hash.variants) {
        arrayLoop(variants, (variant) => {
          if (hash.variants?.[variant]) {
            Object.assign(style, hash.variants[variant]);
          }
        });
      }
    });

    return style;
  },
  useDirection,
  useTheme,
});

export function createStyled<T extends React.ComponentType<any>, V extends object = {}>(
  type: T,
  factory: NativeBlock | ((utilities: Utilities<NativeBlock>) => NativeBlock),
): StyledComponent<InferProps<T> & V> {
  if (__DEV__) {
    const typeOfType = typeof type;
    const typeOfFactory = typeof factory;

    if (typeOfType !== 'string' && typeOfType !== 'function' && typeOfType !== 'object') {
      throw new TypeError(`Styled components must extend a View component, found ${typeOfType}.`);
    }

    if (typeOfFactory !== 'function' && typeOfFactory !== 'object') {
      throw new TypeError(
        `Styled components require a style sheet factory function, found ${typeOfFactory}.`,
      );
    }
  }

  const styleSheet = aesthetic.createComponentStyles((utils) => ({
    element: typeof factory === 'function' ? factory(utils) : factory,
  }));

  const Component = React.memo(
    React.forwardRef((baseProps, ref) => {
      const cx = useStyles(styleSheet);
      const { props, variants } = getVariantsFromProps<'style'>(styleSheet, baseProps);
      let style: NativeStyles | NativeStyles[] = cx(variants, 'element');

      if (props.style) {
        style = [style, props.style];
      }

      return React.createElement(type, {
        ...props,
        ref,
        style,
      });
    }),
  );

  const displayName =
    typeof type === 'string'
      ? String(type)
      : String((type as React.ComponentType).displayName || (type as Function).name);

  Component.displayName = `styled(${displayName})`;

  (Component as StyledComponent).styleSheet = styleSheet;

  // Use the return type of `createStyled` instead of `forwardRef`
  return Component as any;
}
