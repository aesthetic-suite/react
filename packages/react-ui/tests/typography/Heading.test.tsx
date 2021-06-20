import React from 'react';
import { render, screen } from '@testing-library/react';
import { Heading } from '../../src/typography/Heading';
import { getRenderedStyles, Wrapper } from '../helpers';

function getElement() {
	return screen.getByText('Title')!;
}

describe('Heading', () => {
	it('renders the title with default styles', () => {
		render(<Heading level={1}>Title</Heading>, { wrapper: Wrapper });

		expect(getElement().className).toBe('t u v w h1 i1 j1 o1 a2 a b c d');
		expect(getRenderedStyles('standard')).toMatchSnapshot();
	});

	([1, 2, 3, 4, 5, 6] as const).forEach((level) => {
		it(`renders level ${level}`, () => {
			render(<Heading level={level}>Title</Heading>, { wrapper: Wrapper });

			expect(getElement().tagName).toBe(`H${level}`);
		});
	});

	it('can change element outside of level', () => {
		render(
			<Heading as="h4" level={1}>
				Title
			</Heading>,
			{ wrapper: Wrapper },
		);

		expect(getElement().tagName).toBe('H4');
	});

	it('can pass a custom class name', () => {
		render(
			<Heading className="foo" level={1}>
				Title
			</Heading>,
			{ wrapper: Wrapper },
		);

		expect(getElement().className).toBe('t u v w h1 i1 j1 o1 a2 a b c d foo');
	});

	it('can change all props', () => {
		render(
			<Heading
				align="center"
				level={3}
				overflow="break"
				palette="danger"
				transform="capitalize"
				weight="bold"
			>
				Title
			</Heading>,
			{ wrapper: Wrapper },
		);

		expect(getElement().className).toBe('t u v x a1 b1 c1 q1 u1 b2 a h i j');
	});

	it('can pass native attributes', () => {
		render(
			<Heading aria-label="Label" id="foo" level={1}>
				Title
			</Heading>,
			{ wrapper: Wrapper },
		);

		const el = getElement();

		expect(el.id).toBe('foo');
		expect(el.getAttribute('aria-label')).toBe('Label');
	});
});
