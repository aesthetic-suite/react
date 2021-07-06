import { useMemo } from 'react';
import { BorderSize, ClassName, style, useStyles } from '@aesthetic/react';
import { Shape } from '../../types/shape';

export function useShapedBorder(size?: BorderSize, shape?: Shape): ClassName {
	const cx = useStyles(styleSheet);

	return useMemo(() => cx({ size, shape }, 'element'), [cx, size, shape]);
}

export const styleSheet = style((css) => ({
	borderStyle: 'solid',

	'@variants': {
		'size:sm': { borderWidth: css.var('border-sm-width') },
		'size:df': { borderWidth: css.var('border-df-width') },
		'size:lg': { borderWidth: css.var('border-lg-width') },

		'shape:pill': { borderRadius: 100 },
		'shape:round + size:sm': { borderRadius: css.var('border-sm-radius') },
		'shape:round + size:df': { borderRadius: css.var('border-df-radius') },
		'shape:round + size:lg': { borderRadius: css.var('border-lg-radius') },
		'shape:sharp': { borderRadius: 0 },
	},
}));
