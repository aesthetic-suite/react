import { createItemsContainer, ItemsContainerProps } from './internal/createItemsContainer';

export type StackProps = ItemsContainerProps;

export const Stack = createItemsContainer<StackProps>('Stack', 'column');
