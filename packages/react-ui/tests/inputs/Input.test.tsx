import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input, InputProps } from '../../src/inputs/Input';
import { getRenderedStyles, withAccessibility, withStyles, Wrapper } from '../helpers';

function getElement() {
	return screen.getByPlaceholderText('Input')!;
}

describe('Input', () => {
	it('renders the input', () => {
		render(<Input placeholder="Input" />, { wrapper: Wrapper });

		expect(getElement().className).toBe(
			'element borders variant:border:df variant:shape:round variant:border:df sizing variant:size:df',
		);
	});

	it(
		'renders the input styles',
		withStyles(() => {
			render(<Input placeholder="Input" />, { wrapper: Wrapper });

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);

	it(
		'passes accessibility',
		withAccessibility(async (axe) => {
			const { container } = render(<Input placeholder="Input" />, { wrapper: Wrapper });

			expect(await axe(container)).toHaveNoViolations();
		}),
	);

	it('renders an `input` with type "text" by default', () => {
		render(<Input placeholder="Input" />, { wrapper: Wrapper });

		expect(getElement().tagName).toBe('INPUT');
		expect(getElement().getAttribute('type')).toBe('text');
	});

	it('can pass a test ID', () => {
		render(<Input placeholder="Input" testID="test" />, { wrapper: Wrapper });

		expect(getElement().getAttribute('data-testid')).toBe('test');
	});

	it('can pass a custom class name', () => {
		render(<Input className="foobar" placeholder="Input" />, { wrapper: Wrapper });

		expect(getElement().className).toEqual(expect.stringContaining('foobar'));
	});

	it('can pass native attributes', () => {
		render(<Input aria-label="Label" id="foo" placeholder="Input" type="email" />, {
			wrapper: Wrapper,
		});

		const el = getElement();

		expect(el.id).toBe('foo');
		expect(el.getAttribute('aria-label')).toBe('Label');
		expect(el.getAttribute('type')).toBe('email');
	});

	describe('props', () => {
		const props: Partial<InputProps> = {
			border: 'sm',
			palette: 'negative',
			shape: 'pill',
			size: 'lg',
		};

		Object.entries(props).forEach(([prop, value]) => {
			it(`sets "${prop}" class name`, () => {
				render(<Input placeholder="Input" {...{ [prop]: value }} />, { wrapper: Wrapper });

				expect(getElement().className).toEqual(expect.stringContaining(`variant:${prop}:${value}`));
			});
		});

		it('sets "type" attribute', () => {
			render(<Input placeholder="Input" type="password" />, { wrapper: Wrapper });

			expect(getElement().getAttribute('type')).toBe('password');
		});

		it('sets "value" attribute from "defaultValue"', () => {
			render(<Input defaultValue="foobar" placeholder="Input" />, { wrapper: Wrapper });

			expect((getElement() as HTMLInputElement).value).toBe('foobar');
		});

		it('sets "value" attribute from "value"', () => {
			render(<Input placeholder="Input" value="foobar" onChange={jest.fn()} />, {
				wrapper: Wrapper,
			});

			expect((getElement() as HTMLInputElement).value).toBe('foobar');
		});
	});
});
