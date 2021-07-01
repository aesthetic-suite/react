import { styles } from '@aesthetic/react';
import { mapVariants } from '../helpers/mapVariants';
import { BoxAlignContent, BoxAlignItems, BoxJustifyContent } from './types';

export const styleSheet = styles(() => ({
	box: {
		display: 'flex',
		margin: 0,
		padding: 0,
		listStyle: 'none',

		'@variants': {
			// Align content
			...mapVariants(
				'alignContent',
				[
					'baseline',
					'center',
					'end',
					'flex-end',
					'flex-start',
					'normal',
					'safe',
					'space-around',
					'space-between',
					'space-evenly',
					'start',
					'stretch',
					'unsafe',
				] as BoxAlignContent[],
				(value) => ({
					alignContent: value,
				}),
			),

			// Align items
			...mapVariants(
				'alignItems',
				[
					'baseline',
					'center',
					'end',
					'flex-end',
					'flex-start',
					'normal',
					'safe',
					'self-end',
					'self-start',
					'start',
					'stretch',
					'unsafe',
				] as BoxAlignItems[],
				(value) => ({
					alignItems: value,
				}),
			),

			// Align self
			...mapVariants(
				'alignSelf',
				[
					'auto',
					'baseline',
					'center',
					'flex-end',
					'flex-start',
					'normal',
					'safe',
					'self-end',
					'self-start',
					'stretch',
					'unsafe',
				],
				(value) => ({
					alignSelf: value,
				}),
			),

			// Flex direction
			'direction:column': { flexDirection: 'column' },
			'direction:column-reverse': { flexDirection: 'column-reverse' },
			'direction:row': { flexDirection: 'row' },
			'direction:row-reverse': { flexDirection: 'row-reverse' },

			// Justify content
			...mapVariants(
				'justifyContent',
				[
					'center',
					'end',
					'flex-end',
					'flex-start',
					'left',
					'normal',
					'right',
					'safe',
					'space-around',
					'space-between',
					'space-evenly',
					'start',
					'unsafe',
				] as BoxJustifyContent[],
				(value) => ({
					justifyContent: value,
				}),
			),

			// Flex wrap
			'wrap:false': { flexWrap: 'nowrap' },
			'wrap:true': { flexWrap: 'wrap' },
			'wrap:reverse': { flexWrap: 'wrap-reverse' },
		},
	},

	boxInline: {
		display: 'inline-flex',
	},

	boxVars: {
		// @ts-expect-error csstype not typed for variables
		flexGrow: 'var(--box-grow)',
		// @ts-expect-error csstype not typed for variables
		flexShrink: 'var(--box-shrink)',
		// @ts-expect-error csstype not typed for variables
		order: 'var(--box-order)',
	},

	inlineGap: {
		'@selectors': {
			'> *:not(:last-child)': {
				marginRight: 'var(--gap)',
			},
		},
	},

	stackGap: {
		'@selectors': {
			'> *:not(:last-child)': {
				marginBottom: 'var(--gap)',
			},
		},
	},
}));
