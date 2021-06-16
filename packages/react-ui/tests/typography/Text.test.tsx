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

    expect(el.className).toBe('h i j a d e k v w x c1 o1');
    expect(el.tagName).toBe('P');
    expect(getRenderedStyles('standard')).toMatchSnapshot();
  });

  it('renders size small', () => {
    render(<Text size="sm">Copy</Text>, { wrapper: Wrapper });

    expect(getElement().className).toBe('h i j a b c k v w x c1 o1');
  });

  it('renders size large', () => {
    render(<Text size="lg">Copy</Text>, { wrapper: Wrapper });

    expect(getElement().className).toBe('h i j a f g k v w x c1 o1');
  });

  it('can change element', () => {
    render(<Text as="kbd">Copy</Text>, { wrapper: Wrapper });

    expect(getElement().tagName).toBe('KBD');
  });

  it('can pass a custom class name', () => {
    render(<Text className="foo">Copy</Text>, { wrapper: Wrapper });

    expect(getElement().className).toBe('h i j a d e foo k v w x c1 o1');
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

    expect(getElement().className).toBe('h i j r1 a f g l o p q e1 i1 p1');
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
