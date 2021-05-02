import { Appearance, I18nManager } from 'react-native';
import { Aesthetic } from '@aesthetic/core';
import { NativeBlock, NativeEngine, NativeStyles } from './types';

const noop = () => {};

function unsupported(method: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (): any => {
    // eslint-disable-next-line no-console
    console.warn(`${method} is not supported by React Native.`);
  };
}

const engine: NativeEngine = {
  atomic: false,
  direction: I18nManager.isRTL ? 'rtl' : 'ltr',
  prefersColorScheme: (scheme) => scheme === Appearance.getColorScheme(),
  prefersContrastLevel: () => false,
  renderDeclaration: unsupported('renderDeclaration()'),
  renderFontFace: unsupported('renderFontFace()'),
  renderImport: unsupported('renderImport()'),
  renderKeyframes: unsupported('renderKeyframes()'),
  renderRule: (rule) => rule as NativeStyles,
  renderRuleGrouped: unsupported('renderRuleGrouped()'),
  renderVariable: unsupported('renderVariable()'),
  ruleIndex: 0,
  setDirection: noop,
  setRootVariables: noop,
  setTheme: noop,
};

const aesthetic = new Aesthetic<NativeStyles, NativeBlock>();

aesthetic.configureEngine(engine);

export default aesthetic;
