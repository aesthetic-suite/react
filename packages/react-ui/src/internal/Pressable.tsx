import React from 'react';
import { Button as ReakitButton } from 'reakit';
import { createComponent } from '../helpers/createComponent';
import { CommonHtmlProps } from '../types';

export interface PressableProps extends CommonHtmlProps {
	as?: React.ComponentType<PressableProps>;
	children?: React.ReactNode;
	// Anchor
	href?: string;
	rel?: string;
	target?: string;
	to?: string;
	// Button
	type?: string;
}

export const Pressable = createComponent<PressableProps>(function Pressable(
	{ href, rel, target, to, type = 'button', ...restProps },
	ref,
) {
	const link = href ?? to;
	const props = restProps as PressableProps;

	if (link) {
		props.href = link;
		props.rel = rel || target === '_blank' ? 'noopener noreferrer' : undefined;
		props.target = target;
	} else {
		props.type = type;
	}

	// @ts-expect-error We know our ref types are safe
	return <ReakitButton ref={ref} as={link ? 'a' : 'button'} {...props} />;
});
