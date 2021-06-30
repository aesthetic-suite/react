import { createItemsContainer, ItemsContainerProps } from './internal/createItemsContainer';

export type InlineProps = ItemsContainerProps;

export const Inline = createItemsContainer<InlineProps>('Inline', 'row');
