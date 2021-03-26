import React, { cloneElement, useEffect, useState } from 'react';
import { ContextualThemeProviderProps, createThemeHelpers } from '@aesthetic/core-react';
import aesthetic from './aesthetic';
import { useDirection } from './direction';

export const { ThemeContext, ThemeProvider, useTheme, withTheme } = createThemeHelpers(aesthetic);

/**
 * Provides a theme for a distinct portion of the React tree.
 */
export function ContextualThemeProvider({ children, name, wrapper }: ContextualThemeProviderProps) {
  const [className, setClassName] = useState('');
  const direction = useDirection();
  const theme = aesthetic.getTheme(name);

  // Render styles when theme/direction change
  useEffect(() => {
    setClassName(aesthetic.renderThemeStyles(theme, { direction }).join(' '));
  }, [theme, direction]);

  return (
    <ThemeContext.Provider value={theme}>
      {cloneElement(wrapper, { className, 'data-theme': name }, children)}
    </ThemeContext.Provider>
  );
}
