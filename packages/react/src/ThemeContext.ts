import React from 'react';
import { getActiveTheme, Theme } from '@aesthetic/core';
import { ThemeContextType } from './types';

let theme: Theme | null = null;

try {
  theme = getActiveTheme();
} catch {
  // Ignore
}

export default React.createContext<ThemeContextType | null>(theme);
