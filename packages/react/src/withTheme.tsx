import React from 'react';
import createHOC from './createHOC';
import useTheme from './useTheme';
import { WithThemeWrappedProps, WrapperProps, WrapperComponent } from './types';

/**
 * Wrap a React component with an HOC that injects the current theme object as a prop.
 */
export default function withTheme() /* infer */ {
  return function withThemeComposer<Props extends object = {}>(
    WrappedComponent: React.ComponentType<Props & WithThemeWrappedProps>,
  ): React.FunctionComponent<Omit<Props, keyof WithThemeWrappedProps> & WrapperProps> &
    WrapperComponent {
    return createHOC('withTheme', WrappedComponent, function WithTheme({ wrappedRef, ...props }) {
      const theme = useTheme();

      return <WrappedComponent {...(props as any)} ref={wrappedRef} theme={theme} />;
    });
  };
}
