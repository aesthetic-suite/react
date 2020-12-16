import React from 'react';
import { LocalSheet } from '@aesthetic/core';

export type ElementType = keyof JSX.IntrinsicElements;

export interface StyledComponent<P extends object = {}>
  extends React.MemoExoticComponent<React.ForwardRefExoticComponent<P & StyledInheritedProps>> {
  styleSheet: LocalSheet;
}

export interface StyledInheritedProps {
  className?: string;
}

export type InferProps<T extends ElementType | React.ComponentType> = T extends ElementType
  ? JSX.IntrinsicElements[T]
  : T extends React.ComponentType<infer P>
  ? P
  : never;
