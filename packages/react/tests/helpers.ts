// eslint-disable-next-line import/no-extraneous-dependencies
import mixins from '@aesthetic/addon-mixins';
import {
  lightTheme,
  darkTheme,
  design,
  teardownAesthetic,
  purgeStyles,
} from '@aesthetic/core/lib/testing';
import { registerTheme } from '../src';

export const designWithMixins = design.extend('react', {}, mixins);

export const dawnTheme = designWithMixins.createTheme(
  { contrast: 'normal', scheme: 'light' },
  lightTheme.tokens,
);

export const twilightTheme = designWithMixins.createTheme(
  { contrast: 'normal', scheme: 'dark' },
  darkTheme.tokens,
);

export function setupAestheticReact() {
  registerTheme('dawn', dawnTheme);
  registerTheme('twilight', twilightTheme);
}

export function teardownAestheticReact() {
  dawnTheme.name = '';
  twilightTheme.name = '';
  teardownAesthetic();
  purgeStyles();
}
