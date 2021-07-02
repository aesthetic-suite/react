import { BreakpointSize } from '@aesthetic/react';
import { useBreakpointsMatches } from './useBreakpointsMatches';

export function useResponsiveProp<T>(
	prop: Partial<Record<BreakpointSize | 'default', T>>,
	bound: boolean = false,
): T | undefined {
	const matches = useBreakpointsMatches(bound);
	let current: T | undefined;

	Object.entries(matches).some(([bp, match]) => {
		if (!match) {
			return true;
		}

		current = prop[bp as BreakpointSize];

		return false;
	});

	return current ?? prop.default;
}
