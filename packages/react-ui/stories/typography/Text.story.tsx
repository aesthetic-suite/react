import { Text, TextProps } from '../../src/typography/Text';

const children = 'Lorem ipsum dolor sit amet.';

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    children,
  },
};

export function Default(args: TextProps) {
  return <Text {...args} />;
}

Default.parameters = {
  controls: { disabled: false },
};

export function Alignment() {
  return (
    <div style={{ width: 325 }}>
      <Text align="start">Start: {children}</Text>
      <br />
      <Text align="center">Center: {children}</Text>
      <br />
      <Text align="end">End: {children}</Text>
      <br />
      <Text align="justify">
        Justify: {children} {children}
      </Text>
    </div>
  );
}

export function Monospaced() {
  return (
    <>
      <Text>Default: {children}</Text>
      <br />
      <Text monospaced>Monospaced: {children}</Text>
    </>
  );
}

export function Overflow() {
  return (
    <div style={{ width: 160 }}>
      <Text overflow="break">Break: {children} Reallylongwordwithoutanyspaces.</Text>
      <br />
      <Text overflow="clip">Clip: {children}</Text>
      <br />
      <Text overflow="truncate">Truncate: {children}</Text>
      <br />
      <Text overflow="wrap">Wrap (default): {children} Reallylongwordwithoutanyspaces.</Text>
    </div>
  );
}

export function Palette() {
  return (
    <>
      <Text palette="neutral">Neutral (default): {children}</Text>
      <Text palette="brand">Brand: {children}</Text>
      <Text palette="primary">Primary: {children}</Text>
      <Text palette="secondary">Secondary: {children}</Text>
      <Text palette="tertiary">Tertiary: {children}</Text>
      <Text palette="muted">Muted: {children}</Text>
      <Text palette="positive">Positive: {children}</Text>
      <Text palette="negative">Negative: {children}</Text>
      <Text palette="danger">Danger: {children}</Text>
      <Text palette="warning">Warning: {children}</Text>
    </>
  );
}

export function Sizes() {
  return (
    <>
      <Text size="sm">Small: {children}</Text>
      <br />
      <Text size="df">Default: {children}</Text>
      <br />
      <Text size="lg">Large: {children}</Text>
    </>
  );
}

export function Transforms() {
  return (
    <>
      <Text transform="capitalize">Capitalize: {children}</Text>
      <br />
      <Text transform="lowercase">Lowercase: {children}</Text>
      <br />
      <Text transform="uppercase">Uppercase: {children}</Text>
    </>
  );
}

export function Weights() {
  return (
    <>
      <Text weight="thin">Thin: {children}</Text>
      <br />
      <Text weight="light">Light: {children}</Text>
      <br />
      <Text weight="normal">Normal (default): {children}</Text>
      <br />
      <Text weight="bold">Bold: {children}</Text>
      <br />
      <Text weight="black">Black: {children}</Text>
      <br />
      <Text>
        This string of text is using{' '}
        <em>
          <strong>native HTML</strong>
        </em>{' '}
        elements for <i>italics</i> and <b>bolding</b>.
      </Text>
    </>
  );
}
