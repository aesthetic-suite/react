import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button, ButtonProps } from '../../src/buttons/Button';
import { getRenderedStyles, withAccessibility, withStyles, Wrapper } from '../helpers';

function getElement() {
	return screen.getByText('Button')!;
}

describe('Button', () => {
	it('renders the button', () => {
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

	it(
		'passes accessibility as a button',
		withAccessibility(async (axe) => {
			const { container } = render(<Button>Button</Button>, { wrapper: Wrapper });

			expect(await axe(container)).toHaveNoViolations();
		}),
	);

	it(
		'passes accessibility as a link',
		withAccessibility(async (axe) => {
			const { container } = render(<Button to="/">Button</Button>, { wrapper: Wrapper });

			expect(await axe(container)).toHaveNoViolations();
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

	it('can pass a test ID', () => {
		render(<Button testID="test">Button</Button>, { wrapper: Wrapper });

		expect(getElement().getAttribute('data-testid')).toBe('test');
	});

	it('can pass a custom class name', () => {
		render(<Button className="foobar">Button</Button>, { wrapper: Wrapper });

		expect(getElement().className).toEqual(expect.stringContaining('foobar'));
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

	describe('props', () => {
		const props: Partial<ButtonProps> = {
			border: 'sm',
			fill: 'empty',
			palette: 'danger',
			shape: 'pill',
			size: 'lg',
		};

		Object.entries(props).forEach(([prop, value]) => {
			it(`sets "${prop}" class name`, () => {
				render(<Button {...{ [prop]: value }}>Button</Button>, { wrapper: Wrapper });

				expect(getElement().className).toEqual(expect.stringContaining(`variant:${prop}:${value}`));
			});
		});
	});
});
