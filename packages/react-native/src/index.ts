/**
 * @copyright   2020, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import aesthetic from './aesthetic';

export * from './direction';
export * from './styles';
export * from './theme';
export * from './types';
export * from '@aesthetic/core';
export * from '@aesthetic/core-react';

export const {
  changeDirection,
  changeTheme,
  configure,
  createComponentStyles,
  getActiveDirection,
  getActiveTheme,
  getEngine,
  getTheme,
  registerDefaultTheme,
  registerTheme,
  renderComponentStyles,
  subscribe,
  unsubscribe,
} = aesthetic;
