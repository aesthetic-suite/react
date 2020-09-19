import { ClassNameSheet, ClassNameSheetVariants, generateClassName } from '@aesthetic/core';
import { isObject, objectLoop } from '@aesthetic/utils';

export default function generateCX(keys: unknown[], classNames: ClassNameSheet<string>) {
  const variants: string[] = [];

  // Variant objects may only be passed as the first argument
  if (isObject(keys[0])) {
    objectLoop(keys.shift() as ClassNameSheetVariants, (value, type) => {
      variants.push(`${type}_${value}`);
    });
  }

  return generateClassName(keys as string[], variants, classNames);
}
