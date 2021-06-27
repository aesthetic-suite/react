import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../../src/buttons/Button';
import { getRenderedStyles, Wrapper } from '../helpers';

function getElement() {
	return screen.getByText('Button')!;
}

describe('Button', () => {
	it('renders the button with default styles', () => {
		render(<Button>Button</Button>, { wrapper: Wrapper });

		expect(getElement().className).toBe(
			'ceq1ljg c193j6ji c15h9hk8 c1c51rl0 c1et6jhk cg4y2l6 cngw5jn c1dh7ri5 c3m4tha cwhyrls c16r1ggk cfdmyha c1wb9a8i c13kbekr cqmlbj8 ccczif2 c2oh6lf c1kq5gr0 c1q9bcr2 c1rooa26 c1q1da5a cpfxegw c1rmjobf cjjixdc c1xwxy1g c1bnser c179czo1 c10icsey ckv942l cg3llcv cl8v8re cqmb2sd c1fcxwbj cmqesf2 c1rr41bt cdega9n cua9xzv cpsyx3w c12f7n4u',
		);
		expect(getRenderedStyles('standard')).toMatchSnapshot();
	});

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
			'ceq1ljg c193j6ji c15h9hk8 c1c51rl0 c1et6jhk cg4y2l6 cngw5jn c1dh7ri5 c3m4tha cwhyrls c16r1ggk cfdmyha c1wb9a8i c13kbekr cqmlbj8 ccczif2 c2oh6lf c1kq5gr0 c1e95qeq c18kfffx c10l4oaf ckfuq95 c14wns5t cwb63sg cqua04n c1o4xl7h c1oowyan co1x5yh c1yiozzz c1qpwfy5 c1okldrd c1y3mqwl c1qgbjxz c1ntcsgd c1uzhsu c1fgosyk cq29h60 cng3lqv ceqmz9x',
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
