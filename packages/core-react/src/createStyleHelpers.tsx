import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	Aesthetic,
	ComponentSheet,
	Direction,
	ResultComposer,
	ResultComposerArgs,
	ResultComposerVariants,
	ResultGenerator,
	SheetRenderResult,
	Theme,
} from '@aesthetic/core';
import { isObject, objectLoop } from '@aesthetic/utils';
import { createHOC } from './createHOC';
import { InternalWithStylesWrappedProps, WrapperComponent, WrapperProps } from './types';

export interface StyleHelperOptions<Input extends object, Output, GeneratedOutput> {
	generate: ResultGenerator<string, Output, GeneratedOutput>;
	useDirection: () => Direction;
	useTheme: () => Theme<Input>;
}

export function createStyleHelpers<Input extends object, Output, GeneratedOutput = Output>(
	aesthetic: Aesthetic<Input, Output>,
	{ generate, useDirection, useTheme }: StyleHelperOptions<Input, Output, GeneratedOutput>,
) /* infer */ {
	function cxWithCache(
		args: ResultComposerArgs<string, Output>,
		results: SheetRenderResult<Output>,
		cache: Record<string, GeneratedOutput>,
	): GeneratedOutput {
		const variants = new Set<string>();
		let cacheKey = '';

		// Variant objects may only be passed as the first argument
		if (isObject(args[0])) {
			objectLoop((args.shift() as unknown) as ResultComposerVariants, (value, variant) => {
				if (value) {
					const type = `${variant}:${value}`;

					variants.add(type);
					cacheKey += type;
				}
			});
		}

		cacheKey += args.filter(Boolean).join('');

		if (!cache[cacheKey]) {
			// eslint-disable-next-line no-param-reassign
			cache[cacheKey] = generate(args, variants, results);
		}

		return cache[cacheKey];
	}

	/**
	 * Hook within a component to provide a style sheet.
	 */
	function useStyles<T = unknown>(
		sheet: ComponentSheet<T, Input, Output>,
	): ResultComposer<keyof T, Output, GeneratedOutput> {
		const theme = useTheme();
		const direction = useDirection();
		const classCache = useRef<Record<string, GeneratedOutput>>({});
		const initialMount = useRef(true);
		const [result, setResult] = useState<SheetRenderResult<Output>>(() =>
			aesthetic.renderComponentStyles(sheet, {
				direction,
				theme: theme.name,
			}),
		);

		useEffect(() => {
			// Avoid double rendering on first mount
			if (initialMount.current) {
				initialMount.current = false;

				return;
			}

			// Reset cache since styles are changing
			classCache.current = {};

			// Re-render styles when the theme or direction change
			setResult(
				aesthetic.renderComponentStyles(sheet, {
					direction,
					theme: theme.name,
				}),
			);

			// It wants to include `sheet` but that triggers an infinite render loop
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [direction, theme.name]);

		const composer = useCallback(
			(...args: ResultComposerArgs<string, Output>) =>
				cxWithCache(args, result, classCache.current),
			[result],
		);

		const cx = (composer as unknown) as ResultComposer<keyof T, Output, GeneratedOutput>;

		// Make the result available if need be, but behind a hidden API
		cx.result = result!;

		return cx;
	}

	/**
	 * Wrap a React component with an HOC that injects the style to class name transfer function.
	 */
	function withStyles<T = unknown>(sheet: ComponentSheet<T, Input, Output>) /* infer */ {
		return function withStylesComposer<Props extends object = {}>(
			WrappedComponent: React.ComponentType<
				InternalWithStylesWrappedProps<keyof T, Output> & Props
			>,
		): React.FunctionComponent<
			Omit<Props, keyof InternalWithStylesWrappedProps<keyof T, Output>> & WrapperProps
		> &
			WrapperComponent {
			return createHOC(
				'withStyles',
				WrappedComponent,
				// eslint-disable-next-line prefer-arrow-callback
				function WithStyles({ wrappedRef, ...props }) {
					const compose = useStyles(sheet);

					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					return <WrappedComponent {...(props as any)} ref={wrappedRef} compose={compose} />;
				},
			);
		};
	}

	function getVariantsFromProps<Keys extends string>(
		renderResult: SheetRenderResult<Output>[string] | undefined,
		baseProps: Record<string, unknown>,
	): { props: { [K in Keys]?: Output }; variants?: ResultComposerVariants } {
		const types = renderResult?.variantTypes;

		if (!types) {
			// @ts-expect-error We know its safe
			return { props: baseProps };
		}

		const props = { ...baseProps };
		const variants: ResultComposerVariants = {};

		types.forEach((type) => {
			if (type in props) {
				variants[type] = props[type] as string;
				props[type] = undefined;
			}
		});

		// @ts-expect-error We know its safe
		return { props, variants };
	}

	return {
		getVariantsFromProps,
		useStyles,
		withStyles,
	};
}
