import { PALETTE_TYPES, RuleMap, StateType, styles, Rule, ColorShade } from '@aesthetic/react';

export const styleSheet = styles((css) => {
	const paletteVariants: RuleMap = {};
	const emptyBackgroundHues: Record<Exclude<StateType, 'disabled'>, ColorShade> = {
		focused: '00',
		hovered: '00',
		selected: '10',
	};

	function composeRule(stateFactory: (state: StateType | 'base') => Rule) {
		return {
			...stateFactory('base'),
			'@selectors': {
				':focus, .is-focused': stateFactory('focused'),
				':hover, .is-hovered': stateFactory('hovered'),
				':active, .is-active': stateFactory('selected'),
				':disabled, .is-disabled': stateFactory('disabled'),
			},
		};
	}

	PALETTE_TYPES.forEach((palette) => {
		// Solid
		paletteVariants[`palette:${palette} + fill:solid`] = composeRule((state) => ({
			color: css.var(`palette-${palette}-fg-${state}`),
			backgroundColor: css.var(`palette-${palette}-bg-${state}`),
			borderColor: css.var(`palette-${palette}-bg-${state}`),
		}));

		// Hollow
		paletteVariants[`palette:${palette} + fill:hollow`] = composeRule((state) => {
			const backgroundColor =
				state === 'base' || state === 'disabled'
					? 'transparent'
					: css.var(`palette-${palette}-color-${emptyBackgroundHues[state]}`);

			return {
				color: css.var(`palette-${palette}-bg-${state}`),
				backgroundColor,
				borderColor: css.var(`palette-${palette}-bg-${state}`),
			};
		});

		// Empty
		paletteVariants[`palette:${palette} + fill:empty`] = composeRule((state) => {
			const color =
				state === 'base' || state === 'disabled'
					? 'transparent'
					: css.var(`palette-${palette}-color-${emptyBackgroundHues[state]}`);

			return {
				color: css.var(`palette-${palette}-bg-${state}`),
				backgroundColor: color,
				borderColor: color,
			};
		});
	});

	return {
		button: {
			display: 'inline-flex',
			flexWrap: 'nowrap',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'relative',
			verticalAlign: 'middle',
			textAlign: 'center',
			textDecoration: 'none',
			fontWeight: 'bold',
			fontFamily: css.var('typography-font-text'),
			cursor: 'pointer',
			borderStyle: 'solid',
			borderWidth: 0,
			margin: 0,
			padding: 0,

			'@selectors': {
				// Removes weird bonus padding from button in Firefox
				'::-moz-focus-inner': {
					border: 0,
					padding: 0,
					margin: 0,
				},
			},

			'@variants': {
				// Borders
				'border:sm': {
					borderWidth: css.var('border-sm-width'),
				},
				'border:df': {
					borderWidth: css.var('border-df-width'),
				},
				'border:lg': {
					borderWidth: css.var('border-lg-width'),
				},

				// Border shapes
				'shape:pill': {
					borderRadius: 100,
				},
				'shape:round + border:sm': {
					borderRadius: css.var('border-sm-radius'),
				},
				'shape:round + border:df': {
					borderRadius: css.var('border-df-radius'),
				},
				'shape:round + border:lg': {
					borderRadius: css.var('border-lg-radius'),
				},
				'shape:sharp': {
					borderRadius: 0,
				},

				// Sizes
				'size:sm': {
					lineHeight: css.var('text-sm-line-height'),
					fontSize: css.var('text-sm-size'),
					padding: css.var('spacing-xs'),
					minWidth: 4 * css.tokens.spacing.unit,
				},
				'size:df': {
					lineHeight: css.var('text-df-line-height'),
					fontSize: css.var('text-df-size'),
					padding: css.var('spacing-sm'),
					minWidth: 5 * css.tokens.spacing.unit,
				},
				'size:lg': {
					lineHeight: css.var('text-lg-line-height'),
					fontSize: css.var('text-lg-size'),
					padding: css.var('spacing-df'),
					minWidth: 6 * css.tokens.spacing.unit,
				},

				// Palettes
				...paletteVariants,
			},
		},
	};
});
