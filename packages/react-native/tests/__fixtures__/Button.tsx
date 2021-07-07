import React from 'react';
import { View } from 'react-native';
import { ComponentSheet } from '@aesthetic/core';
import { DirectionProvider, NativeRule, NativeStyles, ThemeProvider } from '../../src';
import { aesthetic } from '../../src/aesthetic';

export function createStyleSheet() {
	return aesthetic.createStyleSheet((css) => ({
		button: {
			appearance: 'none',
			border: 0,
			cursor: 'pointer',
			margin: 0,
			padding: 0,
			textDecoration: 'none',
			userSelect: 'auto',
			verticalAlign: 'middle',
			position: 'relative',
			display: 'flex',
			textAlign: 'center',
			width: 'auto',
			backgroundColor: css.tokens.palette.brand.color['40'],
			color: css.tokens.palette.neutral.color['00'],

			':hover': {
				backgroundColor: css.tokens.palette.brand.color['50'],
			},

			':active': {
				backgroundColor: css.tokens.palette.brand.color['60'],
			},

			'@variants': {
				'size:sm': {
					minWidth: css.unit(6),
					padding: `${css.tokens.spacing.sm} ${css.tokens.spacing.df}`,
				},
				'size:df': {
					minWidth: css.unit(8),
					padding: `${css.tokens.spacing.df} ${css.tokens.spacing.lg}`,
				},
				'size:lg': {
					minWidth: css.unit(10),
					padding: `${css.tokens.spacing.lg} ${css.tokens.spacing.xl}`,
				},

				'size:lg + compound:test': {
					transform: [{ scale: 2 }],
				},
			},
		},

		button_block: {
			overflowWrap: 'normal',
			wordWrap: 'normal',
			wordBreak: 'normal',
			width: '100%',
			whiteSpace: 'normal',
			overflow: 'hidden',
		},

		button_disabled: {
			'@variants': {
				'size:sm': {
					opacity: 0.4,
				},
				'size:df': {
					opacity: 0.5,
				},
				'size:lg': {
					opacity: 0.6,
				},

				'size:lg + compound:test': {
					transform: [{ scale: 0 }],
				},
			},
		},
	}));
}

export interface ButtonProps {
	children: NonNullable<React.ReactNode>;
	block?: boolean;
	disabled?: boolean;
	href?: string;
	large?: boolean;
	small?: boolean;
	sheet?: ComponentSheet<unknown, NativeRule, NativeStyles>;
	// Compound variant tests
	compound?: string;
}

export interface WrapperProps {
	children?: React.ReactNode;
	direction?: 'ltr' | 'rtl';
	theme?: string;
}

export function Wrapper({ children, direction = 'ltr', theme = 'twilight' }: WrapperProps) {
	return (
		<DirectionProvider direction={direction}>
			<ThemeProvider name={theme}>{children ?? <View />}</ThemeProvider>
		</DirectionProvider>
	);
}
