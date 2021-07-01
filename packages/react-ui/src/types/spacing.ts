import { SpacingSize } from '@aesthetic/react';

export type Space = SpacingSize | number;

export interface SpacingProps {
	/** Apply padding to all edges. */
	spacing?: Space;
	/** Apply padding to the bottom edge. */
	spacingBottom?: Space;
	/** Apply padding to the end/trailing edge. */
	spacingEnd?: Space;
	/** Apply padding to the side edges. */
	spacingHorizontal?: Space;
	/** Apply padding to the start/leading edge. */
	spacingStart?: Space;
	/** Apply padding to the top edge. */
	spacingTop?: Space;
	/** Apply padding to the top and bottom edges. */
	spacingVertical?: Space;
}
