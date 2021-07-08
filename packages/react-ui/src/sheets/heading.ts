import { HEADING_LEVELS, style } from '@aesthetic/react';
import { mapVariants } from '../helpers/mapVariants';

export const headingStyleSheet = style(
	(css) => ({
		fontFamily: css.var('typography-font-heading'),

		'@variants': {
			...mapVariants('level', HEADING_LEVELS, (level) => ({
				lineHeight: css.var(`heading-l${level}-line-height`),
				fontSize: css.var(`heading-l${level}-size`),
				letterSpacing: css.var(`heading-l${level}-letter-spacing`),
			})),
		},
	}),
	'typography',
);
