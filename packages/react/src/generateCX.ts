import { ClassNameSheet, ClassNameSheetVariants, generateClassName } from '@aesthetic/core';
import { isObject, objectLoop } from '@aesthetic/utils';

const variantCache: Record<string, string[]> = {};

export default function generateCX(keys: unknown[], classNames: ClassNameSheet<string>) {
  let variants: string[] = [];

  // Variant objects may only be passed as the first argument
  if (isObject(keys[0])) {
    const variantOptions = keys.shift() as ClassNameSheetVariants;
    const cacheKey = JSON.stringify(variantOptions);
    const cache = variantCache[cacheKey];

    if (cache) {
      variants = cache;
    } else {
      objectLoop(variantOptions, (value, type) => {
        variants.push(`${type}_${value}`);
      });

      variantCache[cacheKey] = variants;
    }
  }

  return generateClassName(keys as string[], variants, classNames);
}
