export function isDefined(...values: unknown[]): boolean {
	return values.some((value) => typeof value !== 'undefined' && value !== null && value !== false);
}
