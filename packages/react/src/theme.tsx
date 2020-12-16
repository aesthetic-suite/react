import React, { useEffect, useState } from 'react';
import { createThemeHelpers, ContextualThemeProviderProps } from '@aesthetic/core-react';
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
    setClassName(aesthetic.renderThemeStyles(theme, { direction }));
  }, [theme, direction]);

  return (
    <ThemeContext.Provider value={theme}>
      {React.cloneElement(wrapper, { className, 'data-theme': name }, children)}
    </ThemeContext.Provider>
  );
}
