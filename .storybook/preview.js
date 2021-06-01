import React from 'react';
import defaultTheme from '@aesthetic/design-systems/esm/aesthetic/themes/default';
import { ThemeProvider, createThemeStyles, registerDefaultTheme } from '@aesthetic/react';

const themeSheet = createThemeStyles((css) => ({
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
