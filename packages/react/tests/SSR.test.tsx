/* eslint-disable react/jsx-no-literals */

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerRenderer } from '@aesthetic/style/lib/server';
import { useStyles, ThemeProvider } from '../src';
import { createStyleSheet, ButtonProps } from './__mocks__/Button';
import { setupAestheticReact, teardownAestheticReact } from './helpers';

describe('SSR', () => {
  let renderer: ServerRenderer;

  function Button({ children, block, disabled, large, small }: ButtonProps) {
    const cx = useStyles(createStyleSheet());

    return (
      <button
        type="button"
        className={cx(
          {
            // eslint-disable-next-line no-nested-ternary
            size: large ? 'lg' : small ? 'sm' : 'df',
          },
          'button',
          block && 'button_block',
          disabled && 'button_disabled',
        )}
      >
        {children}
      </button>
    );
  }

  function App() {
    return (
      <ThemeProvider name="twilight">
        <main>
          <div>You are not logged in!</div>
          <Button href="/login">Login</Button>
          <Button href="/register">Register</Button>
        </main>
      </ThemeProvider>
    );
  }

  beforeEach(() => {
    setupAestheticReact();

    renderer = new ServerRenderer();
  });

  afterEach(() => {
    teardownAestheticReact();

    delete global.AESTHETIC_CUSTOM_RENDERER;
  });

  describe('renderToString()', () => {
    it('renders markup', () => {
      expect(renderToString(renderer.extractStyles(<App />))).toMatchSnapshot();
      expect(renderer.renderToStyleMarkup()).toMatchSnapshot();
    });
  });

  describe('renderToStaticMarkup()', () => {
    it('renders markup', () => {
      expect(renderToStaticMarkup(renderer.extractStyles(<App />))).toMatchSnapshot();
      expect(renderer.renderToStyleMarkup()).toMatchSnapshot();
    });
  });
});
