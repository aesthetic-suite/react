import { ClassNameSheet, ClassNameSheetVariants } from '@aesthetic/core';
import { createStyleHelpers } from '@aesthetic/core-react';
import { ClassName } from '@aesthetic/types';
import { isObject, objectLoop } from '@aesthetic/utils';
import aesthetic from './aesthetic';
import { useDirection } from './direction';
import { useTheme } from './theme';

function generate(
  keys: unknown[],
  classNames: ClassNameSheet<string>,
  cache: Record<string, string>,
): ClassName {
  const variants: string[] = [];
  let cacheKey = '';

  // Variant objects may only be passed as the first argument
  if (isObject(keys[0])) {
    objectLoop(keys.shift() as ClassNameSheetVariants, (value, subType) => {
      const type = `${subType}_${value}`;

      variants.push(type);
      cacheKey += type;
    });
  }

  cacheKey += keys.filter(Boolean).join('');

  if (!cache[cacheKey]) {
    // eslint-disable-next-line no-param-reassign
    cache[cacheKey] = aesthetic.generateClassName(keys as string[], variants, classNames);
  }

  return cache[cacheKey];
}

export const { useStyles, withStyles } = createStyleHelpers<ClassName>(aesthetic, {
  generate,
  useDirection,
  useTheme,
});
