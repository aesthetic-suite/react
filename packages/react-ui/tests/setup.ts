import { configure, internalAestheticRuntime, registerDefaultTheme } from '@aesthetic/react';
import { createTestEngine } from '@aesthetic/react/test';
import { lightTheme } from '@aesthetic/system/test';

registerDefaultTheme('default', lightTheme);

configure({
	deterministicClasses: true,
});

internalAestheticRuntime.configureEngine(createTestEngine());

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // Deprecated
		removeListener: jest.fn(), // Deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});
