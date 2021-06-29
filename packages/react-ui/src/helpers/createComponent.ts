/* eslint-disable @typescript-eslint/no-explicit-any */

import { forwardRef } from 'react';
import { CommonHtmlProps, HtmlElementType, OmitUnwantedHtmlProps } from '../types';

export function createComponent<Props extends object, Element extends HTMLElement = HTMLElement>(
	component: React.ForwardRefRenderFunction<Element, Props>,
) {
	return forwardRef(component);
}

export type DynamicProps<
	As extends React.ElementType,
	Props extends object
> = OmitUnwantedHtmlProps<React.ComponentPropsWithRef<As>> &
	Props & {
		/**
		 * Native HTML element or custom component to render as.
		 */
		as?: As;
	};

// This is based on the `React.ExoticComponent` but supports the dynamic `as` prop
// through a generic on the render function. We want the props on the consumer to change
// based on the `as` prop, but we *do not* want to type the props/ref in the implementation,
// as it makes the types too complex and we spread them into the DOM regardless.
export interface DynamicComponent<Props extends object, As extends React.ElementType> {
	<T extends As>(props: DynamicProps<T, Props>): React.ReactElement | null;
	readonly $$typeof: symbol;
	displayName?: string;
}

// We only want to return generic attributes when an HTML element,
// otherwise return the props from the custom component.
export type InferAsProps<T> = T extends HtmlElementType
	? CommonHtmlProps
	: T extends React.JSXElementConstructor<infer P>
	? P
	: {};

export function createDynamicComponent<
	Props extends object,
	As extends React.ElementType = HtmlElementType
>(component: React.ForwardRefRenderFunction<any, InferAsProps<As> & Props & { as?: As }>) {
	return (createComponent(component) as unknown) as DynamicComponent<Props, As>;
}
