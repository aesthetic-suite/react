/* eslint-disable no-magic-numbers, sort-keys */

import React from 'react';
import { View } from 'react-native';
import { LocalSheet } from '@aesthetic/core';
import { DirectionProvider, NativeBlock, NativeStyles, ThemeProvider } from '../../src';
import aesthetic from '../../src/aesthetic';

export function createStyleSheet() {
  return aesthetic.createComponentStyles((css) => ({
    button: {
      appearance: 'none',
      border: 0,
      cursor: 'pointer',
      margin: 0,
      padding: 0,
      textDecoration: 'none',
      userSelect: 'auto',
      verticalAlign: 'middle',
      position: 'relative',
      display: 'flex',
      textAlign: 'center',
      width: 'auto',
      backgroundColor: css.tokens.palette.brand.color['40'],
      color: css.tokens.palette.neutral.color['00'],

      ':hover': {
        backgroundColor: css.tokens.palette.brand.color['50'],
      },

      ':active': {
        backgroundColor: css.tokens.palette.brand.color['60'],
      },

      '@selectors': {
        '::-moz-focus-inner': {
          border: 0,
          padding: 0,
          margin: 0,
        },
      },

      '@variants': {
        size: {
          sm: {
            minWidth: css.unit(6),
            padding: `${css.tokens.spacing.md} ${css.tokens.spacing.df}`,
          },
          df: {
            minWidth: css.unit(8),
            padding: `${css.tokens.spacing.df} ${css.tokens.spacing.md}`,
          },
          lg: {
            minWidth: css.unit(10),
            padding: `${css.tokens.spacing.md} ${css.tokens.spacing.lg}`,
          },
        },
      },
    },

    button_block: {
      overflowWrap: 'normal',
      wordWrap: 'normal',
      wordBreak: 'normal',
      width: '100%',
      whiteSpace: 'normal',
      overflow: 'hidden',
    },

    button_disabled: {
      '@variants': {
        size: {
          sm: {
            opacity: 0.4,
          },
          df: {
            opacity: 0.5,
          },
          lg: {
            opacity: 0.6,
          },
        },
      },
    },
  }));
}

export interface ButtonProps {
  children: NonNullable<React.ReactNode>;
  block?: boolean;
  disabled?: boolean;
  href?: string;
  large?: boolean;
  small?: boolean;
  sheet?: LocalSheet<unknown, NativeBlock, NativeStyles>;
}

export interface WrapperProps {
  children?: React.ReactNode;
  direction?: 'ltr' | 'rtl';
  theme?: string;
}

export function Wrapper({ children, direction = 'ltr', theme = 'twilight' }: WrapperProps) {
  return (
    <DirectionProvider direction={direction} wrapper={<View />}>
      <ThemeProvider name={theme}>{children || <View />}</ThemeProvider>
    </DirectionProvider>
  );
}
