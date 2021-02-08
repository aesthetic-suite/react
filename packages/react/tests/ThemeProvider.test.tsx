/* eslint-disable react/jsx-no-literals */

import React from 'react';
import { act } from 'react-test-renderer';
import { render } from 'rut-dom';
import { OnChangeTheme } from '@aesthetic/core';
import { ThemeProvider, ThemeProviderProps, useTheme } from '../src';
import aesthetic from '../src/aesthetic';
import { dawnTheme, setupAestheticReact, teardownAestheticReact, twilightTheme } from './helpers';

describe('ThemeProvider', () => {
  beforeEach(() => {
    setupAestheticReact();
  });

  afterEach(() => {
    teardownAestheticReact();
  });

  it('renders children', () => {
    const { root } = render<ThemeProviderProps>(
      <ThemeProvider>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </ThemeProvider>,
    );

    expect(root.find('div')).toHaveLength(3);
  });

  it('doesnt wrap with a div when the root provider', () => {
    const { root } = render<ThemeProviderProps>(
      <ThemeProvider>
        <span>Child</span>
      </ThemeProvider>,
    );

    expect(root.find('div')).toHaveLength(0);
  });

  it('doesnt re-render children if props never change', () => {
    let count = 0;

    function Child() {
      count += 1;

      return null;
    }

    const { update } = render<ThemeProviderProps>(
      <ThemeProvider>
        <Child />
      </ThemeProvider>,
    );

    update();
    update();
    update();

    expect(count).toBe(1);
  });

  it('provides preferred or default theme', () => {
    expect.assertions(1);

    function Test() {
      const theme = useTheme();

      expect(theme).toBe(twilightTheme);

      return null;
    }

    render<ThemeProviderProps>(
      <ThemeProvider>
        <Test />
      </ThemeProvider>,
    );
  });

  it('provides explicit theme by name', () => {
    expect.assertions(1);

    function Test() {
      const theme = useTheme();

      expect(theme).toBe(dawnTheme);

      return null;
    }

    render<ThemeProviderProps>(
      <ThemeProvider name="dawn">
        <Test />
      </ThemeProvider>,
    );
  });

  it('calls `changeTheme` when `name` changes', () => {
    const spy = jest.spyOn(aesthetic, 'changeTheme');

    const { update } = render<ThemeProviderProps>(
      <ThemeProvider>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </ThemeProvider>,
    );

    update({
      name: 'night',
    });

    expect(spy).toHaveBeenCalledWith('night', false);

    spy.mockRestore();
  });

  describe('subscriptions', () => {
    let subSpy: jest.SpyInstance;
    let unsubSpy: jest.SpyInstance;

    beforeEach(() => {
      subSpy = jest.spyOn(aesthetic, 'subscribe');
      unsubSpy = jest.spyOn(aesthetic, 'unsubscribe');
    });

    afterEach(() => {
      subSpy.mockRestore();
      unsubSpy.mockRestore();
    });

    it('subscribes on mount', () => {
      render<ThemeProviderProps>(
        <ThemeProvider>
          <div />
        </ThemeProvider>,
      );

      expect(subSpy).toHaveBeenCalledTimes(1);
      expect(subSpy).toHaveBeenCalledWith('change:theme', expect.any(Function));
    });

    it('only subscribes once', () => {
      const { update } = render<ThemeProviderProps>(
        <ThemeProvider>
          <div />
        </ThemeProvider>,
      );

      update();
      update();
      update();

      expect(subSpy).toHaveBeenCalledTimes(1);
    });

    it('unsubscribes on unmount', () => {
      const { unmount } = render<ThemeProviderProps>(
        <ThemeProvider>
          <div />
        </ThemeProvider>,
      );

      unmount();

      expect(unsubSpy).toHaveBeenCalledTimes(1);
      expect(unsubSpy).toHaveBeenCalledWith('change:theme', expect.any(Function));
    });

    it('changes theme if outside `changeTheme` is called', () => {
      const themeSpy = jest.fn();
      let doChangeTheme: OnChangeTheme = () => {};

      // Janky, but since we mocked the module, we need to extract this
      subSpy.mockImplementation((name, cb) => {
        doChangeTheme = cb as OnChangeTheme;
      });

      function Comp() {
        themeSpy(useTheme());

        return null;
      }

      render<ThemeProviderProps>(
        <ThemeProvider name="twilight">
          <Comp />
        </ThemeProvider>,
      );

      // eslint-disable-next-line rut/no-act
      act(() => {
        doChangeTheme('dawn', []);
      });

      expect(themeSpy).toHaveBeenCalledWith(twilightTheme);
      expect(themeSpy).toHaveBeenCalledWith(dawnTheme);
    });
  });
});
