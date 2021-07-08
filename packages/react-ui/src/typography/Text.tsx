import React, { useMemo } from 'react';
import { TextSize, useStyles } from '@aesthetic/react';
import { createDynamicComponent } from '../helpers/createComponent';
import { textStyleSheet } from '../sheets/text';
import { CommonProps } from '../types';
import { styleSheet } from './styles';
import { TypographyProps } from './types';
import { TypographyContext } from './TypographyContext';

export * from './types';

export type TextElement =
	| 'abbr'
	| 'b'
	| 'bdo'
	| 'cite'
	| 'code'
	| 'data'
	| 'dfn'
	| 'div'
	| 'em'
	| 'i'
	| 'kbd'
	| 'p'
	| 'q'
	| 'samp'
	| 'small'
	| 'span'
	| 'strong'
	| 'sub'
	| 'sup'
	| 'time'
	| 'var'
	| 'wbr';

export interface TextProps extends TypographyProps, CommonProps {
	/**
	 * Switch to a monospace font family defined in the current design system theme.
	 */
	monospaced?: boolean;
	/**
	 * Increase or decrease the font size and line height.
	 * @default df
	 */
	size?: TextSize;
}

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#phrasing_content
 */
export const Text = createDynamicComponent<TextProps, TextElement>(function Text(
	{
		align = 'start',
		as: Tag = 'p',
		children,
		monospaced,
		overflow = 'wrap',
		palette = 'neutral',
		size = 'df',
		testID,
		transform,
		weight = 'normal',
		// Inherited
		className: inheritedClassName,
		...props
	},
	ref,
) {
	const cx = useStyles(styleSheet, textStyleSheet);
	const className = useMemo(
		() =>
			cx(
				{ align, overflow, palette, size, transform, weight },
				'typography',
				monospaced && 'monospace',
				[inheritedClassName],
			),
		[cx, align, overflow, palette, size, transform, weight, monospaced, inheritedClassName],
	);

	return (
		<Tag ref={ref} data-testid={testID} {...props} className={className}>
			<TypographyContext.Provider value>{children}</TypographyContext.Provider>
		</Tag>
	);
});
