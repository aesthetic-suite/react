/* eslint-disable react/jsx-no-literals */

import React from 'react';
import { render } from 'rut-dom';
import { getRenderedStyles } from '@aesthetic/style/test';
import { Rule } from '@aesthetic/types';
import { useCss } from '../src';
import { createStyleSheet, ButtonProps, Wrapper } from './__mocks__/Button';
import { dawnTheme, setupAestheticReact, teardownAestheticReact, twilightTheme } from './helpers';

describe('useCss()', () => {
  const styles: Rule = {
    position: 'relative',
    display: 'inline-flex',
    textAlign: 'center',
    padding: 8,
  };

  function Button({ children }: ButtonProps) {
    const className = useCss(styles);

    return (
      <button type="button" className={className}>
        {children}
      </button>
    );
  }

  beforeEach(() => {
    setupAestheticReact();
  });

  afterEach(() => {
    teardownAestheticReact();
  });

  it('renders a button and its base styles', () => {
    const { root } = render<ButtonProps>(<Button>Child</Button>, {
      wrapper: <Wrapper />,
    });

    expect(getRenderedStyles('standard')).toMatchSnapshot();

    expect(root.findOne('button')).toHaveProp('className', 'a b c d');
  });
});
