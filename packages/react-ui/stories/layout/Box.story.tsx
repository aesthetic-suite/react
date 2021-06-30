import { Box, BoxProps } from '../../src/layout/Box';
import styles from './Box.module.css';

const children = 'Lorem ipsum dolor sit amet.';

export default {
	title: 'Layout/Box',
	component: Box,
	args: {
		children,
		spacing: 'df',
	},
};

const props = { className: String(styles.parent), spacing: 'df' } as const;
const parentProps = { className: String(styles.parent), spacing: 'sm' } as const;
const childProps = { className: String(styles.child), spacing: 'df' } as const;

export function Default(args: BoxProps) {
	return <Box {...props} {...args} />;
}

Default.parameters = {
	controls: { disabled: false },
};

function Children() {
	return (
		<>
			<Box {...childProps}>Child 1</Box>
			<Box {...childProps}>
				Large
				<br />
				Child 2
			</Box>
			<Box {...childProps}>Child 3</Box>
		</>
	);
}

export function AlignItems() {
	return (
		<>
			<Box {...parentProps} alignItems="flex-start">
				<Children />
			</Box>

			<Box {...parentProps} alignItems="center">
				<Children />
			</Box>

			<Box {...parentProps} alignItems="stretch">
				<Children />
			</Box>

			<Box {...parentProps} alignItems="flex-end">
				<Children />
			</Box>
		</>
	);
}

export function Direction() {
	return (
		<>
			<Box {...parentProps} direction="column">
				<Children />
			</Box>

			<Box {...parentProps} direction="column-reverse">
				<Children />
			</Box>

			<Box {...parentProps} direction="row">
				<Children />
			</Box>

			<Box {...parentProps} direction="row-reverse">
				<Children />
			</Box>
		</>
	);
}

export function Grow() {
	return (
		<Box {...parentProps}>
			<Box {...childProps} grow={3}>
				Child 1
			</Box>
			<Box {...childProps} grow={1}>
				Child 2
			</Box>
			<Box {...childProps} grow={1}>
				Child 3
			</Box>
		</Box>
	);
}

export function JustifyContent() {
	return (
		<>
			<Box {...parentProps} justifyContent="flex-start">
				<Children />
			</Box>

			<Box {...parentProps} justifyContent="center">
				<Children />
			</Box>

			<Box {...parentProps} justifyContent="space-between">
				<Children />
			</Box>

			<Box {...parentProps} justifyContent="flex-end">
				<Children />
			</Box>
		</>
	);
}

export function Shadows() {
	return (
		<>
			<Box {...props} shadow="xs">
				Extra small. {children}
			</Box>

			<br />

			<Box {...props} shadow="sm">
				Small. {children}
			</Box>

			<br />

			<Box {...props} shadow="md">
				Medium. {children}
			</Box>

			<br />

			<Box {...props} shadow="lg">
				Large. {children}
			</Box>

			<br />

			<Box {...props} shadow="xl">
				Extra large. {children}
			</Box>
		</>
	);
}

export function Shrink() {
	return (
		<Box {...parentProps}>
			<Box {...childProps} grow={1} shrink={1}>
				Child 1, with some really really long content that should force elements to shift.
			</Box>
			<Box {...childProps} grow={1} shrink={3}>
				Child 2, with some really really long content that should force elements to shift.
			</Box>
			<Box {...childProps} grow={1} shrink={2}>
				Child 3, with some really really long content that should force elements to shift.
			</Box>
		</Box>
	);
}
