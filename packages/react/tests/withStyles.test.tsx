/* eslint-disable react/jsx-no-literals */

import React from 'react';
import { render } from 'rut-dom';
import { getRenderedStyles } from '@aesthetic/style/lib/test';
import { withStyles, ThemeProvider, WithStylesWrappedProps } from '../src';
import { createStyleSheet, ButtonProps, Wrapper } from './__mocks__/Button';
import { dawnTheme, setupAestheticReact, teardownAestheticReact, twilightTheme } from './helpers';

describe('withStyles()', () => {
  beforeEach(() => {
    setupAestheticReact();
  });

  afterEach(() => {
    teardownAestheticReact();
  });

  function BaseButton({
    children,
    cx,
    block,
    disabled,
    large,
    small,
  }: ButtonProps &
    WithStylesWrappedProps<
      'button' | 'button_block' | 'button_disabled' | 'button_large' | 'button_small'
    >) {
    return (
      <button
        type="button"
        className={cx(
          {
            // eslint-disable-next-line no-nested-ternary
            size: large ? 'lg' : small ? 'sm' : 'df',
          },
          'button',
          block && 'button_block',
          disabled && 'button_disabled',
        )}
      >
        {children}
      </button>
    );
  }

  // Props need to exist for generic inheritance to work correctly
  interface BaseComponentProps {
    unknown?: unknown;
  }

  function BaseComponent(props: BaseComponentProps & WithStylesWrappedProps<string>) {
    return null;
  }

  function WrappingComponent({ children }: { children?: React.ReactNode }) {
    return <ThemeProvider name="dawn">{children || <div />}</ThemeProvider>;
  }

  it('inherits name from component `constructor.name`', () => {
    const Wrapped = withStyles(createStyleSheet())(BaseComponent);

    expect(Wrapped.displayName).toBe('withStyles(BaseComponent)');
  });

  it('inherits name from component `displayName`', () => {
    function DisplayComponent() {
      return null;
    }

    DisplayComponent.displayName = 'CustomDisplayName';

    const Wrapped = withStyles(createStyleSheet())(DisplayComponent);

    expect(Wrapped.displayName).toBe('withStyles(CustomDisplayName)');
  });

  it('stores the original component as a static property', () => {
    const Wrapped = withStyles(createStyleSheet())(BaseComponent);

    expect(Wrapped.WrappedComponent).toBe(BaseComponent);
  });

  it('can bubble up the ref with `wrappedRef`', () => {
    interface RefProps {
      unknown?: boolean;
    }

    // eslint-disable-next-line react/prefer-stateless-function
    class RefComponent extends React.Component<RefProps & WithStylesWrappedProps<string>> {
      render() {
        return <div />;
      }
    }

    let foundRef: Function | null = null;
    const Wrapped = withStyles(createStyleSheet())(RefComponent);

    render<{}>(
      <Wrapped
        wrappedRef={(ref: Function | null) => {
          foundRef = ref;
        }}
      />,
      { wrapper: <WrappingComponent /> },
    );

    expect(foundRef).not.toBeNull();
    expect(foundRef!.constructor.name).toBe('RefComponent');
  });

  it('renders a button and its base styles', () => {
    const Button = withStyles(createStyleSheet())(BaseButton);
    const { root } = render<ButtonProps>(<Button>Child</Button>, {
      wrapper: <Wrapper />,
    });

    expect(root.findOne('button')).toHaveProp(
      'className',
      'a b c d e f g h i j k l m n o p q r s t u v w z a1',
    );

    expect(getRenderedStyles('standard')).toMatchSnapshot();
  });

  it('only renders once unless theme or direction change', () => {
    const sheet = createStyleSheet();
    const Button = withStyles(sheet)(BaseButton);
    const spy = jest.spyOn(sheet, 'render');

    const { update } = render<ButtonProps>(<Button sheet={sheet}>Child</Button>, {
      wrapper: <Wrapper />,
    });

    update();
    update();
    update();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('re-renders if direction changes', () => {
    const sheet = createStyleSheet();
    const Button = withStyles(sheet)(BaseButton);
    const spy = jest.spyOn(sheet, 'render');

    const { rerender } = render<ButtonProps>(
      <Wrapper>
        <Button sheet={sheet}>Child</Button>
      </Wrapper>,
    );

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.anything(),
      twilightTheme,
      expect.objectContaining({
        direction: 'ltr',
        theme: 'twilight',
      }),
    );

    rerender(
      <Wrapper direction="rtl">
        <Button sheet={sheet}>Child</Button>
      </Wrapper>,
    );

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(
      expect.anything(),
      twilightTheme,
      expect.objectContaining({
        direction: 'rtl',
        theme: 'twilight',
      }),
    );
  });

  it('re-renders if theme changes', () => {
    const sheet = createStyleSheet();
    const Button = withStyles(sheet)(BaseButton);
    const spy = jest.spyOn(sheet, 'render');

    const { rerender } = render<ButtonProps>(
      <Wrapper>
        <Button sheet={sheet}>Child</Button>
      </Wrapper>,
    );

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.anything(),
      twilightTheme,
      expect.objectContaining({
        direction: 'ltr',
        theme: 'twilight',
      }),
    );

    rerender(
      <Wrapper theme="dawn">
        <Button sheet={sheet}>Child</Button>
      </Wrapper>,
    );

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(
      expect.anything(),
      dawnTheme,
      expect.objectContaining({
        direction: 'ltr',
        theme: 'dawn',
      }),
    );
  });
});
