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

  it('can pass custom props/attributes', () => {
    const Input = createStyled('input', () => ({
      border: '1px solid black',
      padding: '1rem',
      ':focus': {
        outline: 'none',
      },
    }));

    const { debug } = render<{}>(
      <Input disabled={false} type="text" placeholder="Search..." className="will-be-appended" />,
      {
        wrapper: <Wrapper />,
      },
    );

    expect(debug({ log: false })).toMatchSnapshot();
    expect(getRenderedStyles('standard')).toMatchSnapshot();
  });

  it('can use and define CSS variables', () => {
    const Code = createStyled('code', (css) => ({
      fontSize: css.var('text-sm-size'),
      lineHeight: css.token('text-sm-line-height') as number,
      '@variables': {
        elementLevelVar: 'nice',
      },
    }));

    const { debug } = render<{}>(<Code />, {
      wrapper: <Wrapper />,
    });

    expect(debug({ log: false })).toMatchSnapshot();
    expect(getRenderedStyles('standard')).toMatchSnapshot();
  });

  it('supports variants', () => {
    interface AlertProps {
      palette?: 'success' | 'failure' | 'warning';
    }

    const Alert = createStyled<'div', AlertProps>('div', (css) => ({
      background: css.var('palette-neutral-bg-base'),
      '@variants': {
        palette: {
          success: {
            background: css.var('palette-success-bg-base'),
          },
          failure: {
            background: css.var('palette-failure-bg-base'),
          },
          warning: {
            background: css.var('palette-warning-bg-base'),
          },
        },
      },
    }));

    const { debug, update } = render<AlertProps>(
      <Alert palette="success">
        <div>
          <h1>Title</h1>And other content!
        </div>
      </Alert>,
      {
        wrapper: <Wrapper />,
      },
    );

    expect(debug({ log: false })).toMatchSnapshot();
    expect(getRenderedStyles('standard')).toMatchSnapshot();

    update({ palette: 'failure' });

    expect(debug({ log: false })).toMatchSnapshot();

    update({ palette: undefined });

    expect(debug({ log: false })).toMatchSnapshot();
  });

  it('can access the ref', () => {
    const Icon = createStyled('svg', () => ({
      display: 'inline-block',
      verticalAlign: 'bottom',
      width: '16px',
    }));

    const svg = document.createElement('svg');
    const spy = jest.fn();
    const { debug } = render<{}>(<Icon ref={spy} />, {
      mockRef: () => svg,
      wrapper: <Wrapper />,
    });

    expect(spy).toHaveBeenCalledWith(svg);
    expect(debug({ log: false })).toMatchSnapshot();
  });
});
