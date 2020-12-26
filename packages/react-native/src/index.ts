/**
 * @copyright   2020, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import aesthetic from './aesthetic';

export * from '@aesthetic/core';
export * from '@aesthetic/core-react';
export * from './direction';
export * from './styles';
export * from './theme';
export * from './types';

export const {
  changeDirection,
  changeTheme,
  configure,
  createComponentStyles,
  createThemeStyles,
  getActiveDirection,
  getActiveTheme,
  getEngine,
  getTheme,
  registerDefaultTheme,
  registerTheme,
  renderComponentStyles,
  renderThemeStyles,
  subscribe,
  unsubscribe,
} = aesthetic;
