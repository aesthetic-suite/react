/* eslint-disable react/jsx-no-literals */

import React from 'react';
import { Text, TextInput, View, ViewStyle } from 'react-native';
import { Sheet } from '@aesthetic/core';
import { render } from '@testing-library/react-native';
import { createStyled } from '../src';
import { Wrapper } from './__fixtures__/Button';
import { setupAestheticReact, teardownAestheticReact } from './helpers';

function extractDebug(debug: () => void): string {
	const spy = jest.spyOn(console, 'log').mockImplementationOnce(() => {});

	debug();

	const output = spy.mock.calls[0][0];

	spy.mockRestore();

	return output;
}

describe('createStyled()', () => {
	beforeEach(() => {
		setupAestheticReact();
	});

	it('errors for a non-react element type', () => {
		expect(() =>
			createStyled(
				// @ts-expect-error Invalid type
				123,
				{},
			),
		).toThrow('Styled components must extend a View or React component, found number.');
	});

	it('errors for invalid style sheet factory', () => {
		expect(() =>
			createStyled(
				View,
				// @ts-expect-error Invalid type
				true,
			),
		).toThrow('Styled components require a style sheet factory function, found boolean.');
	});

	it('sets static properties on component', () => {
		const Button = createStyled(View, {});

		expect(Button.displayName).toBe('styled(View)');
		expect(Button.styleSheet).toBeInstanceOf(Sheet);

		const ComposedButton = createStyled(Button, {});

		expect(ComposedButton.displayName).toBe('styled(styled(View))');
		expect(ComposedButton.styleSheet).toBeInstanceOf(Sheet);
	});

	it('creates and renders a button with defined styles', () => {
		const Button = createStyled(View, () => ({
			display: 'flex',
			textAlign: 'center',
			padding: '1rem',
		}));

		const { debug } = render(
			<Button>
				<Text>Test</Text>
			</Button>,
			{
				wrapper: Wrapper,
			},
		);

		expect(extractDebug(debug)).toMatchSnapshot();
	});

	it('only renders styles once (create and mount), even when component rerenders', () => {
		const spy = jest.fn(
			() =>
				({
					fontWeight: 'bold',
				} as const),
		);

		const Link = createStyled(Text, spy);
		const cb = () => {};

		const { debug, update } = render(<Link onPress={cb}>Test</Link>, {
			wrapper: Wrapper,
		});

		update(<Link onPress={cb}>Test</Link>);
		update(<Link onPress={cb}>Test</Link>);
		update(<Link onPress={cb}>Test</Link>);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(extractDebug(debug)).toMatchSnapshot();
	});

	it('can pass custom props/attributes', () => {
		const Input = createStyled(TextInput, {
			borderWidth: 1,
			borderColor: 'black',
			padding: '1rem',
		});

		const { debug } = render(
			<Input editable={false} placeholder="Search..." style={{ borderStyle: 'solid' }} />,
			{
				wrapper: Wrapper,
			},
		);

		expect(extractDebug(debug)).toMatchSnapshot();
	});

	describe('variants', () => {
		interface AlertProps {
			palette?: 'negative' | 'positive' | 'warning';
		}

		function createAlert() {
			return createStyled<typeof View, AlertProps>(View, (css) => ({
				backgroundColor: css.tokens.palette.neutral.bg.base,
				'@variants': {
					'palette:success': {
						backgroundColor: css.tokens.palette.positive.bg.base,
					},
					'palette:failure': {
						backgroundColor: css.tokens.palette.negative.bg.base,
					},
					'palette:warning': {
						backgroundColor: css.tokens.palette.warning.bg.base,
					},
				},
			}));
		}

		it('supports variants', () => {
			const Alert = createAlert();
			const children = <Text>Title and other content!</Text>;

			const { debug, update } = render(<Alert palette="positive">{children}</Alert>, {
				wrapper: Wrapper,
			});

			expect(extractDebug(debug)).toMatchSnapshot();

			update(<Alert palette="negative">{children}</Alert>);

			expect(extractDebug(debug)).toMatchSnapshot();

			update(<Alert>{children}</Alert>);

			expect(extractDebug(debug)).toMatchSnapshot();
		});

		it('doesnt pass the variant prop to the View element', () => {
			const Alert = createAlert();

			const { debug } = render(<Alert palette="positive" />, {
				wrapper: Wrapper,
			});

			expect(extractDebug(debug)).toMatchSnapshot();
		});

		it('inherits and merges variant props and types when composing', () => {
			const Alert = createAlert();

			const SubAlert = createStyled<typeof Alert, { size?: 'lg' | 'sm' }>(Alert, {
				'@variants': {
					'size:sm': { padding: 1 },
					'size:lg': { padding: 2 },
				},
			});

			const { debug } = render(<SubAlert palette="positive" size="lg" />, {
				wrapper: Wrapper,
			});

			expect(extractDebug(debug)).toMatchSnapshot();
		});
	});

	describe('composition', () => {
		it('supports extending non-styled components', () => {
			function Base({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
				return <View style={style}>{children}</View>;
			}

			const Button = createStyled(Base, () => ({
				display: 'flex',
				textAlign: 'center',
				padding: '1rem',
			}));

			const { debug } = render(<Button style={{ color: 'red' }}>Normal</Button>, {
				wrapper: Wrapper,
			});

			expect(extractDebug(debug)).toMatchSnapshot();
		});

		it('supports extending other styled components', () => {
			const Button = createStyled(View, () => ({
				display: 'flex',
				textAlign: 'center',
				padding: '1rem',
			}));

			const BlockButton = createStyled(Button, {
				display: 'flex',
				width: '100%',
			});

			const LargeBlockButton = createStyled(BlockButton, {
				padding: '2rem',
				fontSize: 18,
			});

			const { debug } = render(
				<>
					<Button>Normal</Button>
					<BlockButton>Block</BlockButton>
					<LargeBlockButton>Large</LargeBlockButton>
				</>,
				{
					wrapper: Wrapper,
				},
			);

			expect(extractDebug(debug)).toMatchSnapshot();
		});

		it('can access the ref from multiple layers of composition', () => {
			const Leaf = createStyled(View, {});
			const Branch = createStyled(Leaf, {});
			const Trunk = createStyled(Branch, {});
			const Root = createStyled(Trunk, {});

			const ref = { ref: true };
			const spy = jest.fn();
			// @ts-expect-error Allow refs
			const { debug } = render(<Root ref={spy} />, {
				createNodeMock: () => ref,
				wrapper: Wrapper,
			});

			expect(spy).toHaveBeenCalled();
			expect(extractDebug(debug)).toMatchSnapshot();
		});
	});
});
