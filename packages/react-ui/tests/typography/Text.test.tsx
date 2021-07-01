import React from 'react';
import { render, screen } from '@testing-library/react';
import { Text, TextProps } from '../../src/typography/Text';
import { getRenderedStyles, withAccessibility, withStyles, Wrapper } from '../helpers';

function getElement() {
	return screen.getByText('Copy') as HTMLParagraphElement;
}

describe('Text', () => {
	it('renders the text with default styles', () => {
		render(<Text>Copy</Text>, { wrapper: Wrapper });

		const el = getElement();

		expect(el.className).toBe(
			'typography variant:align:start variant:overflow:wrap variant:palette:neutral variant:weight:normal element variant:size:df',
		);
		expect(el.tagName).toBe('P');
	});

	it(
		'renders the text styles',
		withStyles(() => {
			render(<Text>Copy</Text>, { wrapper: Wrapper });

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);

	it(
		'passes accessibility',
		withAccessibility(async (axe) => {
			const { container } = render(<Text>Copy</Text>, { wrapper: Wrapper });

			expect(await axe(container)).toHaveNoViolations();
		}),
	);

	it('renders size small', () => {
		render(<Text size="sm">Copy</Text>, { wrapper: Wrapper });

		expect(getElement().className).toEqual(expect.stringContaining('variant:size:sm'));
	});

	it('renders size large', () => {
		render(<Text size="lg">Copy</Text>, { wrapper: Wrapper });

		expect(getElement().className).toEqual(expect.stringContaining('variant:size:lg'));
	});

	it('can change element', () => {
		render(<Text as="kbd">Copy</Text>, { wrapper: Wrapper });

		expect(getElement().tagName).toBe('KBD');
	});

	it('can pass a test ID', () => {
		render(<Text testID="test">Copy</Text>, { wrapper: Wrapper });

		expect(getElement().getAttribute('data-testid')).toBe('test');
	});

	it('can pass a custom class name', () => {
		render(<Text className="foobar">Copy</Text>, { wrapper: Wrapper });

		expect(getElement().className).toEqual(expect.stringContaining('foobar'));
	});

	it('can pass native attributes', () => {
		render(
			<Text aria-label="Label" id="foo">
				Copy
			</Text>,
			{ wrapper: Wrapper },
		);

		const el = getElement();

		expect(el.id).toBe('foo');
		expect(el.getAttribute('aria-label')).toBe('Label');
	});

	describe('props', () => {
		const props: Partial<TextProps> = {
			align: 'center',
			overflow: 'break',
			palette: 'danger',
			size: 'lg',
			transform: 'capitalize',
			weight: 'bold',
		};

		Object.entries(props).forEach(([prop, value]) => {
			it(`sets "${prop}" class name`, () => {
				render(<Text {...{ [prop]: value }}>Copy</Text>, { wrapper: Wrapper });

				expect(getElement().className).toEqual(
					expect.stringContaining(`variant:${prop}:${value as string}`),
				);
			});
		});

		it('sets "monospaced" class name', () => {
			render(<Text monospaced>Copy</Text>, { wrapper: Wrapper });

			expect(getElement().className).toEqual(expect.stringContaining('monospace'));
		});
	});
});
