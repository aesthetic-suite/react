/* eslint-disable react/jsx-no-literals */

import React from 'react';
import { render } from 'rut-dom';
import { DirectionProvider, DirectionProviderProps } from '../src';
import { setupAestheticReact, teardownAestheticReact } from './helpers';

describe('DirectionProvider', () => {
  beforeEach(() => {
    setupAestheticReact();
  });

  afterEach(() => {
    teardownAestheticReact();
  });

  it('renders and wraps with the chosen element', () => {
    const { root } = render<DirectionProviderProps>(
      <DirectionProvider wrapper={<article />}>
        <section>Content</section>
      </DirectionProvider>,
    );

    expect(root.find('article')).toHaveLength(1);
  });

  it('renders `ltr` explicitly with `dir`', () => {
    const { root } = render<DirectionProviderProps>(
      <DirectionProvider direction="ltr" wrapper={<div />}>
        <section>Content</section>
      </DirectionProvider>,
    );

    expect(root.findOne('div')).toHaveProp('dir', 'ltr');
  });

  it('renders `rtl` explicitly with `dir`', () => {
    const { root } = render<DirectionProviderProps>(
      <DirectionProvider direction="rtl" wrapper={<div />}>
        <section>Content</section>
      </DirectionProvider>,
    );

    expect(root.findOne('div')).toHaveProp('dir', 'rtl');
  });

  it('renders `dir` over `value`', () => {
    const { root } = render<DirectionProviderProps>(
      <DirectionProvider direction="rtl" value="Hello!" wrapper={<div />}>
        <section>Content</section>
      </DirectionProvider>,
    );

    expect(root.findOne('div')).toHaveProp('dir', 'rtl');
  });

  it('infers `ltr` from `value`', () => {
    const { root } = render<DirectionProviderProps>(
      <DirectionProvider value="Hello!" wrapper={<div />}>
        <section>Content</section>
      </DirectionProvider>,
    );

    expect(root.findOne('div')).toHaveProp('dir', 'ltr');
  });

  it('infers `rtl` from `value`', () => {
    const { root } = render<DirectionProviderProps>(
      <DirectionProvider value="بسيطة" wrapper={<div />}>
        <section>Content</section>
      </DirectionProvider>,
    );

    expect(root.findOne('div')).toHaveProp('dir', 'rtl');
  });
});
