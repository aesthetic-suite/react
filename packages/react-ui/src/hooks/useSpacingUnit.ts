import { useMemo } from 'react';
import { UnitValue, useTheme } from '@aesthetic/react';
import { Space } from '../types/spacing';

export function useSpacingUnit(space?: Space): UnitValue | undefined {
	const theme = useTheme();

	return useMemo(() => {
		if (space === undefined) {
			return undefined;
		}

		return typeof space === 'number' ? theme.unit(space) : theme.tokens.spacing[space];
	}, [theme, space]);
}
