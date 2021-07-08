import React from 'react';
import { render, screen } from '@testing-library/react';
import { Heading, HeadingProps } from '../../src/typography/Heading';
import { getRenderedStyles, withAccessibility, withStyles, Wrapper } from '../helpers';

function getElement() {
	return screen.getByText('Title')!;
}

describe('Heading', () => {
	it('renders the title', () => {
		render(<Heading level={1}>Title</Heading>, { wrapper: Wrapper });

		expect(getElement().className).toBe(
			'typography variant:align:start variant:overflow:wrap variant:palette:neutral variant:weight:normal variant:level:1',
		);
	});

	it(
		'renders the title styles',
		withStyles(() => {
			render(<Heading level={1}>Title</Heading>, { wrapper: Wrapper });

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);

	it(
		'passes accessibility',
		withAccessibility(async (axe) => {
			const { container } = render(<Heading level={1}>Title</Heading>, { wrapper: Wrapper });

			expect(await axe(container)).toHaveNoViolations();
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

	it('can pass a test ID', () => {
		render(
			<Heading level={1} testID="test">
				Title
			</Heading>,
			{ wrapper: Wrapper },
		);

		expect(getElement().getAttribute('data-testid')).toBe('test');
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

	describe('props', () => {
		const props: Partial<HeadingProps> = {
			align: 'center',
			level: 3,
			overflow: 'break',
			palette: 'danger',
			transform: 'capitalize',
			weight: 'bold',
		};

		Object.entries(props).forEach(([prop, value]) => {
			it(`sets "${prop}" class name`, () => {
				render(
					<Heading level={1} {...{ [prop]: value }}>
						Title
					</Heading>,
					{ wrapper: Wrapper },
				);

				expect(getElement().className).toEqual(
					expect.stringContaining(`variant:${prop}:${value as string}`),
				);
			});
		});
	});
});
