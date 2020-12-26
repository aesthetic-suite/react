// eslint-disable-next-line import/no-extraneous-dependencies
import mixins from '@aesthetic/addon-mixins';
import {
  lightTheme,
  darkTheme,
  design,
  teardownAesthetic,
  setupAesthetic,
} from '@aesthetic/core/test';
import { createTestStyleEngine, purgeStyles } from '@aesthetic/style/test';
import aesthetic from '../src/aesthetic';

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
  // Order is important here!
  aesthetic.registerTheme('twilight', twilightTheme);
  aesthetic.registerTheme('dawn', dawnTheme);
  aesthetic.configureEngine(createTestStyleEngine());
  setupAesthetic(aesthetic);
}

export function teardownAestheticReact() {
  // Order is important here!
  purgeStyles();
  teardownAesthetic(aesthetic);
  dawnTheme.name = '';
  twilightTheme.name = '';
}
