import React, { useMemo } from 'react';
import { useStyles } from '@aesthetic/react';
import { createComponent } from '../helpers/createComponent';
import { useContextRequirement } from '../hooks/useContextRequirement';
import { HtmlAnchorProps, Pressable } from '../internal/Pressable';
import { CommonProps } from '../types';
import { styleSheet } from './styles';
import { TypographyProps } from './types';
import { TypographyContext } from './TypographyContext';

export * from './types';

export interface LinkProps
	extends Pick<TypographyProps, 'children' | 'palette' | 'transform' | 'weight'>,
		Omit<HtmlAnchorProps, 'children' | 'href' | 'onClick'>,
		CommonProps {
	/**
	 * Document or address to link to.
	 */
	to?: string;
	/**
	 * Callback fired when the link is clicked.
	 */
	onClick?: React.MouseEventHandler<HTMLElement>;
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

	useContextRequirement(
		TypographyContext,
		__DEV__ ? '`Link` component must be rendered within a `Text` or `Heading` component.' : '',
	);

	return (
		<Pressable ref={ref} {...props} className={className}>
			{children}
		</Pressable>
	);
});
