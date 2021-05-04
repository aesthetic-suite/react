import React from 'react';
import { darkTheme } from '@aesthetic/core/test';
import { render } from '@testing-library/react-native';
import { ThemeProvider, useTheme } from '../src';
import { dawnTheme, setupAestheticReact, teardownAestheticReact } from './helpers';

describe('useTheme()', () => {
  beforeEach(() => {
    setupAestheticReact();
  });

  afterEach(() => {
    teardownAestheticReact();
  });

  it('returns a preferred theme if no name provided', () => {
    let theme;

    function Component() {
      theme = useTheme();

      return null;
    }

    render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>,
    );

    expect(theme).toEqual(dawnTheme);
  });

  it('returns the theme defined by the provider', () => {
    let theme;

    function Component() {
      theme = useTheme();

      return null;
    }

    render(
      <ThemeProvider name="night">
        <Component />
      </ThemeProvider>,
    );

    expect(theme).toEqual(darkTheme);
  });
});
