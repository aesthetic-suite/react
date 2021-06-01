import { Heading, HeadingProps } from '../../src/typography/Heading';

const children = 'Lorem ipsum dolor sit amet.';

export default {
  title: 'Typography/Heading',
  component: Heading,
  args: {
    children,
    level: 1,
  },
};

export function Default(args: HeadingProps) {
  return <Heading {...args} />;
}

Default.parameters = {
  controls: { disabled: false },
};

export function Alignment() {
  return (
    <div>
      <Heading align="start" level={3}>
        Start: {children}
      </Heading>
      <br />
      <Heading align="center" level={3}>
        Center: {children}
      </Heading>
      <br />
      <Heading align="end" level={3}>
        End: {children}
      </Heading>
      <br />
      <Heading align="justify" level={3}>
        Justify: {children} {children}
      </Heading>
    </div>
  );
}

export function Overflow() {
  return (
    <div style={{ width: 400 }}>
      <Heading level={3} overflow="break">
        Break: {children} Reallylongwordwithoutanyspaces.
      </Heading>
      <br />
      <Heading level={3} overflow="clip">
        Clip: {children}
      </Heading>
      <br />
      <Heading level={3} overflow="truncate">
        Truncate: {children}
      </Heading>
      <br />
      <Heading level={3} overflow="wrap">
        Wrap (default): {children} Reallylongwordwithoutanyspaces.
      </Heading>
    </div>
  );
}

export function Palette() {
  return (
    <>
      <Heading level={3} palette="neutral">
        Neutral (default): {children}
      </Heading>
      <Heading level={3} palette="brand">
        Brand: {children}
      </Heading>
      <Heading level={3} palette="primary">
        Primary: {children}
      </Heading>
      <Heading level={3} palette="secondary">
        Secondary: {children}
      </Heading>
      <Heading level={3} palette="tertiary">
        Tertiary: {children}
      </Heading>
      <Heading level={3} palette="muted">
        Muted: {children}
      </Heading>
      <Heading level={3} palette="positive">
        Positive: {children}
      </Heading>
      <Heading level={3} palette="negative">
        Negative: {children}
      </Heading>
      <Heading level={3} palette="danger">
        Danger: {children}
      </Heading>
      <Heading level={3} palette="warning">
        Warning: {children}
      </Heading>
    </>
  );
}

export function Levels() {
  return (
    <>
      <Heading level={1}>L1: {children}</Heading>
      <br />
      <Heading level={2}>L2: {children}</Heading>
      <br />
      <Heading level={3}>L3: {children}</Heading>
      <br />
      <Heading level={4}>L4: {children}</Heading>
      <br />
      <Heading level={5}>L5: {children}</Heading>
      <br />
      <Heading level={6}>L6: {children}</Heading>
    </>
  );
}

export function Transforms() {
  return (
    <>
      <Heading level={3} transform="capitalize">
        Capitalize: {children}
      </Heading>
      <br />
      <Heading level={3} transform="lowercase">
        Lowercase: {children}
      </Heading>
      <br />
      <Heading level={3} transform="uppercase">
        Uppercase: {children}
      </Heading>
    </>
  );
}

export function Weights() {
  return (
    <>
      <Heading level={3} weight="thin">
        Thin: {children}
      </Heading>
      <br />
      <Heading level={3} weight="light">
        Light: {children}
      </Heading>
      <br />
      <Heading level={3} weight="normal">
        Normal (default): {children}
      </Heading>
      <br />
      <Heading level={3} weight="bold">
        Bold: {children}
      </Heading>
      <br />
      <Heading level={3} weight="black">
        Black: {children}
      </Heading>
      <br />
      <Heading level={3}>
        This string of text is using{' '}
        <em>
          <strong>native HTML</strong>
        </em>{' '}
        elements for <i>italics</i> and <b>bolding</b>.
      </Heading>
    </>
  );
}
