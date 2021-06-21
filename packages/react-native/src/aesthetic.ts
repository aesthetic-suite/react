import { Appearance, I18nManager } from 'react-native';
import { Aesthetic, RenderResult, RenderResultVariant } from '@aesthetic/core';
import { objectLoop } from '@aesthetic/utils';
import { NativeEngine, NativeRule, NativeStyles } from './types';

const noop = () => {};

function unsupported(method: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (): any => {
		// eslint-disable-next-line no-console
		console.warn(`${method} is not supported by React Native.`);
	};
}

function renderRule(rule: NativeRule): RenderResult<NativeStyles> {
	const { '@variants': variantStyles, ...result } = rule;
	const variants: RenderResultVariant<NativeStyles>[] = [];

	if (variantStyles) {
		objectLoop(variantStyles, (variant, type) => {
			variants.push({
				result: variant,
				types: type.split('+').map((v) => v.trim()),
			});
		});
	}

	return { result, variants };
}

const engine: NativeEngine = {
	direction: I18nManager.isRTL ? 'rtl' : 'ltr',
	prefersColorScheme: (scheme) => scheme === Appearance.getColorScheme(),
	prefersContrastLevel: () => false,
	renderDeclaration: unsupported('renderDeclaration()'),
	renderFontFace: unsupported('renderFontFace()'),
	renderImport: unsupported('renderImport()'),
	renderKeyframes: unsupported('renderKeyframes()'),
	renderRule,
	renderRuleGrouped: unsupported('renderRuleGrouped()'),
	renderVariable: unsupported('renderVariable()'),
	ruleCount: 0,
	setDirection: noop,
	setRootVariables: noop,
	setTheme: noop,
};

export const aesthetic = new Aesthetic<NativeRule, NativeStyles>();

aesthetic.configureEngine(engine);
