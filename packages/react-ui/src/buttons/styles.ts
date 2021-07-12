import { ColorShade, PALETTE_TYPES, Rule, RuleMap, StateType, styles } from '@aesthetic/react';

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
				':focus': stateFactory('focused'),
				':hover': stateFactory('hovered'),
				':active': stateFactory('selected'),
				':disabled': stateFactory('disabled'),
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
			borderColor: 'transparent',
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
				...paletteVariants,
			},
		},

		buttonFluid: {
			width: '100%',
			maxWidth: '100%',
		},
	};
});
