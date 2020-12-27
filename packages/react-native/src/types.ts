import React from 'react';
import { Engine, LocalSheet } from '@aesthetic/core';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface NativeStyles extends ViewStyle, TextStyle, Omit<ImageStyle, 'overflow'> {}

export type NativeBlock = NativeStyles & {
  '@variants'?: Record<string, Record<string, NativeStyles>>;
};

export type NativeEngine = Engine<NativeStyles>;

export interface StyledComponent<P extends object = {}>
  extends React.MemoExoticComponent<React.ForwardRefExoticComponent<P & StyledInheritedProps>> {
  styleSheet: LocalSheet<unknown, NativeBlock, NativeStyles>;
}

export interface StyledInheritedProps {
  style?: NativeStyles;
}

export type InferProps<T extends React.ComponentType<unknown>> = T extends React.ComponentType<
  infer P
>
  ? P
  : never;
