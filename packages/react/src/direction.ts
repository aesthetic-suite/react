import { createDirectionHelpers } from '@aesthetic/core-react';
import { aesthetic } from './aesthetic';

export const {
	DirectionContext,
	DirectionProvider,
	useDirection,
	withDirection,
} = createDirectionHelpers(aesthetic, { wrapper: 'div' });
