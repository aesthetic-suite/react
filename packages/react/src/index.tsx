/**
 * @copyright   2020, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import aesthetic from './aesthetic';
import ThemeContext from './ThemeContext';
import ThemeProvider from './ThemeProvider';
import ContextualThemeProvider from './ContextualThemeProvider';
import createStyled from './createStyled';
import useStyles from './useStyles';
import useTheme from './useTheme';
import withStyles from './withStyles';
import withTheme from './withTheme';

export * from '@aesthetic/core';
export * from './direction';
export * from './types';

export {
  ThemeContext,
  ThemeProvider,
  ContextualThemeProvider,
  createStyled,
  useStyles,
  useTheme,
  withStyles,
  withTheme,
};

export const {
  changeDirection,
  changeTheme,
  configure,
  createComponentStyles,
  createThemeStyles,
  generateClassName,
  getActiveDirection,
  getActiveTheme,
  getEngine,
  getTheme,
  registerDefaultTheme,
  registerTheme,
  renderComponentStyles,
  renderFontFace,
  renderImport,
  renderKeyframes,
  renderThemeStyles,
  subscribe,
  unsubscribe,
} = aesthetic;
