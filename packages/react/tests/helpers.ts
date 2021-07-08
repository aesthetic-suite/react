import {
	darkTheme,
	design,
	lightTheme,
	setupAesthetic,
	teardownAesthetic,
} from '@aesthetic/core/test';
import { createTestStyleEngine, purgeStyles } from '@aesthetic/style/test';
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
