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
      size: {
        sm: css.mixin('text-sm', {
          minWidth: css.unit(6),
          padding: `${css.var('spacing-sm')} ${css.var('spacing-df')}`,
        }),
        df: css.mixin('text-df', {
          minWidth: css.unit(8),
          padding: `${css.var('spacing-df')} ${css.var('spacing-md')}`,
        }),
        lg: css.mixin('text-lg', {
          minWidth: css.unit(10),
          padding: `${css.var('spacing-md')} ${css.var('spacing-lg')}`,
        }),
      },
    },
  }),

  button_block: {
    display: 'flex',
    width: '100%',
    whiteSpace: 'normal',
    overflow: 'hidden',
  },
}));
