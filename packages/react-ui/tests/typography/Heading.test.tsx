import React from 'react';
import { render, screen } from '@testing-library/react';
import { Heading } from '../../src/typography/Heading';
import { getRenderedStyles, withStyles, Wrapper } from '../helpers';

function getElement() {
	return screen.getByText('Title')!;
}

describe('Heading', () => {
	it('renders the title', () => {
		render(<Heading level={1}>Title</Heading>, { wrapper: Wrapper });

		expect(getElement().className).toBe(
			'typography variant:align:start variant:overflow:wrap variant:palette:neutral variant:weight:normal element variant:level:1',
		);
	});

	it(
		'renders the title styles',
		withStyles(() => {
			render(<Heading level={1}>Title</Heading>, { wrapper: Wrapper });

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);

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
			'typography variant:align:center variant:overflow:break variant:palette:danger variant:transform:capitalize variant:weight:bold element variant:level:3',
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
