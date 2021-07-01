import React, { Children, useMemo } from 'react';
import { useStyles } from '@aesthetic/react';
import { createDynamicComponent } from '../../helpers/createComponent';
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
	 * Class name to append to each item element wrapper.
	 */
	itemClassName?: string;
	/**
	 * Reverse the direction of each item in the list.
	 * @default false
	 */
	reversed?: boolean;
}

export function createItemsContainer<T extends ItemsContainerProps>(
	component: 'Inline' | 'Stack',
	direction: 'column' | 'row',
) {
	const Component = createDynamicComponent<T, BoxElement>(function ItemsContainer(
		{
			as = 'ul',
			children,
			gap,
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
