import React, { useMemo } from 'react';
import { ShadowSize, useStyles } from '@aesthetic/react';
import { createDynamicComponent } from '../helpers/createComponent';
import { useShadow } from '../hooks/styles/useShadow';
import { useSpacing } from '../hooks/styles/useSpacing';
import { SpacingProps } from '../types/spacing';
import { styleSheet } from './styles';
import {
	BoxAlignContent,
	BoxAlignItems,
	BoxAlignSelf,
	BoxDirection,
	BoxElement,
	BoxJustifyContent,
} from './types';

export * from './types';

export interface BoxProps extends SpacingProps {
	/**
	 * Content to render within the box. Each child will be treated as a flex item.
	 */
	children?: React.ReactNode;
	/**
	 * Define how the browser distributes space between and around content along the cross-axis.
	 * @default normal
	 */
	alignContent?: BoxAlignContent;
	/**
	 * Define how direct children are individually aligned on the cross-axis.
	 * @default normal
	 */
	alignItems?: BoxAlignItems;
	/**
	 * Override this element's cross-axis alignment in its parent flex container.
	 * @default auto
	 */
	alignSelf?: BoxAlignSelf;
	/**
	 * Control the direction of content on the main-axis.
	 * @default row
	 */
	direction?: BoxDirection;
	/**
	 * Set this element's flex grow factor.
	 */
	grow?: number;
	/**
	 * Render box as inline-flex instead of flex.
	 */
	inline?: boolean;
	/**
	 * Define how the browser distributes space between and around content along the main-axis.
	 * @default flex-start
	 */
	justifyContent?: BoxJustifyContent;
	/**
	 * Set the order in which this element appears in its parent flex container.
	 */
	order?: number;
	/**
	 * Apply a shadow with the defined size.
	 */
	shadow?: ShadowSize;
	/**
	 * Set this element's flex shrink factor.
	 */
	shrink?: number;
	/**
	 * Control whether content wraps to another line.
	 * @default false
	 */
	wrap?: boolean | 'reverse';
}

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#sectioning_content
 */
export const Box = createDynamicComponent<BoxProps, BoxElement>(function Box(
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
				'boxVars',
				inline && 'boxInline',
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
