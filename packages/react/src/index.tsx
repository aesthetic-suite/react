/**
 * @copyright   2020, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import aesthetic from './aesthetic';
import DirectionContext from './DirectionContext';
import DirectionProvider from './DirectionProvider';
import ThemeContext from './ThemeContext';
import ThemeProvider from './ThemeProvider';
import ContextualThemeProvider from './ContextualThemeProvider';
import createStyled from './createStyled';
import useDirection from './useDirection';
import useStyles from './useStyles';
import useTheme from './useTheme';
import withDirection from './withDirection';
import withStyles from './withStyles';
import withTheme from './withTheme';

export * from '@aesthetic/core';
export * from './types';

export {
  DirectionContext,
  DirectionProvider,
  ThemeContext,
  ThemeProvider,
  ContextualThemeProvider,
  createStyled,
  useDirection,
  useStyles,
  useTheme,
  withDirection,
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
