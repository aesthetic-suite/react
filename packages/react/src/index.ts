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
	createStyleSheet,
	createScopedStyleSheet,
	createThemeSheet,
	getActiveDirection,
	getActiveTheme,
	getEngine,
	getTheme,
	registerDefaultTheme,
	registerTheme,
	renderStyleSheet,
	renderFontFace,
	renderImport,
	renderKeyframes,
	renderThemeSheet,
	subscribe,
	unsubscribe,
} = aesthetic;

// Export aliases
export const style = createScopedStyleSheet;
export const styles = createStyleSheet;
export const styled = createStyled;
export const themeStyle = createThemeSheet;

// Do not use! This is for bundler pre-compilation usage!
// @private
export const internalAestheticRuntime = aesthetic;
