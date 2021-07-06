import React, { useMemo } from 'react';
import { Input as ReakitInput, InputOptions } from 'reakit';
import { BorderSize, CommonSize, PaletteType, useStyles } from '@aesthetic/react';
import { createComponent } from '../helpers/createComponent';
import { OmitUnwantedHtmlProps } from '../types';
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
	palette?: Extract<PaletteType, 'negative' | 'neutral' | 'positive' | 'primary' | 'warning'>;
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
		size = 'df',
		// Inherited
		className: inheritedClassName,
		...props
	},
	ref,
) {
	const cx = useStyles(styleSheet);
	const className = useMemo(() => cx({ border, palette, size }, 'element', [inheritedClassName]), [
		cx,
		border,
		palette,
		size,
		inheritedClassName,
	]);

	return (
		<ReakitInput ref={ref} type="text" {...props} className={className}>
			{children}
		</ReakitInput>
	);
});
