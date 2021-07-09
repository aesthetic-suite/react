import { style } from '@aesthetic/react';

export const borderStyleSheet = style(
	(css) => ({
		borderStyle: 'solid',

		'@variants': {
			'border:sm': {
				borderWidth: css.var('border-sm-width'),
				borderRadius: css.var('border-sm-radius'),
			},
			'border:df': {
				borderWidth: css.var('border-df-width'),
				borderRadius: css.var('border-df-radius'),
			},
			'border:lg': {
				borderWidth: css.var('border-lg-width'),
				borderRadius: css.var('border-lg-radius'),
			},
		},
	}),
	'borders',
);

export const shapedBorderStyleSheet = style(
	(css) => ({
		borderStyle: 'solid',

		'@variants': {
			'border:sm': { borderWidth: css.var('border-sm-width') },
			'border:df': { borderWidth: css.var('border-df-width') },
			'border:lg': { borderWidth: css.var('border-lg-width') },

			'shape:pill': { borderRadius: 100 },
			'shape:round + border:sm': { borderRadius: css.var('border-sm-radius') },
			'shape:round + border:df': { borderRadius: css.var('border-df-radius') },
			'shape:round + border:lg': { borderRadius: css.var('border-lg-radius') },
			'shape:sharp': { borderRadius: 0 },
		},
	}),
	'borders',
);
