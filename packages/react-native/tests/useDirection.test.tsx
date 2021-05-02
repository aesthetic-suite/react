import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { DirectionProvider, useDirection } from '../src';

describe('useDirection()', () => {
  it('returns "ltr" if no context provided', () => {
    let dir;

    function Component() {
      dir = useDirection();

      return null;
    }

    render(<Component />);

    expect(dir).toBe('ltr');
  });

  it('returns the direction defined by the provider', () => {
    let dir;

    function Component() {
      dir = useDirection();

      return null;
    }

    render(
      <DirectionProvider direction="rtl" wrapper={<View />}>
        <Component />
      </DirectionProvider>,
    );

    expect(dir).toBe('rtl');
  });
});
