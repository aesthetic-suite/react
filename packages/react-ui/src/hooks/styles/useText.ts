import { useMemo } from 'react';
import { ClassName, SIZES, style, TextSize, useStyles } from '@aesthetic/react';
import { mapVariants } from '../../helpers/mapVariants';

export function useText(size: TextSize): ClassName {
	const cx = useStyles(styleSheet);

	return useMemo(() => cx({ size }, 'element'), [cx, size]);
}

export const styleSheet = style((css) => ({
	fontFamily: css.var('typography-font-text'),

	'@variants': {
		...mapVariants('size', SIZES, (size) => ({
			lineHeight: css.var(`text-${size}-line-height`),
			fontSize: css.var(`text-${size}-size`),
		})),
	},
}));
