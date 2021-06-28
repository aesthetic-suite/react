import React from 'react';
import { render, screen } from '@testing-library/react';
import { Text } from '../../src/typography/Text';
import { getRenderedStyles, Wrapper } from '../helpers';

function getElement() {
	return screen.getByText('Copy') as HTMLParagraphElement;
}

describe('Text', () => {
	it('renders the text with default styles', () => {
		render(<Text>Copy</Text>, { wrapper: Wrapper });

		const el = getElement();

		expect(el.className).toBe(
			'c1u0bpqh c13kbekr cqmlbj8 c1p4ubeg c1xww3tf c1f1iw5d cn25lgq c1u0bpqh czkiasv cwhyrls c1q1da5a cpfxegw',
		);
		expect(el.tagName).toBe('P');
		expect(getRenderedStyles('standard')).toMatchSnapshot();
	});

	it('renders size small', () => {
		render(<Text size="sm">Copy</Text>, { wrapper: Wrapper });

		expect(getElement().className).toBe(
			'c1u0bpqh c13kbekr cqmlbj8 c1p4ubeg c1xww3tf c1f1iw5d cn25lgq c1u0bpqh czkiasv cwhyrls cxzk1cy c1qx7d18',
		);
	});

	it('renders size large', () => {
		render(<Text size="lg">Copy</Text>, { wrapper: Wrapper });

		expect(getElement().className).toBe(
			'c1u0bpqh c13kbekr cqmlbj8 c1p4ubeg c1xww3tf c1f1iw5d cn25lgq c1u0bpqh czkiasv cwhyrls c10l4oaf ckfuq95',
		);
	});

	it('can change element', () => {
		render(<Text as="kbd">Copy</Text>, { wrapper: Wrapper });

		expect(getElement().tagName).toBe('KBD');
	});

	it('can pass a custom class name', () => {
		render(<Text className="foo">Copy</Text>, { wrapper: Wrapper });

		expect(getElement().className).toBe(
			'c1u0bpqh c13kbekr cqmlbj8 c1p4ubeg c1xww3tf c1f1iw5d cn25lgq c1u0bpqh czkiasv cwhyrls c1q1da5a cpfxegw foo',
		);
	});

	it('can change all props', () => {
		render(
			<Text
				monospaced
				align="center"
				overflow="break"
				palette="danger"
				size="lg"
				transform="capitalize"
				weight="bold"
			>
				Copy
			</Text>,
			{ wrapper: Wrapper },
		);

		expect(getElement().className).toBe(
			'c1u0bpqh c13kbekr cqmlbj8 cngw5jn cnvui58 cc50pji c1gvf4w5 cbrsnfr cfg0erx c1b6fj3h c1hg8m62 cwhyrls c10l4oaf ckfuq95',
		);
	});

	it('can pass native attributes', () => {
		render(
			<Text aria-label="Label" id="foo">
				Copy
			</Text>,
			{ wrapper: Wrapper },
		);

		const el = getElement();

		expect(el.id).toBe('foo');
		expect(el.getAttribute('aria-label')).toBe('Label');
	});
});
