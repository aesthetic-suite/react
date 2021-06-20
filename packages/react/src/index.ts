/**
 * @copyright   2020, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import { aesthetic } from './aesthetic';
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
	createThemeStyles,
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

// Export aliases
export const style = createElementStyles;
export const styles = createComponentStyles;
export const styled = createStyled;
export const themeStyle = createThemeStyles;

// Do not use! This is for bundler pre-compilation usage!
// @private
export const internalAestheticRuntime = aesthetic;
