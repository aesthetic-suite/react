import React, { createElement, forwardRef, useMemo } from 'react';
import { ElementSheetFactory } from '@aesthetic/core';
import { createStyleHelpers } from '@aesthetic/core-react';
import { toArray } from '@aesthetic/utils';
import { aesthetic } from './aesthetic';
import { useDirection } from './direction';
import { useTheme } from './theme';
import { InferProps, NativeRule, NativeStyles, StyledComponent } from './types';

export const { getVariantsFromProps, useStyles, withStyles } = createStyleHelpers<
	NativeRule,
	NativeStyles,
	NativeStyles[]
>(aesthetic, {
	generate: (results) => results,
	useDirection,
	useTheme,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createStyled<T extends React.ComponentType<any>, V extends object = {}>(
	type: T,
	factory: ElementSheetFactory<NativeRule> | NativeRule,
): StyledComponent<InferProps<T> & V> {
	if (process.env.NODE_ENV !== 'production') {
		const typeOfType = typeof type;
		const typeOfFactory = typeof factory;

		if (typeOfType !== 'string' && typeOfType !== 'function' && typeOfType !== 'object') {
			throw new TypeError(
				`Styled components must extend a View or React component, found ${typeOfType}.`,
			);
		}

		if (typeOfFactory !== 'function' && typeOfFactory !== 'object') {
			throw new TypeError(
				`Styled components require a style sheet factory function, found ${typeOfFactory}.`,
			);
		}
	}

	const styleSheet = aesthetic.createScopedStyleSheet(factory);

	const Component = forwardRef((baseProps, ref) => {
		const sx = useStyles(styleSheet);
		const { props, variants } = getVariantsFromProps<'style'>(sx.result.element, baseProps);
		const style = variants ? sx(variants, 'element') : sx('element');

		// Cache the style prop so that we avoid unwanted rerenders
		const styleProp = useMemo(() => {
			const viewStyles = [...style];

			if (props.style) {
				viewStyles.push(...toArray(props.style));
			}

			return viewStyles;
		}, [style, props.style]);

		return createElement(type, {
			...props,
			ref,
			style: styleProp,
		});
	});

	const displayName =
		typeof type === 'string'
			? String(type)
			: String((type as React.ComponentType).displayName ?? (type as Function).name);

	Component.displayName = `styled(${displayName})`;

	(Component as StyledComponent).styleSheet = styleSheet;

	// Use the return type of `createStyled` instead of `forwardRef`
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
	return Component as any;
}
