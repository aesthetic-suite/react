import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../../src/buttons/Button';
import { getRenderedStyles, withStyles, Wrapper } from '../helpers';

function getElement() {
	return screen.getByText('Button')!;
}

describe('Button', () => {
	it('renders the button with default styles', () => {
		render(<Button>Button</Button>, { wrapper: Wrapper });

		expect(getElement().className).toBe(
			'element variant:border:df variant:shape:round variant:border:df variant:size:df variant:palette:primary variant:fill:solid',
		);
	});

	it(
		'renders the button styles',
		withStyles(() => {
			render(<Button>Button</Button>, { wrapper: Wrapper });

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);

	it('renders a `button` by default', () => {
		render(<Button>Button</Button>, { wrapper: Wrapper });

		expect(getElement().tagName).toBe('BUTTON');
	});

	it('renders an `a` when linking', () => {
		render(<Button to="/">Button</Button>, { wrapper: Wrapper });

		expect(getElement().tagName).toBe('A');
	});

	it('can pass a custom class name', () => {
		render(<Button className="foobar">Button</Button>, { wrapper: Wrapper });

		expect(getElement().className).toEqual(expect.stringContaining('foobar'));
	});

	it('can change all props', () => {
		render(
			<Button border="sm" fill="empty" palette="danger" shape="pill" size="lg">
				Button
			</Button>,
			{ wrapper: Wrapper },
		);

		expect(getElement().className).toBe(
			'element variant:border:sm variant:shape:pill variant:size:lg variant:palette:danger variant:fill:empty',
		);
	});

	it('can pass native attributes', () => {
		render(
			<Button aria-label="Label" id="foo" type="submit">
				Button
			</Button>,
			{ wrapper: Wrapper },
		);

		const el = getElement();

		expect(el.id).toBe('foo');
		expect(el.getAttribute('aria-label')).toBe('Label');
		expect(el.getAttribute('type')).toBe('submit');
	});
});
