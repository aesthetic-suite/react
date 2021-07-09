import { BORDER_SIZES, PaletteType, TEXT_SIZES } from '@aesthetic/react';
import { Select, SelectProps } from '../../src/inputs/Select';
import { Shape } from '../../src/types/shape';
import { Inline } from '../../src/layout/Inline';

const INPUT_PALETTES: SelectProps['palette'][] = ['negative', 'positive', 'primary', 'warning'];

const options = (
	<>
		<option value="foo">Foo</option>
		<option value="bar">Bar</option>
		<option value="baz">Baz</option>
	</>
);

export default {
	title: 'Inputs/Select',
	component: Select,
	args: {
		border: 'df',
	},
};

export function Default(args: SelectProps) {
	return (
		<>
			<Select {...args}>{options}</Select>
		</>
	);
}

Default.parameters = {
	controls: { disabled: false },
};

export function Borders() {
	return (
		<>
			<Select border="sm">
				<option value="">Small</option>
				{options}
			</Select>
			<br />
			<Select border="df">
				<option value="">Default</option>
				{options}
			</Select>
			<br />
			<Select border="lg">
				<option value="">Large</option>
				{options}
			</Select>
		</>
	);
}

export function Shapes() {
	return (
		<>
			<Select shape="sharp">
				<option value="">Sharp</option>
				{options}
			</Select>
			<br />
			<Select shape="round">
				<option value="">Round</option>
				{options}
			</Select>
			<br />
			<Select shape="pill">
				<option value="">Pill</option>
				{options}
			</Select>
		</>
	);
}

export function Sizes() {
	return (
		<>
			<Select size="sm">
				<option value="">Small</option>
				{options}
			</Select>
			<br />
			<Select size="df">
				<option value="">Default</option>
				{options}
			</Select>
			<br />
			<Select size="lg">
				<option value="">Large</option>
				{options}
			</Select>
		</>
	);
}

export function Palettes() {
	return (
		<>
			{INPUT_PALETTES.map((palette) => (
				<Inline key={palette} spacingBottom={2} gap={1}>
					<Select palette={palette} border="df">
						<option value="">{palette}</option>
						{options}
					</Select>
					<Select palette={palette} border="df" disabled>
						<option value="">{`${palette} (disabled)`}</option>
						{options}
					</Select>
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
							<Select border={border} palette={palette} shape={shape} size={size}>
								<option value="">Placeholder</option>
								{options}
							</Select>
						</span>,
					);
				});
			});
		});
	});

	return <>{Object.values(examples)}</>;
}
