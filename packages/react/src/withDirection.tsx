import React from 'react';
import createHOC from './createHOC';
import useDirection from './useDirection';
import { WithDirectionWrappedProps, WrapperProps, WrapperComponent } from './types';

/**
 * Wrap a React component with an HOC that injects the current direction object as a prop.
 */
export default function withDirection() /* infer */ {
  return function withDirectionComposer<Props extends object = {}>(
    WrappedComponent: React.ComponentType<Props & WithDirectionWrappedProps>,
  ): React.FunctionComponent<Omit<Props, keyof WithDirectionWrappedProps> & WrapperProps> &
    WrapperComponent {
    return createHOC('withDirection', WrappedComponent, function WithDirection({
      wrappedRef,
      ...props
    }) {
      const direction = useDirection();

      return <WrappedComponent {...(props as any)} ref={wrappedRef} direction={direction} />;
    });
  };
}
