import React, { useMemo } from 'react';
import { Input as ReakitInput, InputOptions } from 'reakit';
import { BorderSize, CommonSize, PaletteType, useStyles } from '@aesthetic/react';
import { createComponent } from '../helpers/createComponent';
import { shapedBorderStyleSheet } from '../sheets/borders';
import { sizingStyleSheet } from '../sheets/sizing';
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
		palette,
		shape = 'round',
		size = 'df',
		// Inherited
		className: inheritedClassName,
		...props
	},
	ref,
) {
	const cx = useStyles(styleSheet, shapedBorderStyleSheet, sizingStyleSheet);
	const className = useMemo(
		() =>
			cx({ border, palette, shape, size }, 'element', 'borders', 'sizing', [inheritedClassName]),
		[cx, border, palette, shape, size, inheritedClassName],
	);

	return (
		<ReakitInput ref={ref} type="text" {...props} className={className}>
			{children}
		</ReakitInput>
	);
});
