import { useMemo } from 'react';
import { ClassName, SHADOW_SIZES, ShadowSize, style, useStyles } from '@aesthetic/react';
import { mapVariants } from '../../helpers/mapVariants';

export function useShadow(size?: ShadowSize): ClassName {
  const cx = useStyles(styleSheet);

  return useMemo(() => cx({ size }, 'element'), [cx, size]);
}

export const styleSheet = style((css) => ({
  '@variants': {
    ...mapVariants('size', SHADOW_SIZES, (size) => ({
      boxShadow: [
        css.var(`shadow-${size}-x` as 'shadow-sm-x'),
        css.var(`shadow-${size}-y` as 'shadow-sm-y'),
        css.var(`shadow-${size}-blur` as 'shadow-sm-blur'),
        css.var(`shadow-${size}-spread` as 'shadow-sm-spread'),
        css.var('palette-neutral-color-90'),
      ].join(' '),
    })),
  },
}));
