/* eslint-disable no-magic-numbers, sort-keys */

import React from 'react';
import { ClassName, ElementStyles, LocalSheet } from '@aesthetic/core';
import { DirectionProvider, ThemeProvider } from '../../src';
import aesthetic from '../../src/aesthetic';

export function createStyleSheet() {
  return aesthetic.createComponentStyles((css) => ({
    button: css.mixin('reset-button', {
      position: 'relative',
      display: 'inline-flex',
      textAlign: 'center',
      backgroundColor: css.var('palette-brand-color-40'),
      color: css.var('palette-neutral-color-00'),
      borderColor: css.var('palette-neutral-color-40'),
      borderStyle: 'solid',
      borderWidth: css.var('border-df-width'),
      borderRadius: css.var('border-df-radius'),

      ':hover': {
        backgroundColor: css.var('palette-brand-color-50'),
      },

      ':active': {
        backgroundColor: css.var('palette-brand-color-60'),
      },

      '@selectors': {
        '::-moz-focus-inner': {
          border: 0,
          padding: 0,
          margin: 0,
        },
      },

      '@variants': {
        'size:sm': {
          minWidth: css.unit(6),
          padding: `${css.var('spacing-sm')} ${css.var('spacing-df')}`,
        },
        'size:df': {
          minWidth: css.unit(8),
          padding: `${css.var('spacing-df')} ${css.var('spacing-md')}`,
        },
        'size:lg': {
          minWidth: css.unit(10),
          padding: `${css.var('spacing-md')} ${css.var('spacing-lg')}`,
        },
      },
    }),

    button_block: css.mixin('text-wrap', {
      display: 'block',
      width: '100%',
      whiteSpace: 'normal',
      overflow: 'hidden',
    }),

    button_disabled: {
      '@variants': {
        'size:sm': {
          opacity: 0.4,
        },
        'size:df': {
          opacity: 0.5,
        },
        'size:lg': {
          opacity: 0.6,
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
  sheet?: LocalSheet<unknown, ElementStyles, ClassName>;
}

export interface WrapperProps {
  children?: React.ReactNode;
  direction?: 'ltr' | 'rtl';
  theme?: string;
}

export function Wrapper({ children, direction = 'ltr', theme = 'twilight' }: WrapperProps) {
  return (
    <DirectionProvider direction={direction} wrapper={<div />}>
      <ThemeProvider name={theme}>{children || <div />}</ThemeProvider>
    </DirectionProvider>
  );
}
