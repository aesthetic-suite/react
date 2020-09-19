import { ClassNameSheet, ClassNameSheetVariants, generateClassName } from '@aesthetic/core';
import { isObject, objectLoop } from '@aesthetic/utils';

const variantCache: Record<string, string[]> = {};

export default function cxHandler(keys: unknown[], classNames: ClassNameSheet<string>) {
  const names = keys as string[];
  let variantNames: string[] = [];

  if (isObject(names[0])) {
    const variants = (names.shift() as unknown) as ClassNameSheetVariants;
    const cacheKey = JSON.stringify(variants);
    const cache = variantCache[cacheKey];

    if (cache) {
      variantNames = cache;
    } else {
      objectLoop(variants, (value, type) => {
        variantNames.push(`${type}_${value}`);
      });

      variantCache[cacheKey] = variantNames;
    }
  }

  return generateClassName(names, variantNames, classNames);
}
