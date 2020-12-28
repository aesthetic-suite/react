/* eslint-disable react/jsx-no-literals */

import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { useStyles } from '../src';
import { createStyleSheet, ButtonProps, Wrapper } from './__mocks__/Button';
import { dawnTheme, setupAestheticReact, teardownAestheticReact, twilightTheme } from './helpers';

describe('useStyles()', () => {
  function Button({ children, block, disabled, large, small }: ButtonProps) {
    const cx = useStyles(createStyleSheet());

    return (
      <View
        testID="button"
        style={cx(
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
      </View>
    );
  }

  function CustomSheetButton({ children, sheet }: ButtonProps) {
    const cx = useStyles(sheet!);

    return (
      <View testID="button" style={cx()}>
        {children}
      </View>
    );
  }

  function StylelessButton({ children, disabled }: ButtonProps) {
    const cx = useStyles(createStyleSheet());

    return (
      <View testID="button" style={cx(disabled && 'button_disabled')}>
        {children}
      </View>
    );
  }

  beforeEach(() => {
    setupAestheticReact();
  });

  afterEach(() => {
    teardownAestheticReact();
  });

  it('renders a button and its base styles', () => {
    const result = render(<Button>Child</Button>, {
      wrapper: Wrapper,
    });

    expect(result.getByTestId('button').props.style).toEqual({
      '::-moz-focus-inner': {
        border: 0,
        margin: 0,
        padding: 0,
      },
      ':active': {
        backgroundColor: '#000',
      },
      ':hover': {
        backgroundColor: '#000',
      },
      appearance: 'none',
      backgroundColor: '#000',
      border: 0,
      color: '#000',
      cursor: 'pointer',
      display: 'flex',
      margin: 0,
      padding: 0,
      position: 'relative',
      textAlign: 'center',
      textDecoration: 'none',
      userSelect: 'auto',
      width: 'auto',
      verticalAlign: 'middle',
    });
  });

  it('changes styles based on props enabled', () => {
    const result = render(<Button>Child</Button>, {
      wrapper: Wrapper,
    });

    expect(result.getByTestId('button').props.style).toEqual(
      expect.objectContaining({ width: 'auto' }),
    );

    result.update(<Button disabled>Child</Button>);

    expect(result.getByTestId('button').props.style).toEqual(
      expect.objectContaining({ opacity: 0.5 }),
    );

    result.update(
      <Button block large>
        Child
      </Button>,
    );

    expect(result.getByTestId('button').props.style).toEqual(
      expect.objectContaining({ width: '100%', opacity: 0.6 }),
    );
  });

  it('returns an empty object if no selectors enabled', () => {
    const result = render(<StylelessButton>Child</StylelessButton>, {
      wrapper: Wrapper,
    });

    expect(result.getByTestId('button').props.style).toEqual({});
  });

  it('only renders once unless theme or direction change', () => {
    const sheet = createStyleSheet();
    const spy = jest.spyOn(sheet, 'render');

    const { update } = render(<CustomSheetButton sheet={sheet}>Child</CustomSheetButton>, {
      wrapper: Wrapper,
    });

    update(<CustomSheetButton sheet={sheet}>Child</CustomSheetButton>);
    update(<CustomSheetButton sheet={sheet}>Child</CustomSheetButton>);
    update(<CustomSheetButton sheet={sheet}>Child</CustomSheetButton>);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('re-renders if direction changes', () => {
    const sheet = createStyleSheet();
    const spy = jest.spyOn(sheet, 'render');

    const { rerender } = render(
      <Wrapper>
        <CustomSheetButton sheet={sheet}>Child</CustomSheetButton>
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
        <CustomSheetButton sheet={sheet}>Child</CustomSheetButton>
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
    const spy = jest.spyOn(sheet, 'render');

    const { rerender } = render(
      <Wrapper>
        <CustomSheetButton sheet={sheet}>Child</CustomSheetButton>
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
        <CustomSheetButton sheet={sheet}>Child</CustomSheetButton>
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

  it('re-renders when direction and theme change', () => {
    const sheet = createStyleSheet();
    const spy = jest.spyOn(sheet, 'render');

    const { rerender } = render(
      <Wrapper>
        <CustomSheetButton sheet={sheet}>Child</CustomSheetButton>
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
      <Wrapper direction="rtl" theme="dawn">
        <CustomSheetButton sheet={sheet}>Child</CustomSheetButton>
      </Wrapper>,
    );

    // Annoying that this fires multiple times, possible to batch?
    expect(spy).toHaveBeenCalledTimes(3);

    expect(spy).toHaveBeenCalledWith(
      expect.anything(),
      twilightTheme,
      expect.objectContaining({
        direction: 'rtl',
        theme: 'twilight',
      }),
    );

    expect(spy).toHaveBeenCalledWith(
      expect.anything(),
      dawnTheme,
      expect.objectContaining({
        direction: 'rtl',
        theme: 'dawn',
      }),
    );
  });
});
