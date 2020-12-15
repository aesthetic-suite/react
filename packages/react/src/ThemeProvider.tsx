import React, { useState, useEffect } from 'react';
import aesthetic from './aesthetic';
import ThemeContext from './ThemeContext';
import { ThemeProviderProps } from './types';

/**
 * Rendered at the root to provide the theme to the entire application.
 */
export default function ThemeProvider({ children, name = '' }: ThemeProviderProps) {
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
