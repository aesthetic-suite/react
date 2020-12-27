import { I18nManager } from 'react-native';
import { Aesthetic, Engine } from '@aesthetic/core';
import { NativeStyles } from './types';

function unsupported(method: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (): any => {
    // eslint-disable-next-line no-console
    console.warn(`${method} is not supported by React Native.`);
  };
}

const engine: Engine<NativeStyles> = {
  cacheManager: {},
  direction: I18nManager.isRTL ? 'rtl' : 'ltr',
  renderDeclaration: unsupported('renderDeclaration()'),
  renderFontFace: unsupported('renderFontFace()'),
  renderImport: unsupported('renderImport()'),
  renderKeyframes: unsupported('renderKeyframes()'),
  renderRule: unsupported('renderRule()'),
  renderRuleGrouped: unsupported('renderRuleGrouped()'),
  renderVariable: unsupported('renderVariable()'),
  ruleIndex: 0,
  setDirection: (direction) => {
    engine.direction = direction;
  },
  setRootVariables: unsupported('setRootVariables()'),
};

const aesthetic = new Aesthetic<NativeStyles, NativeStyles>();

aesthetic.configureEngine(engine);

export default aesthetic;
