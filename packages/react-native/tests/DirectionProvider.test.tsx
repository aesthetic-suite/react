/* eslint-disable react/jsx-no-literals */

import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { DirectionProvider } from '../src';
import { setupAestheticReact, teardownAestheticReact } from './helpers';

describe('DirectionProvider', () => {
  beforeEach(() => {
    setupAestheticReact();
  });

  afterEach(() => {
    teardownAestheticReact();
  });

  it('renders and wraps with the chosen element', () => {
    const result = render(
      <DirectionProvider wrapper={<View testID="wrapper" />}>Content</DirectionProvider>,
    );

    expect(result.queryByTestId('wrapper')).not.toBeNull();
  });

  it('renders `ltr` explicitly with `dir`', () => {
    const result = render(
      <DirectionProvider direction="ltr" wrapper={<View testID="wrapper" />}>
        Content
      </DirectionProvider>,
    );

    expect(result.getByTestId('wrapper').props.dir).toBe('ltr');
  });

  it('renders `rtl` explicitly with `dir`', () => {
    const result = render(
      <DirectionProvider direction="rtl" wrapper={<View testID="wrapper" />}>
        Content
      </DirectionProvider>,
    );

    expect(result.getByTestId('wrapper').props.dir).toBe('rtl');
  });

  it('renders `dir` over `value`', () => {
    const result = render(
      <DirectionProvider direction="rtl" value="Hello!" wrapper={<View testID="wrapper" />}>
        Content
      </DirectionProvider>,
    );

    expect(result.getByTestId('wrapper').props.dir).toBe('rtl');
  });

  it('infers `ltr` from `value`', () => {
    const result = render(
      <DirectionProvider value="Hello!" wrapper={<View testID="wrapper" />}>
        Content
      </DirectionProvider>,
    );

    expect(result.getByTestId('wrapper').props.dir).toBe('ltr');
  });

  it('infers `rtl` from `value`', () => {
    const result = render(
      <DirectionProvider value="بسيطة" wrapper={<View testID="wrapper" />}>
        Content
      </DirectionProvider>,
    );

    expect(result.getByTestId('wrapper').props.dir).toBe('rtl');
  });
});
