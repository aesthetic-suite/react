import { SPACING_SIZES, SpacingSize, style } from '@aesthetic/react';
import { mapVariants } from '../helpers/mapVariants';

export const spacingStyleSheet = style((css) => {
	type InlineSpacingSize = SpacingSize | 'inline';

	const sizes: InlineSpacingSize[] = ['inline', ...SPACING_SIZES];

	function value(size: InlineSpacingSize, type: string) {
		return size === 'inline' ? `var(--spacing-${type})` : css.var(`spacing-${size}`);
	}

	return {
		// Do this first for lowest specificity
		padding: 0,

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
}, 'spacing');
