import React from 'react';
import { createComponentStyles, LocalBlock, Utilities, LocalSheet } from '@aesthetic/core';
import useStyles from './useStyles';
import { ElementType } from './types';

function getVariantsFromProps<V extends object>(styleSheet: LocalSheet<{}>, props: object): V {
  const variants: Record<string, unknown> = {};

  styleSheet.metadata.element?.variantTypes.forEach((name) => {
    if (name in props) {
      variants[name] = (props as Record<string, unknown>)[name];
    }
  });

  return variants as V;
}

export default function createStyled<T extends ElementType, V extends object = {}>(
  type: T,
  factory: LocalBlock | ((utilities: Utilities<LocalBlock>) => LocalBlock),
): React.ForwardRefExoticComponent<JSX.IntrinsicElements[T] & V> {
  if (__DEV__) {
    const typeOfFactory = typeof factory;

    if (typeOfFactory !== 'function' && typeOfFactory !== 'object') {
      throw new TypeError(
        `Styled components require a style sheet factory function, found ${typeOfFactory}.`,
      );
    }
  }

  const styleSheet = createComponentStyles((utils) => ({
    element: typeof factory === 'function' ? factory(utils) : factory,
  }));

  const Component = React.forwardRef<unknown, JSX.IntrinsicElements[T] & V>((props, ref) => {
    const cx = useStyles(styleSheet);
    let className = cx(getVariantsFromProps(styleSheet, props), 'element');

    if (props.className) {
      className += ` ${props.className}`;
    }

    return React.createElement(type, {
      ...props,
      className,
      ref,
    });
  });

  Component.displayName = `styled(${type})`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Component as any;
}
