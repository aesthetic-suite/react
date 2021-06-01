import { objectLoop } from '@aesthetic/utils';

export function mapObject<P, N>(
  base: Record<string, P>,
  onValue: (value: P) => N | undefined,
  onKey?: (key: string) => string,
): Record<string, N> {
  const object: Record<string, unknown> = {};

  objectLoop(base, (value, key) => {
    const nextValue = onValue(value);

    if (nextValue !== undefined) {
      object[onKey ? onKey(key) : key] = nextValue;
    }
  });

  return object as Record<string, N>;
}
