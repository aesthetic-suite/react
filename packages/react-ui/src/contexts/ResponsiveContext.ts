import { createContext } from 'react';
import { BreakpointSize } from '@aesthetic/react';

export interface ResponsiveContextType {
	breakpointsAbove: BreakpointSize[];
	breakpointsBelow: BreakpointSize[];
	activeBreakpoint: BreakpointSize;
}

export const ResponsiveContext = createContext<ResponsiveContextType>({
	breakpointsAbove: [],
	breakpointsBelow: [],
	activeBreakpoint: 'xs',
});
