import React from 'react';
import { internalAestheticRuntime, ThemeProvider } from '@aesthetic/react';
import { createTestStyleEngine, getRenderedStyles, purgeStyles } from '@aesthetic/style/test';

export { getRenderedStyles, purgeStyles };

export function Wrapper({ children }: { children?: React.ReactNode }) {
	return <ThemeProvider>{children ?? <div />}</ThemeProvider>;
}

export function withStyles(unit: () => void): jest.ProvidesCallback {
	return () => {
		const engine = internalAestheticRuntime.getEngine();

		internalAestheticRuntime.configureEngine(createTestStyleEngine());

		unit();

		internalAestheticRuntime.configureEngine(engine);
	};
}
