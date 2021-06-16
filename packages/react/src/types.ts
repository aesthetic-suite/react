import { ClassName, ComponentSheet, Rule } from '@aesthetic/core';
import {
	InternalWithStylesWrappedProps,
	InternalWithThemeWrappedProps,
} from '@aesthetic/core-react';

export type ElementType = keyof JSX.IntrinsicElements;

export interface StyledComponent<P extends object = {}>
	extends React.MemoExoticComponent<React.ForwardRefExoticComponent<P & StyledInheritedProps>> {
	styleSheet: ComponentSheet<unknown, ClassName, Rule>;
}

export interface StyledInheritedProps {
	className?: string;
}

export type InferProps<T extends ElementType | React.ComponentType<unknown>> = T extends ElementType
	? JSX.IntrinsicElements[T]
	: T extends React.ComponentType<infer P>
	? P
	: never;

export type WithStylesWrappedProps<T> = InternalWithStylesWrappedProps<T, ClassName>;

export type WithThemeWrappedProps = InternalWithThemeWrappedProps<Rule>;
