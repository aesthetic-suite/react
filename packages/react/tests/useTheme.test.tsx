import React from 'react';
import { render } from 'rut-dom';
import { darkTheme } from '@aesthetic/core/lib/test';
import { useTheme, ThemeProvider } from '../src';
import { setupAestheticReact, teardownAestheticReact, twilightTheme } from './helpers';

describe('useTheme()', () => {
  beforeEach(() => {
    setupAestheticReact();
  });

  afterEach(() => {
    teardownAestheticReact();
  });

  it('errors if no context provided', () => {
    function Component() {
      useTheme();

      return null;
    }

    expect(() => {
      render<{}>(<Component />);
    }).toThrow('Theme has not been provided.');
  });

  it('returns a preferred theme if no name provided', () => {
    let theme;

    function Component() {
      theme = useTheme();

      return null;
    }

    render<{}>(
      <ThemeProvider>
        <Component />
      </ThemeProvider>,
    );

    expect(theme).toEqual(twilightTheme);
  });

  it('returns the theme defined by the provider', () => {
    let theme;

    function Component() {
      theme = useTheme();

      return null;
    }

    render<{}>(
      <ThemeProvider name="night">
        <Component />
      </ThemeProvider>,
    );

    expect(theme).toEqual(darkTheme);
  });
});
