// Any must be used here for consumers to be typed correctly.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Direction, ResultComposer, Theme, ThemeName } from '@aesthetic/core';

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
}

export interface WithDirectionWrappedProps extends WrappedProps {
	/** The current direction. Provided by `withDirection`. */
	direction: Direction;
}

// THEME

export type ThemeContextType<T extends object> = Theme<T>;

export interface ThemeProviderProps {
	children: NonNullable<React.ReactNode>;
	/** Theme to activate. */
	name?: ThemeName;
}

export type ContextualThemeProviderProps = Required<ThemeProviderProps>;

export interface InternalWithThemeWrappedProps<T extends object> extends WrappedProps {
	/** The theme object. Provided by `withTheme`. */
	theme: Theme<T>;
}

// STYLES

export interface InternalWithStylesWrappedProps<T, R, GR = R> extends WrappedProps {
	/** Function to compose styles from a sheet. Provided by `withStyles`. */
	compose: ResultComposer<T, R, GR>;
}
