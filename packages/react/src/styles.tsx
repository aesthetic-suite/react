import { createElement, forwardRef, memo, useMemo } from 'react';
import {
  ClassName,
  ElementStyles,
  RenderOptions,
  RenderResult,
  Rule,
  Utilities,
} from '@aesthetic/core';
import { createStyleHelpers } from '@aesthetic/core-react';
import { objectLoop } from '@aesthetic/utils';
import aesthetic from './aesthetic';
import { useDirection } from './direction';
import { useTheme } from './theme';
import { ElementType, InferProps, StyledComponent } from './types';

export const { useStyles, withStyles } = createStyleHelpers(aesthetic, {
  generate: aesthetic.generateClassName,
  useDirection,
  useTheme,
});

export function useCss(
  rule: Rule,
  options?: Pick<RenderOptions, 'media' | 'selector' | 'supports'>,
): ClassName {
  return useMemo(() => aesthetic.getEngine().renderRule(rule, options), [rule, options]);
}

function getVariantsFromProps(
  renderResult: RenderResult<unknown> | undefined,
  baseProps: object,
): { props: { className?: string }; variants?: Record<string, string> } {
  const types = renderResult?.variantTypes;

  if (!types) {
    return { props: baseProps };
  }

  const variants: Record<string, string> = {};
  const props: Record<string, unknown> = {};

  objectLoop(baseProps, (value, key) => {
    if (types.has(key)) {
      variants[key] = value;
    } else {
      props[key] = value;
    }
  });

  return { props, variants };
}

export function createStyled<
  T extends ElementType | React.ComponentType<any>,
  V extends object = {}
>(
  type: T,
  factory: ElementStyles | ((utilities: Utilities<ElementStyles>) => ElementStyles),
): StyledComponent<InferProps<T> & V> {
  if (__DEV__) {
    const typeOfType = typeof type;
    const typeOfFactory = typeof factory;

    if (typeOfType !== 'string' && typeOfType !== 'function' && typeOfType !== 'object') {
      throw new TypeError(
        `Styled components must extend an HTML element or React component, found ${typeOfType}.`,
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
      const cx = useStyles(styleSheet);
      const { props, variants } = getVariantsFromProps(cx.result.element, baseProps);
      let className = variants ? cx(variants, 'element') : cx('element');

      if (props.className) {
        className += ` ${props.className}`;
      }

      return createElement(type, {
        ...props,
        className,
        ref,
      });
    }),
  );

  const displayName =
    typeof type === 'string'
      ? String(type)
      : String((type as React.ComponentType).displayName || (type as Function).name);

  Component.displayName = `styled(${displayName})`;

  (Component as StyledComponent).styleSheet = styleSheet;

  // Use the return type of `createStyled` instead of `forwardRef`
  return Component as any;
}
