import { style } from '@aesthetic/react';

export const borderStyleSheet = style(
	(css) => ({
		borderColor: 'transparent',
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
