import React from 'react';
import { createComponentStyles, LocalBlock, Utilities } from '@aesthetic/core';
import useStyles from './useStyles';

export default function createStyled<T extends keyof JSX.IntrinsicElements>(
  type: T,
  factory: (utilities: Utilities<LocalBlock>) => LocalBlock,
): React.ForwardRefExoticComponent<JSX.IntrinsicElements[T]> {
  if (__DEV__) {
    if (typeof factory !== 'function') {
      throw new TypeError(
        `Styled components require a style sheet factory function, found ${typeof factory}.`,
      );
    }
  }

  const styleSheet = createComponentStyles((utils) => ({
    element: factory(utils),
  }));

  const Component = React.forwardRef<unknown, JSX.IntrinsicElements[T]>((props, ref) => {
    const cx = useStyles(styleSheet);
    let className = cx('element');

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

  return Component;
}
