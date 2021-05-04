/* eslint-disable react/jsx-no-literals */

import React from 'react';
import { View } from 'react-native';
import { darkTheme } from '@aesthetic/core/test';
import { render } from '@testing-library/react-native';
import { ContextualThemeProvider, useTheme } from '../src';
import { setupAestheticReact, teardownAestheticReact } from './helpers';

describe('ContextualThemeProvider', () => {
  beforeEach(() => {
    setupAestheticReact();
  });

  afterEach(() => {
    teardownAestheticReact();
  });

  it('renders children', () => {
    const result = render(
      <ContextualThemeProvider name="night" wrapper={<View />}>
        <View>1</View>
        <View>2</View>
        <View>3</View>
      </ContextualThemeProvider>,
    );

    expect(result.UNSAFE_getAllByType(View)).toHaveLength(4);
  });

  it('doesnt re-render children if props never change', () => {
    let count = 0;

    function Child() {
      count += 1;

      return null;
    }

    const wrapper = <View />;
    const child = <Child />;
    const result = render(
      <ContextualThemeProvider name="day" wrapper={wrapper}>
        {child}
      </ContextualThemeProvider>,
    );

    result.update(
      <ContextualThemeProvider name="day" wrapper={wrapper}>
        {child}
      </ContextualThemeProvider>,
    );
    result.update(
      <ContextualThemeProvider name="day" wrapper={wrapper}>
        {child}
      </ContextualThemeProvider>,
    );
    result.update(
      <ContextualThemeProvider name="day" wrapper={wrapper}>
        {child}
      </ContextualThemeProvider>,
    );

    expect(count).toBe(1);
  });

  it('provides explicit theme by name', () => {
    expect.assertions(1);

    function Test() {
      const theme = useTheme();

      expect(theme).toBe(darkTheme);

      return null;
    }

    render(
      <ContextualThemeProvider name="night" wrapper={<View />}>
        <Test />
      </ContextualThemeProvider>,
    );
  });
});
