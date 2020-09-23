/* eslint-disable react/jsx-no-literals */

import React from 'react';
import { render } from 'rut-dom';
import { getRenderedStyles } from '@aesthetic/core/lib/testing';
import { createStyled } from '../src';
import { Wrapper } from './__mocks__/Button';
import { setupAestheticReact, teardownAestheticReact } from './helpers';

describe('createStyled()', () => {
  beforeEach(() => {
    setupAestheticReact();
  });

  afterEach(() => {
    teardownAestheticReact();
  });

  it('creates and renders a button with defined styles', () => {
    const Button = createStyled('button', () => ({
      display: 'inline-flex',
      textAlign: 'center',
      padding: '1rem',
    }));

    const { debug } = render<{}>(<Button>Test</Button>, {
      wrapper: <Wrapper />,
    });

    expect(debug({ log: false })).toMatchSnapshot();
    expect(getRenderedStyles('standard')).toMatchSnapshot();
  });
});
