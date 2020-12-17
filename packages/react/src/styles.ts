import { createStyleHelpers } from '@aesthetic/core-react';
import aesthetic from './aesthetic';
import { useDirection } from './direction';
import { useTheme } from './theme';

export const { useStyles, withStyles } = createStyleHelpers(aesthetic, {
  generate: aesthetic.generateClassName,
  useDirection,
  useTheme,
});
