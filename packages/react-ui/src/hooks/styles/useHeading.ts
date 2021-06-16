import { useMemo } from 'react';
import { ClassName, HEADING_LEVELS, HeadingLevel, style, useStyles } from '@aesthetic/react';
import { mapVariants } from '../../helpers/mapVariants';

export function useHeading(level: HeadingLevel): ClassName {
	const cx = useStyles(styleSheet);

	return useMemo(() => cx({ level }, 'element'), [cx, level]);
}

export const styleSheet = style((css) => ({
	fontFamily: css.var('typography-font-heading'),

	'@variants': {
		...mapVariants('level', HEADING_LEVELS, (level) => ({
			lineHeight: css.var(`heading-l${level}-line-height` as 'heading-l1-line-height'),
			fontSize: css.var(`heading-l${level}-size` as 'heading-l1-size'),
			letterSpacing: css.var(`heading-l${level}-letter-spacing` as 'heading-l1-letter-spacing'),
		})),
	},
}));
