import React from 'react';
import { render } from 'rut-dom';
import { setupAesthetic, teardownAesthetic, darkTheme, lightTheme } from '@aesthetic/core/lib/test';
import { useTheme, ThemeProvider } from '../src';

describe('useTheme()', () => {
  beforeEach(() => {
    setupAesthetic();
  });

  afterEach(() => {
    teardownAesthetic();
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

    expect(theme).toEqual(lightTheme);
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
