import React from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Engine, LocalSheet } from '@aesthetic/core';

export interface NativeStyles extends ViewStyle, TextStyle, Omit<ImageStyle, 'overflow'> {}

export type NativeBlock = NativeStyles & {
  '@variants'?: Record<string, NativeStyles>;
};

export type NativeEngine = Engine<NativeStyles>;

export interface StyledComponent<P extends object = {}>
  extends React.MemoExoticComponent<React.ForwardRefExoticComponent<P & StyledInheritedProps>> {
  styleSheet: LocalSheet<unknown, NativeBlock, NativeStyles>;
}

export interface StyledInheritedProps {
  children?: React.ReactNode;
  style?: NativeStyles;
}

export type InferProps<T extends React.ComponentType<unknown>> = T extends React.ComponentType<
  infer P
>
  ? P
  : never;
