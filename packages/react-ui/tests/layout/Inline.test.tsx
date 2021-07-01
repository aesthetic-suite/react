import React from 'react';
import { render, screen } from '@testing-library/react';
import { Inline } from '../../src/layout/Inline';
import { Wrapper } from '../helpers';

function getElement() {
	return screen.getByTestId('box')!;
}

describe('Inline', () => {
	it('renders the element', () => {
		render(<Inline testID="box">Child</Inline>, { wrapper: Wrapper });

		expect(getElement().className).toBe(
			'box variant:align-content:normal variant:align-items:center variant:align-self:auto variant:direction:row variant:justify-content:flex-start variant:wrap:false element element',
		);
	});

	it('can change the element tag', () => {
		render(
			<Inline as="article" testID="box">
				Child
			</Inline>,
			{ wrapper: Wrapper },
		);

		expect(getElement().tagName).toBe('ARTICLE');
	});

	it('can pass a test ID', () => {
		render(<Inline testID="box">Child</Inline>, { wrapper: Wrapper });

		expect(getElement().getAttribute('data-testid')).toBe('box');
	});

	it('can pass a custom class name', () => {
		render(
			<Inline className="foobar" testID="box">
				Title
			</Inline>,
			{ wrapper: Wrapper },
		);

		expect(getElement().className).toEqual(expect.stringContaining('foobar'));
	});

	it('can pass custom styles', () => {
		render(
			<Inline style={{ color: 'red' }} testID="box">
				Title
			</Inline>,
			{ wrapper: Wrapper },
		);

		expect(getElement().style.color).toBe('red');
	});

	it('can pass native attributes', () => {
		render(
			<Inline aria-label="Label" id="foo" testID="box">
				Title
			</Inline>,
			{ wrapper: Wrapper },
		);

		const el = getElement();

		expect(el.id).toBe('foo');
		expect(el.getAttribute('aria-label')).toBe('Label');
	});

	describe('items', () => {
		it('wraps each child with an "li" when a "ul"', () => {
			render(
				<Inline as="ul" testID="box">
					<section>Child</section>
					<section>Child</section>
					<section>Child</section>
				</Inline>,
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
				<Inline as="ol" testID="box">
					<section>Child</section>
					<section>Child</section>
					<section>Child</section>
				</Inline>,
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
				<Inline as="article" testID="box">
					<section>Child</section>
					<section>Child</section>
					<section>Child</section>
				</Inline>,
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
				<Inline itemClassName="foobar" testID="box">
					<section>Child</section>
					<section>Child</section>
					<section>Child</section>
				</Inline>,
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
				<Inline gap={3} testID="box">
					Child
				</Inline>,
				{ wrapper: Wrapper },
			);

			expect(getElement().className).toEqual(expect.stringContaining('inlineGap'));
			expect(getElement().style.getPropertyValue('--gap')).toBe('3.75rem');
		});

		it('sets "reverse" variant', () => {
			render(
				<Inline reversed testID="box">
					Child
				</Inline>,
				{ wrapper: Wrapper },
			);

			expect(getElement().className).toEqual(
				expect.stringContaining('variant:direction:row-reverse'),
			);
		});
	});
});
