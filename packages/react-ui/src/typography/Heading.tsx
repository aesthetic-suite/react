import React, { useMemo } from 'react';
import { HeadingLevel, useStyles } from '@aesthetic/react';
import { createDynamicComponent } from '../helpers/createComponent';
import { useHeading } from '../hooks/styles/useHeading';
import { CommonProps } from '../types';
import { styleSheet } from './styles';
import { TypographyProps } from './types';
import { TypographyContext } from './TypographyContext';

export * from './types';

export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends TypographyProps, CommonProps {
	/**
	 * Increase or decrease the font size, line height, and letter spacing.
	 */
	level: HeadingLevel;
}

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#heading_content
 */
export const Heading = createDynamicComponent<HeadingProps, HeadingElement>(function Heading(
	{
		align = 'start',
		as,
		children,
		overflow = 'wrap',
		palette = 'neutral',
		level = 1,
		testID,
		transform,
		weight = 'normal',
		// Inherited
		className: inheritedClassName,
		...props
	},
	ref,
) {
	const cx = useStyles(styleSheet);
	const headingClassName = useHeading(level);
	const className = useMemo(
		() =>
			cx({ align, overflow, palette, transform, weight }, 'typography', [
				headingClassName,
				inheritedClassName,
			]),
		[cx, align, overflow, palette, transform, weight, headingClassName, inheritedClassName],
	);
	const Tag = as ?? `h${level}`!;

	return (
		<Tag ref={ref} data-testid={testID} {...props} className={className}>
			<TypographyContext.Provider value>{children}</TypographyContext.Provider>
		</Tag>
	);
});
