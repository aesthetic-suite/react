import { BORDER_SIZES, PaletteType, TEXT_SIZES } from '@aesthetic/react';
import { Input, InputProps } from '../../src/inputs/Input';
import { Shape } from '../../src/types/shape';
import { Inline } from '../../src/layout/Inline';

const INPUT_PALETTES: InputProps['palette'][] = ['negative', 'positive', 'primary', 'warning'];

export default {
	title: 'Inputs/Input',
	component: Input,
	args: {
		border: 'df',
		placeholder: 'Placeholder',
	},
};

export function Default(args: InputProps) {
	return (
		<>
			<Input {...args} />
		</>
	);
}

Default.parameters = {
	controls: { disabled: false },
};

export function Borders() {
	return (
		<>
			<Input border="sm" placeholder="Small" />
			<br />
			<Input border="df" placeholder="Default" />
			<br />
			<Input border="lg" placeholder="Large" />
		</>
	);
}

export function Shapes() {
	return (
		<>
			<Input shape="sharp" placeholder="Sharp" />
			<br />
			<Input shape="round" placeholder="Round" />
			<br />
			<Input shape="pill" placeholder="Pill" />
		</>
	);
}

export function Sizes() {
	return (
		<>
			<Input size="sm" placeholder="Small" />
			<br />
			<Input size="df" placeholder="Default" />
			<br />
			<Input size="lg" placeholder="Large" />
		</>
	);
}

export function Palettes() {
	return (
		<>
			{INPUT_PALETTES.map((palette) => (
				<Inline key={palette} spacingBottom={2} gap={1}>
					<Input palette={palette} border="df" placeholder={palette} />
					<Input palette={palette} border="df" placeholder={`${palette} (disabled)`} disabled />
				</Inline>
			))}
		</>
	);
}

export function Variants() {
	const examples: Partial<Record<PaletteType, React.ReactElement[]>> = {};
	const styles = {
		display: 'inline-block',
		paddingBottom: 4,
		paddingRight: 4,
	};

	BORDER_SIZES.forEach((border) => {
		INPUT_PALETTES.forEach((palette) => {
			TEXT_SIZES.forEach((size) => {
				(['sharp', 'round', 'pill'] as Shape[]).forEach((shape) => {
					if (!examples[palette]) {
						examples[palette] = [];
					}

					examples[palette]?.push(
						<span key={`${border}-${palette}-${size}-${shape}`} style={styles}>
							<Input
								border={border}
								palette={palette}
								shape={shape}
								size={size}
								placeholder="Placeholder"
							/>
						</span>,
					);
				});
			});
		});
	});

	return <>{Object.values(examples)}</>;
}
