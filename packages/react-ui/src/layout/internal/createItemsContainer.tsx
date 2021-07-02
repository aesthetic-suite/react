import React, { Children, useMemo } from 'react';
import { BreakpointSize, useStyles } from '@aesthetic/react';
import { createDynamicComponent } from '../../helpers/createComponent';
import { BREAKPOINT_INDEXES, useResponsiveProp } from '../../hooks/responsive/useResponsiveProp';
import { useSpacingUnit } from '../../hooks/useSpacingUnit';
import { CommonProps } from '../../types';
import { Space, SpacingProps } from '../../types/spacing';
import { Box, BoxElement, BoxProps } from '../Box';
import { styleSheet } from '../styles';

export interface ItemsContainerProps
	extends Pick<BoxProps, 'alignContent' | 'alignItems' | 'justifyContent' | 'wrap'>,
		SpacingProps,
		CommonProps {
	/**
	 * Content to render within the list. Each child will be wrapped with an intermediate element.
	 */
	children: NonNullable<React.ReactNode>;
	/**
	 * Apply a gap between each item in the list, based on a defined spacing unit.
	 */
	gap?: Space;
	/**
	 * Display items inline horizontally when viewport is larger than the defined breakpoint.
	 * By default, items will be stacked vertically on smaller viewports.
	 * @default xs
	 */
	inlineAbove?: BreakpointSize;
	/**
	 * Class name to append to each item element wrapper.
	 */
	itemClassName?: string;
	/**
	 * Reverse the direction of each item in the list.
	 * @default false
	 */
	reversed?: boolean;
}

type ItemsDirection = 'column' | 'row';

function getDirectionFromBreakpoint(threshold: number, breakpoint: BreakpointSize): ItemsDirection {
	return BREAKPOINT_INDEXES[breakpoint] > threshold ? 'row' : 'column';
}

export function createItemsContainer<T extends ItemsContainerProps>(component: 'Inline' | 'Stack') {
	const Component = createDynamicComponent<T, BoxElement>(function ItemsContainer(
		{
			as = 'ul',
			children,
			gap,
			inlineAbove = 'xs',
			itemClassName,
			reversed,
			// Inherited
			className: inheritedClassName,
			style: inheritedStyle,
			...props
		},
		ref,
	) {
		const cx = useStyles(styleSheet);
		const gapUnit = useSpacingUnit(gap);
		const className = useMemo(
			() => cx(!!gap && (component === 'Inline' ? 'inlineGap' : 'stackGap'), [inheritedClassName]),
			[cx, gap, inheritedClassName],
		);
		const style = useMemo(
			() => ({
				...inheritedStyle,
				'--gap': gapUnit,
			}),
			[gapUnit, inheritedStyle],
		);

		// Responsive
		const inlineAboveIndex = BREAKPOINT_INDEXES[inlineAbove];
		const direction = useResponsiveProp<ItemsDirection>(
			component === 'Stack'
				? { default: 'column' }
				: {
						default: 'column',
						xs: getDirectionFromBreakpoint(inlineAboveIndex, 'xs'),
						sm: getDirectionFromBreakpoint(inlineAboveIndex, 'sm'),
						md: getDirectionFromBreakpoint(inlineAboveIndex, 'md'),
						lg: getDirectionFromBreakpoint(inlineAboveIndex, 'lg'),
						xl: getDirectionFromBreakpoint(inlineAboveIndex, 'xl'),
				  },
		)!;

		// Items
		const Child = as === 'ul' || as === 'ol' ? 'li' : 'div';

		return (
			<Box
				ref={ref}
				alignItems={direction === 'column' ? 'stretch' : 'center'}
				{...props}
				as={as}
				className={className}
				direction={reversed ? `${direction}-reverse` : direction}
				style={style}
			>
				{Children.map(children, (child) => (
					<Child className={itemClassName}>{child}</Child>
				))}
			</Box>
		);
	});

	Component.displayName = component;

	return Component;
}
