import { registerDefaultTheme } from '@aesthetic/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { lightTheme } from '@aesthetic/system/test';

registerDefaultTheme('default', lightTheme);

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
