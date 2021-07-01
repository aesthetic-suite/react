import { Box } from '../../src/layout/Box';
import { Inline, InlineProps } from '../../src/layout/Inline';
import styles from './Box.module.css';

export default {
	title: 'Layout/Inline',
	component: Inline,
	args: {},
};

const itemProps = { className: String(styles.item), spacing: 'df' } as const;

export function Default(args: InlineProps) {
	return (
		<Inline {...args}>
			<Box {...itemProps}>Item 1</Box>
			<Box {...itemProps}>
				Large
				<br />
				Item 2
			</Box>
			<Box {...itemProps}>Item 3</Box>
		</Inline>
	);
}

Default.parameters = {
	controls: { disabled: false },
};

export function Gap() {
	return (
		<Inline as="section" gap="lg">
			<Box {...itemProps}>Item 1</Box>
			<Box {...itemProps}>
				Large
				<br />
				Item 2
			</Box>
			<Box {...itemProps}>Item 3</Box>
		</Inline>
	);
}

export function Reversed() {
	return (
		<Inline reversed>
			<Box {...itemProps}>Item 1</Box>
			<Box {...itemProps}>
				Large
				<br />
				Item 2
			</Box>
			<Box {...itemProps}>Item 3</Box>
		</Inline>
	);
}
