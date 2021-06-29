import { ShadowSize } from '@aesthetic/react';
import { SpacingProps } from '../../types/spacing';

export type BoxAlignContent =
	| 'baseline'
	| 'center'
	| 'end'
	| 'flex-end'
	| 'flex-start'
	| 'normal'
	| 'safe'
	| 'space-around'
	| 'space-between'
	| 'space-evenly'
	| 'start'
	| 'stretch'
	| 'unsafe';

export type BoxAlignItems =
	| 'baseline'
	| 'center'
	| 'end'
	| 'flex-end'
	| 'flex-start'
	| 'normal'
	| 'safe'
	| 'self-end'
	| 'self-start'
	| 'start'
	| 'stretch'
	| 'unsafe';

export type BoxAlignSelf =
	| 'auto'
	| 'baseline'
	| 'center'
	| 'flex-end'
	| 'flex-start'
	| 'normal'
	| 'safe'
	| 'self-end'
	| 'self-start'
	| 'stretch'
	| 'unsafe';

export type BoxDirection = 'column-reverse' | 'column' | 'row-reverse' | 'row';

export type BoxJustifyContent =
	| 'baseline'
	| 'center'
	| 'end'
	| 'flex-end'
	| 'flex-start'
	| 'left'
	| 'normal'
	| 'right'
	| 'safe'
	| 'space-around'
	| 'space-between'
	| 'space-evenly'
	| 'start'
	| 'unsafe';

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
