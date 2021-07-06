import { PaletteType, style } from '@aesthetic/react';
import { mapVariants } from '../helpers/mapVariants';

export const styleSheet = style((css) => ({
	width: '100%',
	display: 'block',
	backgroundColor: css.var('palette-neutral-bg-base'),
	color: css.var('palette-neutral-text'),
	borderStyle: 'solid',

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
				':disabled': { borderColor: css.var(`palette-${palette}-bg-disabled`) },
			}),
		),
	},
}));
