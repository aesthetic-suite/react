import React, { useMemo } from 'react';
import { ShadowSize, useStyles } from '@aesthetic/react';
import { createDynamicComponent } from '../helpers/createComponent';
import { isDefined } from '../helpers/isDefined';
import { useSpacing } from '../hooks/styles/useSpacing';
import { shadowStyleSheet } from '../sheets/shadows';
import { CommonProps } from '../types';
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

export interface BoxProps extends SpacingProps, CommonProps {
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
		testID,
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
	const cx = useStyles(styleSheet, shadowStyleSheet);
	const { className: spacingClassName, style: spacingStyle } = useSpacing({
		spacing,
		spacingBottom,
		spacingEnd,
		spacingHorizontal,
		spacingStart,
		spacingTop,
		spacingVertical,
	});
	const className = useMemo(
		() =>
			cx(
				{
					alignContent,
					alignItems,
					alignSelf,
					direction,
					justifyContent,
					shadow,
					wrap: String(wrap),
				},
				'box',
				inline && 'boxInline',
				isDefined(grow, order, shrink) && 'boxVars',
				shadow && 'shadows',
				[inheritedClassName, spacingClassName],
			),
		[
			cx,
			alignContent,
			alignItems,
			alignSelf,
			direction,
			grow,
			inline,
			justifyContent,
			order,
			shadow,
			shrink,
			wrap,
			spacingClassName,
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
		<Tag ref={ref} data-testid={testID} {...props} className={className} style={style}>
			{children}
		</Tag>
	);
});
