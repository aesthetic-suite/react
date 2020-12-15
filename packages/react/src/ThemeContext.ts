import React from 'react';
import { attempt } from '@aesthetic/utils';
import aesthetic from './aesthetic';
import { ThemeContextType } from './types';

export default React.createContext<ThemeContextType | null>(
  attempt(() => aesthetic.getActiveTheme()),
);
