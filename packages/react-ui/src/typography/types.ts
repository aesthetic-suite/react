import { PaletteType } from '@aesthetic/react';

export type TypographyAlign = 'center' | 'end' | 'justify' | 'start';

export type TypographyOverflow = 'break' | 'clip' | 'truncate' | 'wrap';

export type TypographyTransform = 'capitalize' | 'lowercase' | 'uppercase';

export type TypographyWeight = 'black' | 'bold' | 'inherit' | 'light' | 'normal' | 'thin';

export interface TypographyProps {
	/**
	 * Align the text on the horizontal axis.
	 * @default start
	 */
	align?: TypographyAlign;
	/**
	 * String of text to display.
	 */
	children: NonNullable<React.ReactNode>;
	/**
	 * Customize how the text will overflow its current container.
	 * @default wrap
	 */
	overflow?: TypographyOverflow;
	/**
	 * Customize the text color based on the current design system theme.
	 * @default neutral
	 */
	palette?: PaletteType;
	/**
	 * Apply a transformation to the entire string of text.
	 */
	transform?: TypographyTransform;
	/**
	 * Apply a light or bold weight to the entire string of text.
	 * @default normal
	 */
	weight?: TypographyWeight;
}
