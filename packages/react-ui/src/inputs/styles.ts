import { PaletteType, style } from '@aesthetic/react';
import { mapVariants } from '../helpers/mapVariants';

export const styleSheet = style((css) => ({
	width: '100%',
	display: 'block',
	color: css.var('palette-neutral-text'),
	backgroundColor: css.var('palette-neutral-color-00'),
	borderColor: css.var(`palette-neutral-bg-base`),
	borderStyle: 'solid',
	appearance: 'none',
	outline: 'none',
	margin: 0,
	padding: 0,
	zIndex: 0,

	':disabled': {
		cursor: 'default',
	},

	'::placeholder': {
		color: css.var('palette-muted-text'),
	},

	'@variants': {
		...mapVariants(
			'palette',
			['negative', 'positive', 'primary', 'warning'] as PaletteType[],
			(palette) => ({
				borderColor: css.var(`palette-${palette}-bg-base`),

				':focus': { borderColor: css.var(`palette-${palette}-bg-focused`) },
				':hover': { borderColor: css.var(`palette-${palette}-bg-hovered`) },

				':disabled': {
					borderColor: css.var(`palette-${palette}-bg-disabled`),
					color: css.var(`palette-${palette}-fg-disabled`),
				},
			}),
		),
	},
}));
