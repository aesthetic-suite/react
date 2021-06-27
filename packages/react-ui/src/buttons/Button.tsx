import React, { useMemo } from 'react';
import { ButtonOptions } from 'reakit';
import { BorderSize, CommonSize, PaletteType, useStyles } from '@aesthetic/react';
import { createComponent } from '../helpers/createComponent';
import { Pressable } from '../internal/Pressable';
import { CommonProps } from '../types';
import { styleSheet } from './styles';
import { ButtonFill, ButtonShape, HtmlAnchorProps, HtmlButtonProps } from './types';

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
	shape?: ButtonShape;
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
	const className = useMemo(
		() => cx({ border, fill, palette, shape, size }, 'element', [inheritedClassName]),
		[cx, border, fill, palette, shape, size, inheritedClassName],
	);

	return (
		<Pressable ref={ref} {...props} className={className}>
			{children}
		</Pressable>
	);
});
