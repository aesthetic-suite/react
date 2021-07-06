import React from 'react';
import defaultTheme from '@aesthetic/design-systems/material';
import { ThemeProvider, createThemeSheet, registerDefaultTheme } from '@aesthetic/react';
import './global.css';

const themeSheet = createThemeSheet((css) => ({
	'@root': css.mixin('root'),
}));

registerDefaultTheme('default', defaultTheme, themeSheet);

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
