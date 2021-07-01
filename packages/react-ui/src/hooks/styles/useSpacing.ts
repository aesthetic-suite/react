import { useMemo } from 'react';
import { SPACING_SIZES, SpacingSize, style, useStyles, useTheme } from '@aesthetic/react';
import { mapObject } from '../../helpers/mapObject';
import { mapVariants } from '../../helpers/mapVariants';
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
	const cx = useStyles(styleSheet);
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
				'element',
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

export const styleSheet = style((css) => {
	type InlineSpacingSize = SpacingSize | 'inline';

	const sizes: InlineSpacingSize[] = ['inline', ...SPACING_SIZES];

	function value(size: InlineSpacingSize, type: string) {
		return size === 'inline' ? `var(--spacing-${type})` : css.var(`spacing-${size}`);
	}

	return {
		// Ordered from lowest to highest specificity
		'@variants': {
			...mapVariants('all', sizes, (size, type) => ({
				padding: value(size, type),
			})),

			...mapVariants('horizontal', sizes, (size, type) => ({
				paddingLeft: value(size, type),
				paddingRight: value(size, type),
			})),

			...mapVariants('vertical', sizes, (size, type) => ({
				paddingTop: value(size, type),
				paddingBottom: value(size, type),
			})),

			...mapVariants('top', sizes, (size, type) => ({
				paddingTop: value(size, type),
			})),

			...mapVariants('bottom', sizes, (size, type) => ({
				paddingBottom: value(size, type),
			})),

			...mapVariants('start', sizes, (size, type) => ({
				paddingLeft: value(size, type),
			})),

			...mapVariants('end', sizes, (size, type) => ({
				paddingRight: value(size, type),
			})),
		},
	};
});
