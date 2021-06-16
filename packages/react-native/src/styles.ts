import React, { createElement, forwardRef, memo, useMemo } from 'react';
import { Utilities } from '@aesthetic/core';
import { createStyleHelpers } from '@aesthetic/core-react';
import { arrayLoop, toArray } from '@aesthetic/utils';
import { aesthetic } from './aesthetic';
import { useDirection } from './direction';
import { useTheme } from './theme';
import { InferProps, NativeBlock, NativeStyles, StyledComponent } from './types';

export const { getVariantsFromProps, useStyles, withStyles } = createStyleHelpers<
	NativeStyles,
	NativeBlock,
	NativeStyles[]
>(aesthetic, {
	generate(args, variants, results) {
		const style: NativeStyles[] = [];

		arrayLoop(args, (arg) => {
			if (!arg) {
				return;
			}

			if (Array.isArray(arg)) {
				arg.forEach((a) => {
					if (a) {
						style.push(a);
					}
				});

				return;
			}

			const hash = results[arg];

			if (!hash) {
				return;
			}

			if (hash.result) {
				style.push(hash.result);
			}

			if (hash.variants) {
				arrayLoop(hash.variants, ({ types, result }) => {
					if (types.every((type) => variants.has(type))) {
						style.push(result);
					}
				});
			}
		});

		return style;
	},
	useDirection,
	useTheme,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createStyled<T extends React.ComponentType<any>, V extends object = {}>(
	type: T,
	factory: NativeBlock | ((utilities: Utilities<NativeBlock>) => NativeBlock),
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

	const styleSheet = aesthetic.createComponentStyles((utils) => ({
		element: typeof factory === 'function' ? factory(utils) : factory,
	}));

	const Component = memo(
		forwardRef((baseProps, ref) => {
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
		}),
	);

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
