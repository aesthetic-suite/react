// Any must be used here for consumers to be typed correctly.
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Theme } from '@aesthetic/core';
import { ClassName, Direction, ThemeName } from '@aesthetic/types';

// HOCs

export interface WrapperComponent {
  WrappedComponent: React.ComponentType<any>;
}

export interface WrapperProps {
  /** Gain a reference to the wrapped component. */
  wrappedRef?: React.Ref<any>;
}

export interface WrappedProps {
  /** The ref passed by the `wrappedRef` prop. */
  ref?: React.Ref<any>;
}

// DIRECTION

export type DirectionContextType = Direction;

export interface DirectionProviderProps {
  children: NonNullable<React.ReactNode>;
  /** Explicit direction to use. */
  direction?: Exclude<Direction, 'neutral'>;
  /** Locale aware string to deduce the direction from. */
  value?: string;
  /** Element to wrap the children with. */
  wrapper: React.ReactElement;
}

export interface WithDirectionWrappedProps extends WrappedProps {
  /** The current direction. Provided by `withDirection`. */
  direction: Direction;
}

// THEME

export type ThemeContextType = Theme;

export interface ThemeProviderProps {
  children: NonNullable<React.ReactNode>;
  /** Theme to activate. */
  name?: ThemeName;
}

export interface ContextualThemeProviderProps extends Required<ThemeProviderProps> {
  /** Element to wrap the children with. */
  wrapper: React.ReactElement;
}

export interface WithThemeWrappedProps extends WrappedProps {
  /** The theme object. Provided by `withTheme`. */
  theme: Theme;
}

// STYLES

export type StyleResultTypes<T> = (undefined | null | false | T)[];

export interface StyleResultGenerator<T, R = ClassName> {
  (variants: Record<string, string>, ...keys: StyleResultTypes<T>): R;
  (...keys: StyleResultTypes<T>): R;
}

export interface WithStylesWrappedProps<T = string, R = ClassName> extends WrappedProps {
  /** Function to generate styles from a sheet. Provided by `withStyles`. */
  cx: StyleResultGenerator<T, R>;
}
