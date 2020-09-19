import React from 'react';
import { LocalSheet } from '@aesthetic/core';
import createHOC from './createHOC';
import useStyles from './useStyles';
import { WithStylesWrappedProps, WrapperProps, WrapperComponent } from './types';

/**
 * Wrap a React component with an HOC that injects the style to class name transfer function.
 */
export default function withStyles<T = unknown>(sheet: LocalSheet<T>) /* infer */ {
  return function withStylesComposer<Props extends object = {}>(
    WrappedComponent: React.ComponentType<Props & WithStylesWrappedProps<keyof T>>,
  ): React.FunctionComponent<Omit<Props, keyof WithStylesWrappedProps> & WrapperProps> &
    WrapperComponent {
    return createHOC('withStyles', WrappedComponent, function WithStyles({ wrappedRef, ...props }) {
      const cx = useStyles(sheet);

      return <WrappedComponent {...(props as any)} ref={wrappedRef} cx={cx} />;
    });
  };
}
