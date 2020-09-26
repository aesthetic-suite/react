import { ClassNameSheet, ClassNameSheetVariants, generateClassName } from '@aesthetic/core';
import { isObject, objectLoop } from '@aesthetic/utils';

export default function generateCX(
  keys: unknown[],
  classNames: ClassNameSheet<string>,
  cache: Record<string, string>,
) {
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
    cache[cacheKey] = generateClassName(keys as string[], variants, classNames);
  }

  return cache[cacheKey];
}
