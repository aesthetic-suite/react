import { PALETTE_TYPES, styles } from '@aesthetic/react';
import { mapVariants } from '../helpers/mapVariants';

export const styleSheet = styles((css) => {
	function weight(size: number | 'inherit') {
		return {
			fontWeight: size,
		};
	}

	return {
		typography: {
			color: css.var('palette-neutral-text'),
			margin: 0,
			padding: 0,

			'@variants': {
				// Alignment
				'align:start': {
					textAlign: 'start',
					'@fallbacks': {
						textAlign: 'left',
					},
				},
				'align:center': {
					textAlign: 'center',
				},
				'align:end': {
					textAlign: 'end',
					'@fallbacks': {
						textAlign: 'right',
					},
				},
				'align:justify': {
					textAlign: 'justify',
				},

				// Overflow
				'overflow:break': css.mixin('text-break'),
				'overflow:clip': css.mixin('text-truncate', {
					textOverflow: 'clip',
				}),
				'overflow:truncate': css.mixin('text-truncate'),
				'overflow:wrap': css.mixin('text-wrap'),

				// Palettes
				...mapVariants('palette', PALETTE_TYPES, (palette) => ({
					color: css.var(`palette-${palette}-text`),
				})),

				// Transforms
				'transform:capitalize': { textTransform: 'capitalize' },
				'transform:lowercase': { textTransform: 'lowercase' },
				'transform:uppercase': { textTransform: 'uppercase' },

				// Font weights
				'weight:inherit': weight('inherit'),
				'weight:thin': weight(100),
				'weight:light': weight(300),
				'weight:normal': weight(400),
				'weight:bold': weight(600),
				'weight:black': weight(800),
			},
		},

		monospace: {
			fontFamily: css.var('typography-font-monospace'),
		},

		link: {
			display: 'inline-block',
			backgroundColor: 'transparent',
			borderColor: 'transparent',
			borderWidth: 0,
			cursor: 'pointer',
			textDecoration: 'none',
			fontFamily: 'inherit',
			fontSize: 'inherit',
			lineHeight: 'inherit',

			'@variants': {
				// Palettes
				...mapVariants('palette', PALETTE_TYPES, (palette) => ({
					color: css.var(`palette-${palette}-text`),
					'@selectors': {
						':visited': { color: css.var(`palette-${palette}-color-60`) },
						':hover': { color: css.var(`palette-${palette}-color-80`) },
						':active': { color: css.var(`palette-${palette}-color-90`) },
					},
				})),
			},
		},
	};
});
