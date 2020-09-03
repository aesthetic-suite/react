import { createComponentStyles } from '@aesthetic/react';

export default createComponentStyles((css) => ({
  button: css.mixin('pattern-reset-button', {
    display: 'inline-flex',
    textAlign: 'center',

    '@selectors': {
      // Removes weird bonus padding from button in Firefox
      '::-moz-focus-inner': {
        border: 0,
        padding: 0,
        margin: 0,
      },
    },

    '@variants': {
      size_sm: css.mixin('text-sm', {
        minWidth: css.unit(6),
        padding: {
          leftRight: css.var('spacing-df'),
          topBottom: css.var('spacing-sm'),
        },
      }),
      size_df: css.mixin('text-df', {
        minWidth: css.unit(8),
        padding: {
          leftRight: css.var('spacing-md'),
          topBottom: css.var('spacing-df'),
        },
      }),
      size_lg: css.mixin('text-lg', {
        minWidth: css.unit(10),
        padding: {
          leftRight: css.var('spacing-xl'),
          topBottom: css.var('spacing-lg'),
        },
      }),
    },
  }),

  button_block: {
    display: 'flex',
    width: '100%',
    whiteSpace: 'normal',
    overflow: 'hidden',
  },
}));
