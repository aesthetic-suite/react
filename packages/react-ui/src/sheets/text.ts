import { SIZES, style } from '@aesthetic/react';
import { mapVariants } from '../helpers/mapVariants';

export const textStyleSheet = style(
	(css) => ({
		fontFamily: css.var('typography-font-text'),

		'@variants': {
			...mapVariants('size', SIZES, (size) => ({
				lineHeight: css.var(`text-${size}-line-height`),
				fontSize: css.var(`text-${size}-size`),
			})),
		},
	}),
	'typography',
);
