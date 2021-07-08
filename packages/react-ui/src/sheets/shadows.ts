import { SHADOW_SIZES, style } from '@aesthetic/react';
import { mapVariants } from '../helpers/mapVariants';

export const shadowStyleSheet = style(
	(css) => ({
		'@variants': {
			...mapVariants('shadow', SHADOW_SIZES, (size) => ({
				boxShadow: [
					css.var(`shadow-${size}-x`),
					css.var(`shadow-${size}-y`),
					css.var(`shadow-${size}-blur`),
					css.var(`shadow-${size}-spread`),
					'rgba(0, 0, 0, .8)',
				].join(' '),
			})),
		},
	}),
	'shadows',
);
