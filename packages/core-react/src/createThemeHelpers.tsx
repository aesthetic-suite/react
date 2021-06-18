import React, { createContext, useContext, useEffect, useState } from 'react';
import { Aesthetic, Theme } from '@aesthetic/core';
import { createHOC } from './createHOC';
import {
	InternalWithThemeWrappedProps,
	ThemeContextType,
	ThemeProviderProps,
	WrapperComponent,
	WrapperProps,
} from './types';

export function createThemeHelpers<Input extends object, Output>(
	aesthetic: Aesthetic<Input, Output>,
) /* infer */ {
	const ThemeContext = createContext<ThemeContextType<Input> | null>(null);

	/**
	 * Rendered at the root to provide the theme to the entire application.
	 */
	function ThemeProvider({ children, name = '' }: ThemeProviderProps) {
		const [themeName, setThemeName] = useState(name);
		const theme = themeName ? aesthetic.getTheme(themeName) : aesthetic.getActiveTheme();

		// Listen to theme changes that occur outside of the provider
		useEffect(() => aesthetic.subscribe('change:theme', setThemeName), []);

		// Update state when the `name` prop changes
		useEffect(() => {
			if (name) {
				aesthetic.changeTheme(name, false);
				setThemeName(name);
			}
		}, [name]);

		return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
	}

	/**
	 * Hook within a component to provide the current theme object.
	 */
	function useTheme(): Theme<Input> {
		const theme = useContext(ThemeContext);

		if (!theme) {
			throw new Error('Theme has not been provided.');
		}

		return theme;
	}

	/**
	 * Wrap a React component with an HOC that injects the current theme object as a prop.
	 */
	function withTheme() /* infer */ {
		return function withThemeComposer<Props extends object = {}>(
			WrappedComponent: React.ComponentType<InternalWithThemeWrappedProps<Input> & Props>,
		): React.FunctionComponent<
			Omit<Props, keyof InternalWithThemeWrappedProps<Input>> & WrapperProps
		> &
			WrapperComponent {
			// eslint-disable-next-line prefer-arrow-callback
			return createHOC('withTheme', WrappedComponent, function WithTheme({ wrappedRef, ...props }) {
				const theme = useTheme();

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				return <WrappedComponent {...(props as any)} ref={wrappedRef} theme={theme} />;
			});
		};
	}

	return {
		ThemeContext,
		ThemeProvider,
		useTheme,
		withTheme,
	};
}
