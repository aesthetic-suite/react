/* eslint-disable react/jsx-no-literals */

import React from 'react';
import { render } from 'rut-dom';
import { lightTheme, darkTheme } from '@aesthetic/core/lib/test';
import {
  ContextualThemeProvider,
  ThemeProviderProps,
  DirectionProviderProps,
  useTheme,
  DirectionProvider,
} from '../src';
import aesthetic from '../src/aesthetic';
import { setupAestheticReact, teardownAestheticReact } from './helpers';

describe('ContextualThemeProvider', () => {
  beforeEach(() => {
    setupAestheticReact();
  });

  afterEach(() => {
    teardownAestheticReact();
  });

  it('renders children', () => {
    const { root } = render<ThemeProviderProps>(
      <ContextualThemeProvider name="night" wrapper={<div />}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </ContextualThemeProvider>,
    );

    expect(root.find('div')).toHaveLength(4);
  });

  it('doesnt re-render children if props never change', () => {
    let count = 0;

    function Child() {
      count += 1;

      return null;
    }

    const { update } = render<ThemeProviderProps>(
      <ContextualThemeProvider name="day" wrapper={<div />}>
        <Child />
      </ContextualThemeProvider>,
    );

    update();
    update();
    update();

    expect(count).toBe(1);
  });

  it('provides explicit theme by name', () => {
    expect.assertions(1);

    function Test() {
      const theme = useTheme();

      expect(theme).toBe(darkTheme);

      return null;
    }

    render<ThemeProviderProps>(
      <ContextualThemeProvider name="night" wrapper={<div />}>
        <Test />
      </ContextualThemeProvider>,
    );
  });

  it('wraps in a div with a class name and data attribute', () => {
    const spy = jest.spyOn(aesthetic, 'renderThemeStyles').mockImplementation(() => 'theme-night');

    const { root } = render<ThemeProviderProps>(
      <ContextualThemeProvider name="night" wrapper={<div />}>
        <span />
      </ContextualThemeProvider>,
    );
    const wrapper = root.findOne('div');

    expect(wrapper).toHaveProp('className', 'theme-night');
    // @ts-expect-error Data props not typed
    expect(wrapper).toHaveProp('data-theme', 'night');

    spy.mockRestore();
  });

  it('re-renders theme styles if `name` changes', () => {
    const spy = jest.spyOn(aesthetic, 'renderThemeStyles');

    const { rerender } = render<ThemeProviderProps>(
      <ContextualThemeProvider name="night" wrapper={<div />}>
        <div />
      </ContextualThemeProvider>,
    );

    rerender(
      <ContextualThemeProvider name="day" wrapper={<div />}>
        <div />
      </ContextualThemeProvider>,
    );

    expect(spy).toHaveBeenCalledWith(darkTheme, { direction: 'ltr' }); // Initial
    expect(spy).toHaveBeenCalledWith(lightTheme, { direction: 'ltr' }); // Rerender

    spy.mockRestore();
  });

  it('re-renders theme styles if direction changes', () => {
    const spy = jest.spyOn(aesthetic, 'renderThemeStyles');

    const { rerender } = render<DirectionProviderProps>(
      <DirectionProvider direction="ltr" wrapper={<div />}>
        <ContextualThemeProvider name="night" wrapper={<div />}>
          <div />
        </ContextualThemeProvider>
      </DirectionProvider>,
    );

    rerender(
      <DirectionProvider direction="rtl" wrapper={<div />}>
        <ContextualThemeProvider name="night" wrapper={<div />}>
          <div />
        </ContextualThemeProvider>
      </DirectionProvider>,
    );

    expect(spy).toHaveBeenCalledWith(darkTheme, { direction: 'ltr' }); // Initial
    expect(spy).toHaveBeenCalledWith(darkTheme, { direction: 'rtl' }); // Rerender

    spy.mockRestore();
  });
});
