import React from 'react';
import { render, screen } from '@testing-library/react';
import { Select, SelectProps } from '../../src/inputs/Select';
import { getRenderedStyles, withAccessibility, withStyles, Wrapper } from '../helpers';

const options = (
	<>
		<option value="foo">Foo</option>
		<option value="bar">Bar</option>
		<option value="baz">Baz</option>
	</>
);

function getElement() {
	return screen.getByTestId('test')!;
}

describe('Select', () => {
	it('renders the select', () => {
		render(<Select testID="test">{options}</Select>, { wrapper: Wrapper });

		expect(getElement().className).toBe(
			'element borders variant:border:df variant:shape:round variant:border:df sizing variant:size:df',
		);
	});

	it(
		'passes accessibility',
		withAccessibility(async (axe) => {
			const { container } = render(
				<>
					<label htmlFor="id">Label</label>
					<Select id="id" name="test">
						{options}
					</Select>
				</>,
				{
					wrapper: Wrapper,
				},
			);

			expect(await axe(container)).toHaveNoViolations();
		}),
	);

	it('renders a `select` by default', () => {
		render(<Select testID="test">{options}</Select>, { wrapper: Wrapper });

		expect(getElement().tagName).toBe('SELECT');
	});

	it('can pass a test ID', () => {
		render(<Select testID="test">{options}</Select>, { wrapper: Wrapper });

		expect(getElement().getAttribute('data-testid')).toBe('test');
	});

	it('can pass a custom class name', () => {
		render(
			<Select className="foobar" testID="test">
				{options}
			</Select>,
			{ wrapper: Wrapper },
		);

		expect(getElement().className).toEqual(expect.stringContaining('foobar'));
	});

	it('can pass native attributes', () => {
		render(
			<Select aria-label="Label" id="foo" testID="test">
				{options}
			</Select>,
			{
				wrapper: Wrapper,
			},
		);

		const el = getElement();

		expect(el.id).toBe('foo');
		expect(el.getAttribute('aria-label')).toBe('Label');
	});

	describe('props', () => {
		const props: Partial<SelectProps> = {
			border: 'sm',
			palette: 'negative',
			shape: 'pill',
			size: 'lg',
		};

		Object.entries(props).forEach(([prop, value]) => {
			it(`sets "${prop}" class name`, () => {
				render(
					<Select testID="test" {...{ [prop]: value }}>
						{options}
					</Select>,
					{ wrapper: Wrapper },
				);

				expect(getElement().className).toEqual(expect.stringContaining(`variant:${prop}:${value}`));
			});
		});

		it('sets "value" attribute from "defaultValue"', () => {
			render(
				<Select defaultValue="bar" testID="test">
					{options}
				</Select>,
				{ wrapper: Wrapper },
			);

			expect((getElement() as HTMLSelectElement).value).toBe('bar');
		});

		it('sets "value" attribute from "value"', () => {
			render(
				<Select testID="test" value="baz" onChange={jest.fn()}>
					{options}
				</Select>,
				{
					wrapper: Wrapper,
				},
			);

			expect((getElement() as HTMLSelectElement).value).toBe('baz');
		});
	});
});
