import { useEffect, useState } from 'react';
import { BREAKPOINT_SIZES, BreakpointSize, Theme, useTheme } from '@aesthetic/react';

const queries: Record<string, MediaQueryList> = {};

function getNextBreakpoint(breakpoint: BreakpointSize) {
	const index = BREAKPOINT_SIZES.indexOf(breakpoint);

	return BREAKPOINT_SIZES[index + 1] || BREAKPOINT_SIZES[index];
}

function createBreakpointQuery<T extends object>(
	theme: Theme<T>,
	breakpoint: BreakpointSize,
	bound: boolean = false,
) {
	if (queries[breakpoint]) {
		return queries[breakpoint];
	}

	const rootSize = Number.parseFloat(theme.tokens.typography.rootTextSize);
	const nextBreakpoint = getNextBreakpoint(breakpoint);

	const query =
		bound && breakpoint !== nextBreakpoint
			? [
					'screen',
					`(min-width: ${theme.tokens.breakpoint[breakpoint].querySize / rootSize}rem)`,
					`(max-width: ${(theme.tokens.breakpoint[nextBreakpoint].querySize - 1) / rootSize}rem)`,
			  ].join(' and ')
			: theme.tokens.breakpoint[breakpoint].query;

	queries[breakpoint] = matchMedia(query);

	return queries[breakpoint];
}

export function useBreakpointMatch(breakpoint: BreakpointSize, bound: boolean = false): boolean {
	const theme = useTheme();
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const query = createBreakpointQuery(theme, breakpoint, bound);
		const listener = (event: MediaQueryListEvent) => {
			setMatches(event.matches);
		};

		query.addEventListener('change', listener);

		return () => {
			query.removeEventListener('change', listener);
		};
	}, [theme, breakpoint, bound]);

	return matches;
}
