import React from 'react';
import { render, screen } from '@testing-library/react';
import { Box } from '../../src/layout/Box';
import { Stack } from '../../src/layout/Stack';
import { withAccessibility, Wrapper } from '../helpers';

function getElement() {
	return screen.getByTestId('box')!;
}

describe('Stack', () => {
	it('renders the element', () => {
		render(<Stack testID="box">Child</Stack>, { wrapper: Wrapper });

		expect(getElement().className).toBe(
			'box variant:alignContent:normal variant:alignItems:stretch variant:alignSelf:auto variant:direction:column variant:justifyContent:flex-start variant:wrap:false items spacing',
		);
	});

	it(
		'passes accessibility',
		withAccessibility(async (axe) => {
			const { container } = render(
				<Stack>
					<Box>Child</Box>
					<Box>Child</Box>
					<Box>Child</Box>
				</Stack>,
				{ wrapper: Wrapper },
			);

			expect(await axe(container)).toHaveNoViolations();
		}),
	);

	it('can change the element tag', () => {
		render(
			<Stack as="article" testID="box">
				Child
			</Stack>,
			{ wrapper: Wrapper },
		);

		expect(getElement().tagName).toBe('ARTICLE');
	});

	it('can pass a test ID', () => {
		render(<Stack testID="box">Child</Stack>, { wrapper: Wrapper });

		expect(getElement().getAttribute('data-testid')).toBe('box');
	});

	it('can pass a custom class name', () => {
		render(
			<Stack className="foobar" testID="box">
				Title
			</Stack>,
			{ wrapper: Wrapper },
		);

		expect(getElement().className).toEqual(expect.stringContaining('foobar'));
	});

	it('can pass custom styles', () => {
		render(
			<Stack style={{ color: 'red' }} testID="box">
				Title
			</Stack>,
			{ wrapper: Wrapper },
		);

		expect(getElement().style.color).toBe('red');
	});

	it('can pass native attributes', () => {
		render(
			<Stack aria-label="Label" id="foo" testID="box">
				Title
			</Stack>,
			{ wrapper: Wrapper },
		);

		const el = getElement();

		expect(el.id).toBe('foo');
		expect(el.getAttribute('aria-label')).toBe('Label');
	});

	describe('items', () => {
		it('wraps each child with an "li" when a "ul"', () => {
			render(
				<Stack as="ul" testID="box">
					<section>Child</section>
					<section>Child</section>
					<section>Child</section>
				</Stack>,
				{ wrapper: Wrapper },
			);

			const el = getElement();

			expect(el.tagName).toBe('UL');
			expect(el.children).toHaveLength(3);
			expect(el.children[0].tagName).toBe('LI');
			expect(el.children[1].tagName).toBe('LI');
			expect(el.children[2].tagName).toBe('LI');
		});

		it('wraps each child with an "li" when a "ol"', () => {
			render(
				<Stack as="ol" testID="box">
					<section>Child</section>
					<section>Child</section>
					<section>Child</section>
				</Stack>,
				{ wrapper: Wrapper },
			);

			const el = getElement();

			expect(el.tagName).toBe('OL');
			expect(el.children).toHaveLength(3);
			expect(el.children[0].tagName).toBe('LI');
			expect(el.children[1].tagName).toBe('LI');
			expect(el.children[2].tagName).toBe('LI');
		});

		it('wraps each child with an "li" when a non-list', () => {
			render(
				<Stack as="article" testID="box">
					<section>Child</section>
					<section>Child</section>
					<section>Child</section>
				</Stack>,
				{ wrapper: Wrapper },
			);

			const el = getElement();

			expect(el.tagName).toBe('ARTICLE');
			expect(el.children).toHaveLength(3);
			expect(el.children[0].tagName).toBe('DIV');
			expect(el.children[1].tagName).toBe('DIV');
			expect(el.children[2].tagName).toBe('DIV');
		});

		it('can set a class name to each item with "itemClassName"', () => {
			render(
				<Stack itemClassName="foobar" testID="box">
					<section>Child</section>
					<section>Child</section>
					<section>Child</section>
				</Stack>,
				{ wrapper: Wrapper },
			);

			const el = getElement();

			expect(el.className).not.toEqual(expect.stringContaining('foobar'));
			expect(el.children).toHaveLength(3);
			expect(el.children[0].className).toBe('foobar');
			expect(el.children[1].className).toBe('foobar');
			expect(el.children[2].className).toBe('foobar');
		});
	});

	describe('props', () => {
		it('sets "gap" class name and style variable', () => {
			render(
				<Stack gap="sm" testID="box">
					Child
				</Stack>,
				{ wrapper: Wrapper },
			);

			expect(getElement().className).toEqual(expect.stringContaining('stackGap'));
			expect(getElement().style.getPropertyValue('--gap')).toBe('0.63rem');
		});

		it('sets "reverse" variant', () => {
			render(
				<Stack reversed testID="box">
					Child
				</Stack>,
				{ wrapper: Wrapper },
			);

			expect(getElement().className).toEqual(
				expect.stringContaining('variant:direction:column-reverse'),
			);
		});
	});
});
