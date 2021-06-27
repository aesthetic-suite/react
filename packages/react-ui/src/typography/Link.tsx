import React, { useMemo } from 'react';
import { useStyles } from '@aesthetic/react';
import { createComponent } from '../helpers/createComponent';
import { HtmlAnchorProps, Pressable } from '../internal/Pressable';
import { CommonProps } from '../types';
import { styleSheet } from './styles';
import { TypographyProps } from './types';

export * from './types';

export interface LinkProps
	extends Pick<TypographyProps, 'children' | 'palette' | 'transform' | 'weight'>,
		Omit<HtmlAnchorProps, 'children' | 'href' | 'onClick'>,
		CommonProps {
	/**
	 * Document to link to.
	 */
	to?: string;
	/**
	 * Callback fired when the link is clicked.
	 */
	onClick?: React.MouseEventHandler;
}

export const Link = createComponent<LinkProps>(function Link(
	{
		children,
		palette = 'primary',
		transform,
		weight = 'normal',
		// Inherited
		className: inheritedClassName,
		...props
	},
	ref,
) {
	const cx = useStyles(styleSheet);
	const className = useMemo(
		() => cx({ palette, transform, weight }, 'typography', 'link', [inheritedClassName]),
		[cx, palette, transform, weight, inheritedClassName],
	);

	return (
		<Pressable ref={ref} {...props} className={className}>
			{children}
		</Pressable>
	);
});
