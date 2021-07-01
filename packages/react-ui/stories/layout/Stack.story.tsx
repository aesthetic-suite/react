import { Box } from '../../src/layout/Box';
import { Stack, StackProps } from '../../src/layout/Stack';
import styles from './Box.module.css';

export default {
	title: 'Layout/Stack',
	component: Stack,
	args: {},
};

const itemProps = { className: String(styles.item), spacing: 'df' } as const;

export function Default(args: StackProps) {
	return (
		<Stack {...args}>
			<Box {...itemProps}>Item 1</Box>
			<Box {...itemProps}>
				Large
				<br />
				Item 2
			</Box>
			<Box {...itemProps}>Item 3</Box>
		</Stack>
	);
}

Default.parameters = {
	controls: { disabled: false },
};

export function Gap() {
	return (
		<Stack as="section" gap="lg">
			<Box {...itemProps}>Item 1</Box>
			<Box {...itemProps}>
				Large
				<br />
				Item 2
			</Box>
			<Box {...itemProps}>Item 3</Box>
		</Stack>
	);
}

export function Reversed() {
	return (
		<Stack reversed>
			<Box {...itemProps}>Item 1</Box>
			<Box {...itemProps}>
				Large
				<br />
				Item 2
			</Box>
			<Box {...itemProps}>Item 3</Box>
		</Stack>
	);
}
