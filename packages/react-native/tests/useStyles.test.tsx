/* eslint-disable react/jsx-no-literals */

import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { useStyles } from '../src';
import { ButtonProps, createStyleSheet, Wrapper } from './__mocks__/Button';
import { dawnTheme, setupAestheticReact, teardownAestheticReact, twilightTheme } from './helpers';

describe('useStyles()', () => {
  function Button({ children, compound, block, disabled, large, small }: ButtonProps) {
    const sx = useStyles(createStyleSheet());

    return (
      <View
        testID="button"
        style={sx(
          {
            compound,
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

    expect(result.getByTestId('button').props.style).toEqual([
      {
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
      },
      { minWidth: '10rem', padding: '1.25rem 2.50rem' },
    ]);
  });

  it('changes styles based on props enabled', () => {
    const result = render(<Button>Child</Button>, {
      wrapper: Wrapper,
    });

    expect(result.getByTestId('button').props.style).toEqual([
      expect.objectContaining({ width: 'auto' }),
      expect.objectContaining({ minWidth: '10rem' }),
    ]);

    result.update(<Button disabled>Child</Button>);

    expect(result.getByTestId('button').props.style).toEqual([
      expect.objectContaining({ width: 'auto' }),
      expect.objectContaining({ minWidth: '10rem' }),
      {},
      expect.objectContaining({ opacity: 0.5 }),
    ]);

    result.update(
      <Button block large>
        Child
      </Button>,
    );

    expect(result.getByTestId('button').props.style).toEqual([
      expect.objectContaining({ width: 'auto' }),
      expect.objectContaining({ minWidth: '12.50rem' }),
      expect.objectContaining({ width: '100%' }),
    ]);
  });

  it('includes variants and compound variants when activated', () => {
    const result = render(
      <Button large compound="test">
        Child
      </Button>,
      {
        wrapper: Wrapper,
      },
    );

    expect(result.getByTestId('button').props.style).toEqual([
      expect.objectContaining({
        display: 'flex',
      }),
      {
        minWidth: '12.50rem',
        padding: '2.50rem 3.75rem',
      },
      {
        transform: [{ scale: 2 }],
      },
    ]);

    // Test compound no longer matches
    result.update(
      <Button large compound="invalid">
        Child
      </Button>,
    );

    expect(result.getByTestId('button').props.style).toEqual([
      expect.objectContaining({
        display: 'flex',
      }),
      {
        minWidth: '12.50rem',
        padding: '2.50rem 3.75rem',
      },
    ]);

    // Test other element variants are applied
    result.update(
      <Button disabled large compound="test">
        Child
      </Button>,
    );

    expect(result.getByTestId('button').props.style).toEqual([
      expect.objectContaining({
        display: 'flex',
      }),
      {
        minWidth: '12.50rem',
        padding: '2.50rem 3.75rem',
      },
      {
        transform: [{ scale: 2 }],
      },
      // Disabled styles
      {},
      { opacity: 0.6 },
      {
        transform: [{ scale: 0 }],
      },
    ]);
  });

  it('returns an empty array if no selectors enabled', () => {
    const result = render(<StylelessButton>Child</StylelessButton>, {
      wrapper: Wrapper,
    });

    expect(result.getByTestId('button').props.style).toEqual([]);
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
