import React from 'react';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ComponentSheet, Engine } from '@aesthetic/core';
import {
	InternalWithStylesWrappedProps,
	InternalWithThemeWrappedProps,
} from '@aesthetic/core-react';

export interface NativeStyles extends ViewStyle, TextStyle, Omit<ImageStyle, 'overflow'> {}

export type NativeRule = NativeStyles & {
	'@variants'?: Record<string, NativeStyles>;
};

export type NativeEngine = Engine<NativeRule, NativeStyles>;

export interface StyledComponent<P extends object = {}>
	extends React.ForwardRefExoticComponent<P & StyledInheritedProps> {
	styleSheet: ComponentSheet<unknown, NativeRule, NativeStyles>;
}

export interface StyledInheritedProps {
	children?: React.ReactNode;
	style?: StyleProp<NativeStyles>;
}

export type InferProps<T extends React.ComponentType<unknown>> = T extends React.ComponentType<
	infer P
>
	? P
	: never;

export type WithStylesWrappedProps<T> = InternalWithStylesWrappedProps<
	T,
	NativeStyles,
	NativeStyles[]
>;

export type WithThemeWrappedProps = InternalWithThemeWrappedProps<NativeRule>;
