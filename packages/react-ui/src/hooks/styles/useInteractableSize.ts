import { useMemo } from 'react';
import { ClassName, CommonSize, style, useStyles } from '@aesthetic/react';

export function useInteractableSize(size: CommonSize): ClassName {
	const cx = useStyles(styleSheet);

	return useMemo(() => cx({ size }, 'element'), [cx, size]);
}

export const styleSheet = style((css) => ({
	'@variants': {
		'size:sm': {
			lineHeight: css.var('text-sm-line-height'),
			fontSize: css.var('text-sm-size'),
			padding: css.unit(0.25, 0.75),
			minWidth: 4 * css.tokens.spacing.unit,
		},
		'size:df': {
			lineHeight: css.var('text-df-line-height'),
			fontSize: css.var('text-df-size'),
			padding: css.unit(0.75, 1.25),
			minWidth: 5 * css.tokens.spacing.unit,
		},
		'size:lg': {
			lineHeight: css.var('text-lg-line-height'),
			fontSize: css.var('text-lg-size'),
			padding: css.unit(1.25, 2),
			minWidth: 6 * css.tokens.spacing.unit,
		},
	},
}));
