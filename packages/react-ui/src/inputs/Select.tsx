import React, { useMemo } from 'react';
import { Input as ReakitInput } from 'reakit';
import { useStyles } from '@aesthetic/react';
import { createComponent } from '../helpers/createComponent';
import { shapedBorderStyleSheet } from '../sheets/borders';
import { sizingStyleSheet } from '../sheets/sizing';
import { OmitUnwantedHtmlProps } from '../types';
import { styleSheet } from './styles';
import { InputCommonProps } from './types';

export interface SelectProps
	extends InputCommonProps,
		OmitUnwantedHtmlProps<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
	/** List of `option` and `optgroup` elements. */
	children: NonNullable<React.ReactNode>;
}

export const Select = createComponent<SelectProps, HTMLSelectElement>(function Select(
	{
		border = 'df',
		children,
		palette,
		shape = 'round',
		size = 'df',
		testID,
		// Inherited
		className: inheritedClassName,
		...props
	},
	ref,
) {
	const cx = useStyles(styleSheet, shapedBorderStyleSheet, sizingStyleSheet);
	const className = useMemo(
		() =>
			cx({ border, palette, shape, size }, 'element', 'borders', 'sizing', [inheritedClassName]),
		[cx, border, palette, shape, size, inheritedClassName],
	);

	return (
		<ReakitInput ref={ref} as="select" data-testid={testID} {...props} className={className}>
			{children}
		</ReakitInput>
	);
});
