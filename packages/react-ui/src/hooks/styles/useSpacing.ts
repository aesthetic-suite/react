import { useMemo } from 'react';
import { useStyles, useTheme } from '@aesthetic/react';
import { mapObject } from '../../helpers/mapObject';
import { spacingStyleSheet } from '../../sheets/spacing';
import { UtilityStyles } from '../../types';
import { SpacingProps } from '../../types/spacing';

export function useSpacing({
	spacing,
	spacingBottom,
	spacingEnd,
	spacingHorizontal,
	spacingStart,
	spacingTop,
	spacingVertical,
}: SpacingProps): UtilityStyles {
	const cx = useStyles(spacingStyleSheet);
	const theme = useTheme();
	const map = useMemo(
		() => ({
			all: spacing,
			bottom: spacingBottom,
			end: spacingEnd,
			horizontal: spacingHorizontal,
			start: spacingStart,
			top: spacingTop,
			vertical: spacingVertical,
		}),
		[
			spacing,
			spacingBottom,
			spacingEnd,
			spacingHorizontal,
			spacingStart,
			spacingTop,
			spacingVertical,
		],
	);

	const className = useMemo(
		() =>
			cx(
				mapObject(map, (value) => (typeof value === 'number' ? 'inline' : value)),
				'spacing',
			),
		[cx, map],
	);

	const inlineStyle = useMemo(
		() =>
			mapObject(
				map,
				(value) => (typeof value === 'number' ? theme.unit(value) : undefined),
				(key) => `--spacing-${key}`,
			),
		[theme, map],
	);

	return {
		className,
		style: inlineStyle,
	};
}
