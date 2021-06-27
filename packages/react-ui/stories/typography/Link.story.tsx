import { Link, LinkProps } from '../../src/typography/Link';
import { Text } from '../../src/typography/Text';

const children = 'Click here';

export default {
	title: 'Typography/Link',
	component: Link,
	args: {
		children,
	},
};

export function Default(args: LinkProps) {
	return (
		<Text>
			<Link {...args} /> <Link {...args} to="#" />
		</Text>
	);
}

Default.parameters = {
	controls: { disabled: false },
};

export function Palettes() {
	return (
		<Text>
			<Link palette="neutral">Neutral (default): {children}</Link>
			<br />
			<Link palette="brand">Brand: {children}</Link>
			<br />
			<Link palette="primary">Primary: {children}</Link>
			<br />
			<Link palette="secondary">Secondary: {children}</Link>
			<br />
			<Link palette="tertiary">Tertiary: {children}</Link>
			<br />
			<Link palette="muted">Muted: {children}</Link>
			<br />
			<Link palette="positive">Positive: {children}</Link>
			<br />
			<Link palette="negative">Negative: {children}</Link>
			<br />
			<Link palette="danger">Danger: {children}</Link>
			<br />
			<Link palette="warning">Warning: {children}</Link>
		</Text>
	);
}

export function Transforms() {
	return (
		<Text>
			<Link transform="capitalize">Capitalize: {children}</Link>
			<br />
			<Link transform="lowercase">Lowercase: {children}</Link>
			<br />
			<Link transform="uppercase">Uppercase: {children}</Link>
		</Text>
	);
}

export function Weights() {
	return (
		<Text>
			<Link weight="thin">Thin: {children}</Link>
			<br />
			<Link weight="light">Light: {children}</Link>
			<br />
			<Link weight="normal">Normal (default): {children}</Link>
			<br />
			<Link weight="bold">Bold: {children}</Link>
			<br />
			<Link weight="black">Black: {children}</Link>
			<br />
			<Link>
				This string of text is using{' '}
				<em>
					<strong>native HTML</strong>
				</em>{' '}
				elements for <i>italics</i> and <b>bolding</b>.
			</Link>
		</Text>
	);
}
