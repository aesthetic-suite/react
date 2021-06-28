import React from 'react';
import { ThemeProvider } from '@aesthetic/react';
import { getRenderedStyles } from '@aesthetic/style/test';

export { getRenderedStyles };

export function Wrapper({ children }: { children?: React.ReactNode }) {
	return <ThemeProvider>{children ?? <div />}</ThemeProvider>;
}

export function withStyles() {}
