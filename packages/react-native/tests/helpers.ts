import {
	darkTheme,
	design,
	lightTheme,
	setupAesthetic,
	teardownAesthetic,
} from '@aesthetic/core/test';
import { aesthetic } from '../src/aesthetic';

export const dawnTheme = design.createTheme(
	{ contrast: 'normal', scheme: 'light' },
	lightTheme.tokens,
);

export const twilightTheme = design.createTheme(
	{ contrast: 'normal', scheme: 'dark' },
	darkTheme.tokens,
);

export function setupAestheticReact() {
	// Order is important here!
	aesthetic.registerTheme('twilight', twilightTheme);
	aesthetic.registerTheme('dawn', dawnTheme);

	setupAesthetic(aesthetic);

	aesthetic.configure({
		injectStrategy: 'create',
	});
}

export function teardownAestheticReact() {
	teardownAesthetic(aesthetic);
	dawnTheme.name = '';
	twilightTheme.name = '';
}
