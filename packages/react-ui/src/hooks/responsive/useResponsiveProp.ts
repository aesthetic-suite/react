import { BreakpointSize } from '@aesthetic/react';
import { useBreakpointsMatches } from './useBreakpointsMatches';

export const BREAKPOINT_INDEXES: Record<BreakpointSize, number> = {
	xs: 0,
	sm: 1,
	md: 2,
	lg: 3,
	xl: 4,
};

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
