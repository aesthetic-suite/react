import React from 'react';
import { View } from 'react-native';
import { ContextualThemeProviderProps, createThemeHelpers } from '@aesthetic/core-react';
import aesthetic from './aesthetic';

export const { ThemeContext, ThemeProvider, useTheme, withTheme } = createThemeHelpers(aesthetic);

/**
 * Provides a theme for a distinct portion of the React tree.
 */
export function ContextualThemeProvider({ children, name }: ContextualThemeProviderProps) {
  return (
    <ThemeContext.Provider value={aesthetic.getTheme(name)}>
      <View>{children}</View>
    </ThemeContext.Provider>
  );
}
