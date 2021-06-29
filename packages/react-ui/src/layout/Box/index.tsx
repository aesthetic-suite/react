import React, { useMemo } from 'react';
import { useStyles } from '@aesthetic/react';
import { createDynamicComponent } from '../../helpers/createComponent';
import { useShadow } from '../../hooks/styles/useShadow';
import { useSpacing } from '../../hooks/styles/useSpacing';
import { styleSheet } from './styles';
import { BoxProps } from './types';

export * from './types';

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#sectioning_content
 */
export const Box = createDynamicComponent<BoxProps>(function Box(
	{
		alignContent = 'normal',
		alignItems = 'normal',
		alignSelf = 'auto',
		as: Tag = 'div',
		children,
		direction = 'row',
		grow,
		inline = false,
		justifyContent = 'flex-start',
		order,
		shadow,
		shrink,
		wrap = false,
		// Spacing
		spacing,
		spacingBottom,
		spacingEnd,
		spacingHorizontal,
		spacingStart,
		spacingTop,
		spacingVertical,
		// Inherited
		className: inheritedClassName,
		style: inheritedStyle,
		...props
	},
	ref,
) {
	const cx = useStyles(styleSheet);
	const { className: spacingClassName, style: spacingStyle } = useSpacing({
		spacing,
		spacingBottom,
		spacingEnd,
		spacingHorizontal,
		spacingStart,
		spacingTop,
		spacingVertical,
	});
	const shadowClassName = useShadow(shadow);
	const className = useMemo(
		() =>
			cx(
				{ alignContent, alignItems, alignSelf, direction, justifyContent, wrap: String(wrap) },
				'box',
				'vars',
				inline && 'inline',
				[spacingClassName, shadowClassName, inheritedClassName],
			),
		[
			cx,
			alignContent,
			alignItems,
			alignSelf,
			direction,
			inline,
			justifyContent,
			wrap,
			spacingClassName,
			shadowClassName,
			inheritedClassName,
		],
	);
	const style: React.CSSProperties = useMemo(
		() => ({
			...spacingStyle,
			'--box-grow': grow,
			'--box-order': order,
			'--box-shrink': shrink,
			...inheritedStyle,
		}),
		[grow, order, shrink, spacingStyle, inheritedStyle],
	);

	return (
		<Tag ref={ref} {...props} className={className} style={style}>
			{children}
		</Tag>
	);
});
