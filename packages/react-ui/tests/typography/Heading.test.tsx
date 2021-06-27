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

		expect(getElement().className).toBe(
			'c1u0bpqh c13kbekr cqmlbj8 c1p4ubeg c1xww3tf c1f1iw5d cn25lgq c1u0bpqh czkiasv c6u9ihh c9kwtas crgd4fe c1d7w45w',
		);
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
			<Heading className="foobar" level={1}>
				Title
			</Heading>,
			{ wrapper: Wrapper },
		);

		expect(getElement().className).toEqual(expect.stringContaining('foobar'));
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

		expect(getElement().className).toBe(
			'c1u0bpqh c13kbekr cqmlbj8 cngw5jn cnvui58 cc50pji c1gvf4w5 cbrsnfr cfg0erx c1b6fj3h c6u9ihh c1kouy52 c1nd9zqg c1qysrx2',
		);
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
