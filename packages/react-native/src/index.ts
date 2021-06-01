/**
 * @copyright   2020, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import aesthetic from './aesthetic';
import { createStyled } from './styles';

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
  createElementStyles,
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

// Export aliases
export const style = createElementStyles;
export const styles = createComponentStyles;
export const styled = createStyled;
