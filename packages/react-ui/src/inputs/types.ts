import { InputOptions } from 'reakit';
import { BorderSize, CommonSize, PaletteType } from '@aesthetic/react';
import { CommonProps } from '../types';
import { Shape } from '../types/shape';

export interface InputCommonProps extends InputOptions, CommonProps {
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
