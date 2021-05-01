import { createComponentStyles } from '@aesthetic/react';

export default createComponentStyles((css) => ({
  button: css.mixin(
    'reset-button',
    css.mixin('reset-typography', {
      display: 'inline-flex',
      textAlign: 'center',
      color: css.var('palette-neutral-text'),
      fontFamily: css.var('typography-font-text'),

      '@selectors': {
        // Removes weird bonus padding from button in Firefox
        '::-moz-focus-inner': {
          border: 0,
          padding: 0,
          margin: 0,
        },
      },

      '@variants': {
        'size:sm': {
          fontSize: css.var('text-sm-size'),
          lineHeight: css.var('text-sm-line-height'),
          minWidth: css.unit(6),
          padding: `${css.var('spacing-sm')} ${css.var('spacing-df')}`,
        },
        'size:df': {
          fontSize: css.var('text-df-size'),
          lineHeight: css.var('text-df-line-height'),
          minWidth: css.unit(8),
          padding: `${css.var('spacing-df')} ${css.var('spacing-md')}`,
        },
        'size:lg': {
          fontSize: css.var('text-lg-size'),
          lineHeight: css.var('text-lg-line-height'),
          minWidth: css.unit(10),
          padding: `${css.var('spacing-md')} ${css.var('spacing-lg')}`,
        },
      },
    }),
  ),

  button_block: {
    display: 'flex',
    width: '100%',
    whiteSpace: 'normal',
    overflow: 'hidden',
  },
}));
