/* eslint-disable react/jsx-no-literals */

import React from 'react';
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
    const result = render(<DirectionProvider>Content</DirectionProvider>);

    expect(result.queryByTestId('aesthetic-direction-provider')).not.toBeNull();
  });

  it('renders `ltr` explicitly with `dir`', () => {
    const result = render(<DirectionProvider direction="ltr">Content</DirectionProvider>);

    expect(result.getByTestId('aesthetic-direction-provider').props.dir).toBe('ltr');
  });

  it('renders `rtl` explicitly with `dir`', () => {
    const result = render(<DirectionProvider direction="rtl">Content</DirectionProvider>);

    expect(result.getByTestId('aesthetic-direction-provider').props.dir).toBe('rtl');
  });

  it('renders `dir` over `value`', () => {
    const result = render(
      <DirectionProvider direction="rtl" value="Hello!">
        Content
      </DirectionProvider>,
    );

    expect(result.getByTestId('aesthetic-direction-provider').props.dir).toBe('rtl');
  });

  it('infers `ltr` from `value`', () => {
    const result = render(<DirectionProvider value="Hello!">Content</DirectionProvider>);

    expect(result.getByTestId('aesthetic-direction-provider').props.dir).toBe('ltr');
  });

  it('infers `rtl` from `value`', () => {
    const result = render(<DirectionProvider value="بسيطة">Content</DirectionProvider>);

    expect(result.getByTestId('aesthetic-direction-provider').props.dir).toBe('rtl');
  });
});
