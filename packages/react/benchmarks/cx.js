/* eslint-disable sort-keys, babel/no-invalid-this, import/no-extraneous-dependencies */

const { generateClassName } = require('@aesthetic/core');
const { isObject, objectLoop } = require('@aesthetic/utils');
const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();
const sizes = ['xs', 'sm', 'df', 'lg', 'xl'];
const palettes = ['brand', 'neutral', 'positive', 'negative', 'warning'];

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCxArgs() {
	return [
		{ palette: palettes[random(0, palettes.length)], size: sizes[random(0, sizes.length)] },
		'element',
		'element_block',
		false && 'element_inline',
		undefined && 'element_modifier1',
		'element_modifier2',
		null && 'element_modifier3',
	];
}

const cxClassNames = {
	element: {
		class: 'element',
		variants: {
			size_sm: 'element@size_sm',
			size_df: 'element@size_df',
			size_lg: 'element@size_lg',
			palette_brand: 'element@palette_brand',
			palette_neutral: 'element@palette_neutral',
		},
	},
	element_block: {
		class: 'element_block',
		variants: {
			size_sm: 'element_block@size_sm',
		},
	},
	element_inline: {
		class: 'element_inline',
	},
	element_modifier1: {
		class: 'element_modifier1',
		variants: {
			size_sm: 'element_modifier1@size_sm',
			size_df: 'element_modifier1@size_df',
			size_lg: 'element_modifier1@size_lg',
		},
	},
	element_modifier2: {
		class: 'element_modifier2',
		variants: {
			palette_neutral: 'element_modifier2@palette_neutral',
			palette_positive: 'element_modifier2@palette_positive',
			palette_negative: 'element_modifier2@palette_negative',
		},
	},
	element_modifier3: {
		class: 'element_modifier3',
		variants: {
			palette_brand: 'element_modifier3@palette_brand',
			palette_warning: 'element_modifier3@palette_warning',
		},
	},
};

// CX with no caching, iteration only
function cxNoCache(keys, classNames) {
	const variants = [];

	if (isObject(keys[0])) {
		objectLoop(keys.shift(), (value, type) => {
			variants.push(`${type}_${value}`);
		});
	}

	return generateClassName(keys, variants, classNames);
}

suite.add('cxNoCache()', () => {
	cxNoCache(getCxArgs(), cxClassNames);
});

// CX with variant caching
const variantCache = {};

function cxWithVariantCache(keys, classNames) {
	let variants = [];

	if (isObject(keys[0])) {
		const variantOptions = keys.shift();
		const cacheKey = JSON.stringify(variantOptions);
		const cache = variantCache[cacheKey];

		if (cache) {
			variants = cache;
		} else {
			objectLoop(variantOptions, (value, type) => {
				variants.push(`${type}_${value}`);
			});

			variantCache[cacheKey] = variants;
		}
	}

	return generateClassName(keys, variants, classNames);
}

suite.add('cxWithVariantCache()', () => {
	cxWithVariantCache(getCxArgs(), cxClassNames);
});

// CX with arguments caching
const argCache = {};

function cxWithArgumentsCache(keys, classNames) {
	const cacheKey = JSON.stringify([keys, classNames]);
	const cache = argCache[cacheKey];

	if (cache) {
		return cache;
	}

	const variants = [];

	if (isObject(keys[0])) {
		objectLoop(keys.shift(), (value, type) => {
			variants.push(`${type}_${value}`);
		});
	}

	argCache[cacheKey] = generateClassName(keys, variants, classNames);

	return argCache[cacheKey];
}

suite.add('cxWithArgumentsCache()', () => {
	cxWithArgumentsCache(getCxArgs(), cxClassNames);
});

// CX with variants
function cxNoVariants(keys, classNames) {
	return generateClassName(keys.slice(1), [], classNames);
}

suite.add('cxNoVariants()', () => {
	cxNoVariants(getCxArgs(), cxClassNames);
});

// Run all
suite
	.on('cycle', function cycle(event) {
		console.log(String(event.target));
	})
	.on('complete', function complete() {
		console.log(`Fastest is ${this.filter('fastest').map('name')}`);
	})
	.run();
