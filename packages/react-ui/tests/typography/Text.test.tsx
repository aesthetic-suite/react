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

		expect(el.className).toBe('h i j k v w x c1 o1 a d e');
		expect(el.tagName).toBe('P');
		expect(getRenderedStyles('standard')).toMatchSnapshot();
	});

	it('renders size small', () => {
		render(<Text size="sm">Copy</Text>, { wrapper: Wrapper });

		expect(getElement().className).toBe('h i j k v w x c1 o1 a b c');
	});

	it('renders size large', () => {
		render(<Text size="lg">Copy</Text>, { wrapper: Wrapper });

		expect(getElement().className).toBe('h i j k v w x c1 o1 a f g');
	});

	it('can change element', () => {
		render(<Text as="kbd">Copy</Text>, { wrapper: Wrapper });

		expect(getElement().tagName).toBe('KBD');
	});

	it('can pass a custom class name', () => {
		render(<Text className="foo">Copy</Text>, { wrapper: Wrapper });

		expect(getElement().className).toBe('h i j k v w x c1 o1 a d e foo');
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

		expect(getElement().className).toBe('h i j l o p q e1 i1 p1 r1 a f g');
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
