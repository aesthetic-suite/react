/* eslint-disable react/jsx-no-literals */

import React, { useMemo } from 'react';
import { render } from 'rut-dom';
import { getRenderedStyles } from '@aesthetic/style/test';
import { Rule } from '@aesthetic/types';
import { useCss } from '../src';
import aesthetic from '../src/aesthetic';
import { ButtonProps } from './__mocks__/Button';
import { setupAestheticReact, teardownAestheticReact } from './helpers';

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

  function ButtonWithOptions({ children }: ButtonProps) {
    const options = useMemo(
      () => ({
        deterministic: true,
        conditions: ['@supports (display: inline-flex)'],
      }),
      [],
    );
    const className = useCss(styles, options);

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
    const { root } = render<ButtonProps>(<Button>Child</Button>);

    expect(getRenderedStyles('standard')).toMatchSnapshot();

    expect(root.findOne('button')).toHaveProp('className', 'a b c d');
  });

  it('renders with custom options', () => {
    const { root } = render<ButtonProps>(<ButtonWithOptions>Child</ButtonWithOptions>);

    expect(getRenderedStyles('conditions')).toMatchSnapshot();

    expect(root.findOne('button')).toHaveProp('className', 'c7a2jwm cz4mqki c9n9uql ch6ahvm');
  });

  it('only renders styles once', () => {
    const spy = jest.spyOn(aesthetic.getEngine(), 'renderRule');

    const { update } = render<ButtonProps>(<Button>Child</Button>);

    update();
    update();
    update();

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });
});
