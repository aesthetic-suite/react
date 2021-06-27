import React, { useMemo } from 'react';
import { useStyles } from '@aesthetic/react';
import { createComponent } from '../helpers/createComponent';
import { HtmlAnchorProps, Pressable } from '../internal/Pressable';
import { styleSheet } from './styles';
import { TypographyProps } from './types';

export * from './types';

export interface LinkProps
	extends Pick<TypographyProps, 'children' | 'palette' | 'transform' | 'weight'>,
		Omit<HtmlAnchorProps, 'children' | 'href' | 'onClick'> {
	to?: string;
	onClick?: React.MouseEventHandler;
}

export const Link = createComponent<LinkProps>(function Link(
	{
		children,
		palette,
		transform,
		weight,
		// Inherited
		className: inheritedClassName,
		...props
	},
	ref,
) {
	const cx = useStyles(styleSheet);
	const className = useMemo(() => cx({ transform, weight }, 'typography', [inheritedClassName]), [
		cx,
		transform,
		weight,
		inheritedClassName,
	]);

	return (
		<Pressable ref={ref} {...props} className={className}>
			{children}
		</Pressable>
	);
});
