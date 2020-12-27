import { Engine } from '@aesthetic/core';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface NativeStyles extends ViewStyle, TextStyle, Omit<ImageStyle, 'overflow'> {}

export type NativeEngine = Engine<NativeStyles>;

// import React from 'react';
// import { ClassName, LocalSheet, ElementStyles } from '@aesthetic/core';

// export type ElementType = keyof JSX.IntrinsicElements;

// export interface StyledComponent<P extends object = {}>
//   extends React.MemoExoticComponent<React.ForwardRefExoticComponent<P & StyledInheritedProps>> {
//   styleSheet: LocalSheet<unknown, ElementStyles, ClassName>;
// }

// export interface StyledInheritedProps {
//   className?: string;
// }

// export type InferProps<T extends ElementType | React.ComponentType<unknown>> = T extends ElementType
//   ? JSX.IntrinsicElements[T]
//   : T extends React.ComponentType<infer P>
//   ? P
//   : never;
