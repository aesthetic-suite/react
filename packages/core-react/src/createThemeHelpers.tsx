import React, { useContext, useEffect, useState } from 'react';
import { Aesthetic, Theme } from '@aesthetic/core';
import { attempt } from '@aesthetic/utils';
import createHOC from './createHOC';
import {
  ThemeContextType,
  ThemeProviderProps,
  WithThemeWrappedProps,
  WrapperComponent,
  WrapperProps,
} from './types';

export default function createThemeHelpers(aesthetic: Aesthetic) /* infer */ {
  const ThemeContext = React.createContext<ThemeContextType | null>(
    attempt(() => aesthetic.getActiveTheme()),
  );

  /**
   * Rendered at the root to provide the theme to the entire application.
   */
  function ThemeProvider({ children, name = '' }: ThemeProviderProps) {
    const [themeName, setThemeName] = useState(name);
    const theme = themeName ? aesthetic.getTheme(themeName) : aesthetic.getActiveTheme();

    // Listen to theme changes that occur outside of the provider
    useEffect(() => {
      aesthetic.subscribe('change:theme', setThemeName);

      return () => {
        aesthetic.unsubscribe('change:theme', setThemeName);
      };
    }, []);

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
  function useTheme(): Theme {
    const theme = useContext(ThemeContext);

    if (__DEV__) {
      if (!theme) {
        throw new Error('Theme has not been provided.');
      }
    }

    return theme!;
  }

  /**
   * Wrap a React component with an HOC that injects the current theme object as a prop.
   */
  function withTheme() /* infer */ {
    return function withThemeComposer<Props extends object = {}>(
      WrappedComponent: React.ComponentType<Props & WithThemeWrappedProps>,
    ): React.FunctionComponent<Omit<Props, keyof WithThemeWrappedProps> & WrapperProps> &
      WrapperComponent {
      return createHOC('withTheme', WrappedComponent, function WithTheme({ wrappedRef, ...props }) {
        const theme = useTheme();

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
