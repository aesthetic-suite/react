/* eslint-disable react/jsx-no-literals */

import React from 'react';
import { render } from 'rut-dom';
import { getRenderedStyles, purgeStyles } from '@aesthetic/core/lib/testing';
import { createStyled } from '../src';
import { Wrapper } from './__mocks__/Button';
import { setupAestheticReact, teardownAestheticReact } from './helpers';

describe('createStyled()', () => {
  beforeEach(() => {
    setupAestheticReact();
  });

  afterEach(() => {
    purgeStyles();
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

  it('only renders styles once, even when component rerenders', () => {
    const spy = jest.fn(() => ({
      textDecoration: 'none',
    }));

    const Link = createStyled('a', spy);

    const { debug, update } = render<{}>(<Link href="/foo/bar">Test</Link>, {
      wrapper: <Wrapper />,
    });

    update();
    update();
    update();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(debug({ log: false })).toMatchSnapshot();
    expect(getRenderedStyles('standard')).toMatchSnapshot();
  });
});
