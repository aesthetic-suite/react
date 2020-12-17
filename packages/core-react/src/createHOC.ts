/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { WrapperComponent } from './types';

export default function createHOC<T extends React.FunctionComponent<any>>(
  name: string,
  WrappedComponent: React.ComponentType<any>,
  BaseComponent: T,
): T & WrapperComponent {
  const Component = BaseComponent as T & WrapperComponent;

  hoistNonReactStatics(Component, WrappedComponent);

  Component.displayName = `${name}(${WrappedComponent.displayName || WrappedComponent.name})`;
  Component.WrappedComponent = WrappedComponent;

  return Component;
}
