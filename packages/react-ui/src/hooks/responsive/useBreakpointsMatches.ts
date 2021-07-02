import { BREAKPOINT_SIZES, BreakpointSize } from '@aesthetic/react';
import { useBreakpointMatch } from './useBreakpointMatch';

export type BreakpointMatchMap = Record<BreakpointSize, boolean>;

export function useBreakpointsMatches(bound: boolean = false): BreakpointMatchMap {
	const map = BREAKPOINT_SIZES.reduce<Partial<BreakpointMatchMap>>((acc, size) => {
		// This renders deterministically so is fine...
		// eslint-disable-next-line react-hooks/rules-of-hooks
		acc[size] = useBreakpointMatch(size, bound);
		return acc;
	}, {});

	return map as BreakpointMatchMap;
}
