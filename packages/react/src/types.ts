// Any must be used here for consumers to be typed correctly.
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Theme, ClassNameSheetVariants } from '@aesthetic/core';
import { ClassName, Direction, ThemeName } from '@aesthetic/types';

export type ClassNameTypes<T> = (undefined | null | false | T)[];

export interface ClassNameGenerator<T> {
  (variants: ClassNameSheetVariants, ...keys: ClassNameTypes<T>): ClassName;
  (...keys: ClassNameTypes<T>): ClassName;
}

export type ElementType = keyof JSX.IntrinsicElements;

export interface StyledInheritedProps {
  className?: string;
}

export type InferProps<T extends ElementType | React.ComponentType> = T extends ElementType
  ? JSX.IntrinsicElements[T]
  : T extends React.ComponentType<infer P>
  ? P
  : never;

// CONTEXT

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

export interface WithDirectionWrappedProps extends WrappedProps {
  /** The current direction. Provided by `withDirection`. */
  direction: Direction;
}

export interface WithThemeWrappedProps extends WrappedProps {
  /** The theme object. Provided by `withTheme`. */
  theme: Theme;
}

export interface WithStylesWrappedProps<T = string> extends WrappedProps {
  /** Function to generate CSS class names from a style sheet. Provided by `withStyles`. */
  cx: ClassNameGenerator<T>;
}
