import React from 'react';
import materialTheme from '@aesthetic/design-systems/material';
// import aestheticTheme from '@aesthetic/design-systems/aesthetic';
import { ThemeProvider, createThemeSheet, registerDefaultTheme } from '@aesthetic/react';
import './global.css';

const themeSheet = createThemeSheet((css) => ({
	'@root': css.mixin('root'),
}));

registerDefaultTheme('default', materialTheme, themeSheet);

export const decorators = [
	(Story) => (
		<ThemeProvider>
			<Story />
		</ThemeProvider>
	),
];

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		disabled: true,
		expanded: true,
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
		sort: 'alpha',
	},
	layout: 'padded',
};
