import React from 'react';
import { getActiveTheme } from '@aesthetic/core';
import { attempt } from '@aesthetic/utils';
import { ThemeContextType } from './types';

export default React.createContext<ThemeContextType | null>(attempt(() => getActiveTheme()));
