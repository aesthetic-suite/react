import React, { useState, useEffect } from 'react';
import aesthetic from './aesthetic';
import ThemeContext from './ThemeContext';
import useDirection from './useDirection';
import { ContextualThemeProviderProps } from './types';

/**
 * Provides a theme for a distinct portion of the React tree.
 */
export default function ContextualThemeProvider({
  children,
  name,
  wrapper,
}: ContextualThemeProviderProps) {
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
