import React, { useMemo } from 'react';
import { Input as ReakitInput, InputOptions } from 'reakit';
import { BorderSize, CommonSize, PaletteType, useStyles } from '@aesthetic/react';
import { createComponent } from '../helpers/createComponent';
import { useInteractableSize } from '../hooks/styles/useInteractableSize';
import { useShapedBorder } from '../hooks/styles/useShapedBorder';
import { OmitUnwantedHtmlProps } from '../types';
import { Shape } from '../types/shape';
import { styleSheet } from './styles';

export interface InputProps
	extends InputOptions,
		OmitUnwantedHtmlProps<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	/**
	 * Increase or decrease the border width.
	 * @default df
	 */
	border?: BorderSize;
	/**
	 * Customize the text, background, and border colors.
	 * @default neutral
	 */
	palette?: Extract<PaletteType, 'negative' | 'positive' | 'primary' | 'warning'>;
	/**
	 * Customize the shape of the input (primarily border corner radius).
	 * @default round
	 */
	shape?: Shape;
	/**
	 * Increase or decrease the font size and spacing.
	 * @default df
	 */
	size?: CommonSize;
}

export const Input = createComponent<InputProps, HTMLInputElement>(function Input(
	{
		border = 'df',
		children,
		palette = 'neutral',
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
		() => cx({ border, palette }, 'element', [borderClassName, sizeClassName, inheritedClassName]),
		[cx, border, palette, borderClassName, sizeClassName, inheritedClassName],
	);

	return (
		<ReakitInput ref={ref} type="text" {...props} className={className}>
			{children}
		</ReakitInput>
	);
});
