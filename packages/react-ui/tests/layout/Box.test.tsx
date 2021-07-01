import React from 'react';
import { hyphenate } from '@aesthetic/utils';
import { render, screen } from '@testing-library/react';
import { Box, BoxProps } from '../../src/layout/Box';
import { getRenderedStyles, withStyles, Wrapper } from '../helpers';

function getElement() {
	return screen.getByTestId('box')!;
}

describe('Box', () => {
	it('renders the box', () => {
		render(<Box testID="box">Child</Box>, { wrapper: Wrapper });

		expect(getElement().className).toBe(
			'box variant:align-content:normal variant:align-items:normal variant:align-self:auto variant:direction:row variant:justify-content:flex-start variant:wrap:false element element',
		);
	});

	it(
		'renders the box styles',
		withStyles(() => {
			render(<Box testID="box">Child</Box>, { wrapper: Wrapper });

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);

	it('can change the element tag', () => {
		render(
			<Box as="article" testID="box">
				Child
			</Box>,
			{ wrapper: Wrapper },
		);

		expect(getElement().tagName).toBe('ARTICLE');
	});

	it('can pass a test ID', () => {
		render(<Box testID="box">Child</Box>, { wrapper: Wrapper });

		expect(getElement().getAttribute('data-testid')).toBe('box');
	});

	it('can pass a custom class name', () => {
		render(
			<Box className="foobar" testID="box">
				Title
			</Box>,
			{ wrapper: Wrapper },
		);

		expect(getElement().className).toEqual(expect.stringContaining('foobar'));
	});

	it('can pass custom styles', () => {
		render(
			<Box style={{ color: 'red' }} testID="box">
				Title
			</Box>,
			{ wrapper: Wrapper },
		);

		expect(getElement().style.color).toBe('red');
	});

	it('can pass native attributes', () => {
		render(
			<Box aria-label="Label" id="foo" testID="box">
				Title
			</Box>,
			{ wrapper: Wrapper },
		);

		const el = getElement();

		expect(el.id).toBe('foo');
		expect(el.getAttribute('aria-label')).toBe('Label');
	});

	describe('props', () => {
		const props: BoxProps = {
			alignContent: 'space-around',
			alignItems: 'safe',
			alignSelf: 'center',
			direction: 'column',
			justifyContent: 'space-between',
			wrap: 'reverse',
		};

		Object.entries(props).forEach(([prop, value]) => {
			it(`sets "${prop}" class name`, () => {
				render(
					<Box testID="box" {...{ [prop]: value }}>
						Child
					</Box>,
					{ wrapper: Wrapper },
				);

				expect(getElement().className).toEqual(
					expect.stringContaining(`variant:${hyphenate(prop)}:${value}`),
				);
			});
		});

		it('sets "inline" class name', () => {
			render(
				<Box inline testID="box">
					Child
				</Box>,
				{ wrapper: Wrapper },
			);

			expect(getElement().className).toEqual(expect.stringContaining('boxInline'));
		});

		it('sets "grow" class name and style variable', () => {
			render(
				<Box grow={3} testID="box">
					Child
				</Box>,
				{ wrapper: Wrapper },
			);

			expect(getElement().className).toEqual(expect.stringContaining('boxVars'));
			expect(getElement().style.getPropertyValue('--box-grow')).toBe('3');
		});

		it('sets "shrink" class name and style variable', () => {
			render(
				<Box shrink={2} testID="box">
					Child
				</Box>,
				{ wrapper: Wrapper },
			);

			expect(getElement().className).toEqual(expect.stringContaining('boxVars'));
			expect(getElement().style.getPropertyValue('--box-shrink')).toBe('2');
		});

		it('sets "order" class name and style variable', () => {
			render(
				<Box order={0} testID="box">
					Child
				</Box>,
				{ wrapper: Wrapper },
			);

			expect(getElement().className).toEqual(expect.stringContaining('boxVars'));
			expect(getElement().style.getPropertyValue('--box-order')).toBe('0');
		});

		it('sets spacing style variables', () => {
			render(
				<Box spacing={1} spacingHorizontal={2} testID="box">
					Child
				</Box>,
				{ wrapper: Wrapper },
			);

			expect(getElement().style.getPropertyValue('--spacing-all')).toBe('1.25rem');
			expect(getElement().style.getPropertyValue('--spacing-horizontal')).toBe('2.50rem');
		});
	});
});
