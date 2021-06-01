import { useMemo } from 'react';
import { BorderSize, ClassName, style, useStyles } from '@aesthetic/react';

export function useBorder(size?: BorderSize, applyRadius: boolean = false): ClassName {
  const cx = useStyles(styleSheet);

  return useMemo(() => cx({ size, radius: applyRadius && size }, 'element'), [
    cx,
    size,
    applyRadius,
  ]);
}

export const styleSheet = style((css) => ({
  borderColor: 'transparent',
  borderStyle: 'solid',

  '@variants': {
    'size:sm': { borderWidth: css.var('border-sm-width') },
    'size:df': { borderWidth: css.var('border-df-width') },
    'size:lg': { borderWidth: css.var('border-lg-width') },

    'radius:sm': { borderRadius: css.var('border-sm-radius') },
    'radius:df': { borderRadius: css.var('border-df-radius') },
    'radius:lg': { borderRadius: css.var('border-lg-radius') },
  },
}));
