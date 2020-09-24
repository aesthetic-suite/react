import React from 'react';
import {
  createComponentStyles,
  renderComponentStyles,
  LocalBlock,
  Utilities,
  LocalSheet,
} from '@aesthetic/core';
import useStyles from './useStyles';
import { ElementType, InferProps, StyledInheritedProps } from './types';

function getVariantsFromProps<V extends object>(styleSheet: LocalSheet<{}>, props: object): V {
  const variants: Record<string, unknown> = {};

  styleSheet.metadata.element?.variantTypes?.forEach((name) => {
    if (name in props) {
      variants[name] = (props as Record<string, unknown>)[name];
    }
  });

  return variants as V;
}

export default function createStyled<
  T extends ElementType | React.ComponentType,
  V extends object = {}
>(
  type: T,
  factory: LocalBlock | ((utilities: Utilities<LocalBlock>) => LocalBlock),
): React.ForwardRefExoticComponent<InferProps<T> & StyledInheritedProps & V> {
  if (__DEV__) {
    const typeOfType = typeof type;
    const typeOfFactory = typeof factory;

    if (typeOfType !== 'string' && typeOfType !== 'object') {
      throw new TypeError(
        `Styled components must extend an HTML element or React component, found ${typeOfType}.`,
      );
    }

    if (typeOfFactory !== 'function' && typeOfFactory !== 'object') {
      throw new TypeError(
        `Styled components require a style sheet factory function, found ${typeOfFactory}.`,
      );
    }
  }

  const styleSheet = createComponentStyles((utils) => ({
    element: typeof factory === 'function' ? factory(utils) : factory,
  }));

  // Attempt to render styles immediately so that they're available on mount
  renderComponentStyles(styleSheet);

  // Use `forwardRef` so that consumer can access the underlying element
  const Component = React.forwardRef<unknown, { className?: string }>((props, ref) => {
    const cx = useStyles(styleSheet);
    let className = cx(getVariantsFromProps(styleSheet, props), 'element');

    if (props.className) {
      className += ` ${props.className}`;
    }

    return React.createElement(type, {
      ...props,
      // These dont type correctly because all of our inference
      // @ts-expect-error
      className,
      ref,
    });
  });

  const displayName =
    typeof type === 'string'
      ? String(type)
      : String((type as React.ComponentType).displayName || (type as Function).name);

  Component.displayName = `styled(${displayName})`;

  // Use the return type of `createStyled` instead of `forwardRef`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Component as any;
}
