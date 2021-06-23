import { PaletteType, styles } from '@aesthetic/react';

export const styleSheet = styles((css) => {
	function solid(palette: PaletteType) {
		return {
			color: css.var(`palette-${palette}-text`),
			backgroundColor: css.var(`palette-${palette}-bg-base`),
			borderColor: css.var(`palette-${palette}-bg-base`),
		};
	}

	function hollow(palette: PaletteType) {
		return {
			color: css.var(`palette-${palette}-text`),
			backgroundColor: css.var('palette-neutral-color-00'),
			borderColor: css.var(`palette-${palette}-bg-base`),
		};
	}

	function empty(palette: PaletteType) {
		return {
			color: css.var(`palette-${palette}-text`),
			backgroundColor: 'transparent',
			borderColor: 'transparent',
		};
	}

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
			border: 0,
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
					padding: css.var('spacing-sm'),
					minWidth: 8 * css.tokens.spacing.unit,
				},
				'size:df': {
					lineHeight: css.var('text-df-line-height'),
					fontSize: css.var('text-df-size'),
					padding: css.var('spacing-df'),
					minWidth: 10 * css.tokens.spacing.unit,
				},
				'size:lg': {
					lineHeight: css.var('text-lg-line-height'),
					fontSize: css.var('text-lg-size'),
					padding: css.var('spacing-lg'),
					minWidth: 12 * css.tokens.spacing.unit,
				},

				// Palettes
				'palette:primary + fill:solid': solid('primary'),
				'palette:primary + fill:hollow': hollow('primary'),
				'palette:primary + fill:empty': empty('primary'),
			},
		},
	};
});
