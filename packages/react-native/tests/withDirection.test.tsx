import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { DirectionProvider, withDirection, WithDirectionWrappedProps } from '../src';
import { setupAestheticReact, teardownAestheticReact } from './helpers';

describe('withDirection()', () => {
  beforeEach(() => {
    setupAestheticReact();
  });

  afterEach(() => {
    teardownAestheticReact();
  });

  function BaseComponent(props: WithDirectionWrappedProps) {
    return null;
  }

  function WrappingComponent({ children }: { children?: React.ReactNode }) {
    return <DirectionProvider direction="ltr">{children || <View />}</DirectionProvider>;
  }

  it('inherits name from component `constructor.name`', () => {
    const Wrapped = withDirection()(BaseComponent);

    expect(Wrapped.displayName).toBe('withDirection(BaseComponent)');
  });

  it('inherits name from component `displayName`', () => {
    function DisplayComponent() {
      return null;
    }

    DisplayComponent.displayName = 'CustomDisplayName';

    const Wrapped = withDirection()(DisplayComponent);

    expect(Wrapped.displayName).toBe('withDirection(CustomDisplayName)');
  });

  it('stores the original component as a static property', () => {
    const Wrapped = withDirection()(BaseComponent);

    expect(Wrapped.WrappedComponent).toBe(BaseComponent);
  });

  it('receives direction from provider', () => {
    function DirComponent(props: { direction?: {} }) {
      return <View />;
    }

    const Wrapped = withDirection()(DirComponent);
    const result = render(<Wrapped />, { wrapper: WrappingComponent });

    expect(result.UNSAFE_getByType(DirComponent).props.direction).toBe('ltr');
  });

  it('can bubble up the ref with `wrappedRef`', () => {
    interface RefProps {
      unknown?: boolean;
    }

    // eslint-disable-next-line react/prefer-stateless-function
    class RefComponent extends React.Component<RefProps & WithDirectionWrappedProps> {
      override render() {
        return <View />;
      }
    }

    let foundRef: Function | null = null;
    const Wrapped = withDirection()(RefComponent);

    render(
      <Wrapped
        wrappedRef={(ref: Function | null) => {
          foundRef = ref;
        }}
      />,
      { wrapper: WrappingComponent },
    );

    expect(foundRef).not.toBeNull();
    expect(foundRef!.constructor.name).toBe('RefComponent');
  });

  it('returns new direction if direction context changes', () => {
    const Wrapped = withDirection()(BaseComponent);
    const result = render(
      <DirectionProvider direction="rtl">
        <Wrapped />
      </DirectionProvider>,
    );

    expect(result.UNSAFE_getByType(BaseComponent).props.direction).toBe('rtl');

    result.update(
      <DirectionProvider direction="ltr">
        <Wrapped />
      </DirectionProvider>,
    );

    expect(result.UNSAFE_getByType(BaseComponent).props.direction).toBe('ltr');
  });
});
