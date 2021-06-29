import React, { Children } from 'react';
import { createDynamicComponent } from '../helpers/createComponent';
import { Box, BoxElement, BoxProps } from './Box';

export interface StackProps extends Omit<BoxProps, 'direction' | 'inline'> {
	reversed?: boolean;
	wrapChildren?: boolean;
}

export const Stack = createDynamicComponent<StackProps, BoxElement>(function Stack(
	{ as = 'div', children, reversed, wrapChildren, ...props },
	ref,
) {
	const Child = as === 'ul' || as === 'li' ? 'li' : 'div';

	return (
		<Box ref={ref} {...props} direction={reversed ? 'row-reverse' : 'row'}>
			{wrapChildren ? Children.map(children, (child) => <Child>{child}</Child>) : children}
		</Box>
	);
});
