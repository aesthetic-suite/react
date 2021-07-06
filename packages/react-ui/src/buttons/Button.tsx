import React, { useMemo } from 'react';
import { ButtonOptions } from 'reakit';
import { BorderSize, CommonSize, PaletteType, useStyles } from '@aesthetic/react';
import { createComponent } from '../helpers/createComponent';
import { useInteractableSize } from '../hooks/styles/useInteractableSize';
import { useShapedBorder } from '../hooks/styles/useShapedBorder';
import { HtmlAnchorProps, HtmlButtonProps, Pressable } from '../internal/Pressable';
import { CommonProps } from '../types';
import { Shape } from '../types/shape';
import { styleSheet } from './styles';
import { ButtonFill } from './types';

export * from './types';

export interface ButtonCommonProps extends ButtonOptions, CommonProps {
	/**
	 * Increase or decrease the border width.
	 * @default df
	 */
	border?: BorderSize;
	/**
	 * Content to render within the button.
	 */
	children: NonNullable<React.ReactNode>;
	/**
	 * Customize how background and border styles are applied.
	 * @default solid
	 */
	fill?: ButtonFill;
	/**
	 * Customize the text, background, and border colors.
	 * @default primary
	 */
	palette?: PaletteType;
	/**
	 * Customize the shape of the button (primarily border corner radius).
	 * @default round
	 */
	shape?: Shape;
	/**
	 * Increase or decrease the font size and spacing.
	 * @default df
	 */
	size?: CommonSize;
}

export interface ButtonAsAnchorProps
	extends ButtonCommonProps,
		Omit<HtmlAnchorProps, 'children' | 'href'> {
	to: string;
}

export interface ButtonAsButtonProps
	extends ButtonCommonProps,
		Omit<HtmlButtonProps, 'children' | 'onClick'> {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type ButtonProps = ButtonAsAnchorProps | ButtonAsButtonProps;

export const Button = createComponent<ButtonProps>(function Button(
	{
		border = 'df',
		children,
		fill = 'solid',
		palette = 'primary',
		shape = 'round',
		size = 'df',
		// Inherited
		className: inheritedClassName,
		...props
	},
	ref,
) {
	const cx = useStyles(styleSheet);
	const borderClassName = useShapedBorder(border, shape);
	const sizeClassName = useInteractableSize(size);
	const className = useMemo(
		() =>
			cx({ border, fill, palette, shape }, 'element', [
				borderClassName,
				sizeClassName,
				inheritedClassName,
			]),
		[cx, border, fill, palette, shape, borderClassName, sizeClassName, inheritedClassName],
	);

	return (
		<Pressable ref={ref} {...props} className={className}>
			{children}
		</Pressable>
	);
});
