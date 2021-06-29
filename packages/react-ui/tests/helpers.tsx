import React from 'react';
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

	override componentDidCatch() {}

	override render() {
		const { children } = this.props;

		return children;
	}
}

export function Wrapper({ children }: WrapperProps) {
	return <ErrorBoundary><ThemeProvider>{children ?? <div />}</ThemeProvider></ErrorBoundary>;
}

export function withStyles(unit: () => void): jest.ProvidesCallback {
	return () => {
		const engine = internalAestheticRuntime.getEngine();

		internalAestheticRuntime.configureEngine(createTestStyleEngine());

		unit();

		internalAestheticRuntime.configureEngine(engine);
	};
}
