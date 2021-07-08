import React from 'react';
import { axe } from 'jest-axe';
import { internalAestheticRuntime, ThemeProvider } from '@aesthetic/react';
import { createTestStyleEngine, getRenderedStyles, purgeStyles } from '@aesthetic/style/test';

export { getRenderedStyles, purgeStyles };

export interface WrapperProps {
	children?: React.ReactNode;
}

class ErrorBoundary extends React.Component<WrapperProps> {
	static getDerivedStateFromError() {
		return {};
	}

	override render() {
		const { children } = this.props;

		return children;
	}
}

export function Wrapper({ children }: WrapperProps) {
	return (
		<ErrorBoundary>
			<ThemeProvider>{children!}</ThemeProvider>
		</ErrorBoundary>
	);
}

export function withAccessibility(
	unit: (axeCore: typeof axe) => Promise<void>,
): jest.ProvidesCallback {
	return async () => {
		await unit(axe);
	};
}

export function withEnvironment(env: string, unit: () => void): jest.ProvidesCallback {
	return () => {
		const oldEnv = process.env.NODE_ENV;

		process.env.NODE_ENV = env;

		unit();

		process.env.NODE_ENV = oldEnv;
	};
}

export function withStyles(unit: () => void): jest.ProvidesCallback {
	return () => {
		const engine = internalAestheticRuntime.getEngine();

		internalAestheticRuntime.configureEngine(createTestStyleEngine());

		unit();

		internalAestheticRuntime.configureEngine(engine);
	};
}
