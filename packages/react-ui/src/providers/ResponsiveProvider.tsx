import React, { useEffect, useMemo, useState } from 'react';
import { BreakpointSize } from '@aesthetic/react';
import { ResponsiveContext } from '../contexts/ResponsiveContext';
import { useBreakpointsMatches } from '../hooks/responsive/useBreakpointsMatches';
import { Static } from '../layout/Static';

export interface ResponsiveProviderProps {
	children: NonNullable<React.ReactNode>;
}

export function ResponsiveProvider({ children }: ResponsiveProviderProps) {
	const [breakpointsAbove, setBreakpointsAbove] = useState<BreakpointSize[]>([
		'sm',
		'md',
		'lg',
		'xl',
	]);
	const [breakpointsBelow, setBreakpointsBelow] = useState<BreakpointSize[]>([]);
	const [activeBreakpoint, setActiveBreakpoint] = useState<BreakpointSize>('xs');

	// Update state when matches change
	const matches = useBreakpointsMatches();

	useEffect(() => {
		const above: BreakpointSize[] = [];
		const below: BreakpointSize[] = [];
		let matched: BreakpointSize = 'xs';

		Object.entries(matches).forEach(([bp, match]) => {
			const breakpoint = bp as BreakpointSize;

			if (match) {
				matched = breakpoint;
			} else if (matched) {
				above.push(breakpoint);
			} else {
				below.push(breakpoint);
			}
		});

		setBreakpointsAbove(above);
		setBreakpointsBelow(below);
		setActiveBreakpoint(matched);
	}, [matches]);

	// Cache the value to avoid re-renders
	const value = useMemo(
		() => ({
			breakpointsAbove,
			breakpointsBelow,
			activeBreakpoint,
		}),
		[activeBreakpoint, breakpointsAbove, breakpointsBelow],
	);

	return (
		<ResponsiveContext.Provider value={value}>
			<Static>{children}</Static>
		</ResponsiveContext.Provider>
	);
}
