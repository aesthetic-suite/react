/* eslint-disable jsx-a11y/anchor-is-valid, react/jsx-no-literals */

import React from 'react';
import { Text, View, ViewStyle, TextInput } from 'react-native';
import { render } from '@testing-library/react-native';
import { StyleSheet } from '@aesthetic/core';
import { createStyled } from '../src';
import { Wrapper } from './__mocks__/Button';
import { setupAestheticReact, teardownAestheticReact } from './helpers';

function extractDebug(debug: () => void): string {
  const spy = jest.spyOn(console, 'log').mockImplementationOnce(() => {});

  debug();

  const output = spy.mock.results[0].value;

  spy.mockRestore();

  return output;
}

describe('createStyled()', () => {
  beforeEach(() => {
    setupAestheticReact();
  });

  afterEach(() => {
    teardownAestheticReact();
  });

  it('errors for a non-react element type', () => {
    expect(() =>
      createStyled(
        // @ts-expect-error
        123,
        {},
      ),
    ).toThrow('Styled components must extend an HTML element or React component, found number.');
  });

  it('errors for invalid style sheet factory', () => {
    expect(() =>
      createStyled(
        View,
        // @ts-expect-error
        true,
      ),
    ).toThrow('Styled components require a style sheet factory function, found boolean.');
  });

  it('sets static properties on component', () => {
    const Button = createStyled(View, {});

    expect(Button.displayName).toBe('styled(View)');
    expect(Button.styleSheet).toBeInstanceOf(StyleSheet);

    const ComposedButton = createStyled(Button, {});

    expect(ComposedButton.displayName).toBe('styled(styled(View))');
    expect(ComposedButton.styleSheet).toBeInstanceOf(StyleSheet);
  });

  it('creates and renders a button with defined styles', () => {
    const Button = createStyled(View, () => ({
      display: 'flex',
      textAlign: 'center',
      padding: '1rem',
    }));

    const { debug } = render(
      <Button>
        <Text>Test</Text>
      </Button>,
      {
        wrapper: Wrapper,
      },
    );

    expect(extractDebug(debug)).toMatchSnapshot();
  });

  it('only renders styles twice (create and mount), even when component rerenders', () => {
    const spy = jest.fn(
      () =>
        ({
          fontWeight: 'bold',
        } as const),
    );

    const Link = createStyled(Text, spy);
    const cb = () => {};

    const { debug, update } = render(<Link onPress={cb}>Test</Link>, {
      wrapper: Wrapper,
    });

    update(<Link onPress={cb}>Test</Link>);
    update(<Link onPress={cb}>Test</Link>);
    update(<Link onPress={cb}>Test</Link>);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(extractDebug(debug)).toMatchSnapshot();
  });

  it('can pass custom props/attributes', () => {
    const Input = createStyled(TextInput, {
      borderWidth: 1,
      borderColor: 'black',
      padding: '1rem',
    });

    const { debug } = render(
      <Input editable={false} placeholder="Search..." style={{ borderStyle: 'solid' }} />,
      {
        wrapper: Wrapper,
      },
    );

    expect(extractDebug(debug)).toMatchSnapshot();
  });

  describe('variants', () => {
    interface AlertProps {
      palette?: 'success' | 'failure' | 'warning';
    }

    function createAlert() {
      return createStyled<typeof View, AlertProps>(View, (css) => ({
        backgroundColor: css.tokens.palette.neutral.bg.base,
        '@variants': {
          palette: {
            success: {
              backgroundColor: css.tokens.palette.success.bg.base,
            },
            failure: {
              backgroundColor: css.tokens.palette.failure.bg.base,
            },
            warning: {
              backgroundColor: css.tokens.palette.warning.bg.base,
            },
          },
        },
      }));
    }

    it('supports variants', () => {
      const Alert = createAlert();
      const children = <Text>Title and other content!</Text>;

      const { debug, update } = render(<Alert palette="success">{children}</Alert>, {
        wrapper: Wrapper,
      });

      expect(extractDebug(debug)).toMatchSnapshot();

      update(<Alert palette="failure">{children}</Alert>);

      expect(extractDebug(debug)).toMatchSnapshot();

      update(<Alert>{children}</Alert>);

      expect(extractDebug(debug)).toMatchSnapshot();
    });

    it('doesnt pass the variant prop to the HTML element', () => {
      const Alert = createAlert();

      const { debug } = render(<Alert palette="success" />, {
        wrapper: Wrapper,
      });

      expect(extractDebug(debug)).toMatchSnapshot();
    });

    it('inherits and merges variant props and types when composing', () => {
      const Alert = createAlert();

      const SubAlert = createStyled<typeof Alert, { size?: 'sm' | 'lg' }>(Alert, {
        '@variants': {
          size: {
            sm: { padding: 1 },
            lg: { padding: 2 },
          },
        },
      });

      const { debug } = render(<SubAlert palette="success" size="lg" />, {
        wrapper: Wrapper,
      });

      expect(extractDebug(debug)).toMatchSnapshot();
    });
  });

  describe('composition', () => {
    it('supports extending non-styled components', () => {
      function Base({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
        return <View style={style}>{children}</View>;
      }

      const Button = createStyled(Base, () => ({
        display: 'flex',
        textAlign: 'center',
        padding: '1rem',
      }));

      const { debug } = render(<Button style={{ color: 'red' }}>Normal</Button>, {
        wrapper: Wrapper,
      });

      expect(extractDebug(debug)).toMatchSnapshot();
    });

    it('supports extending other styled components', () => {
      const Button = createStyled(View, () => ({
        display: 'flex',
        textAlign: 'center',
        padding: '1rem',
      }));

      const BlockButton = createStyled(Button, {
        display: 'flex',
        width: '100%',
      });

      const LargeBlockButton = createStyled(BlockButton, {
        padding: '2rem',
        fontSize: 18,
      });

      const { debug } = render(
        <>
          <Button>Normal</Button>
          <BlockButton>Block</BlockButton>
          <LargeBlockButton>Large</LargeBlockButton>
        </>,
        {
          wrapper: Wrapper,
        },
      );

      expect(extractDebug(debug)).toMatchSnapshot();
    });

    it('can access the ref from multiple layers of composition', () => {
      const Leaf = createStyled(View, {});
      const Branch = createStyled(Leaf, {});
      const Trunk = createStyled(Branch, {});
      const Root = createStyled(Trunk, {});

      const ref = { ref: true };
      const spy = jest.fn();
      // @ts-expect-error
      const { debug } = render(<Root ref={spy} />, {
        createNodeMock: () => ref,
        wrapper: Wrapper,
      });

      expect(spy).toHaveBeenCalledWith(ref);
      expect(extractDebug(debug)).toMatchSnapshot();
    });
  });
});
