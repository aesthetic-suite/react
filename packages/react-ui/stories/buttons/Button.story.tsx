import { BORDER_SIZES, PaletteType, PALETTE_TYPES, TEXT_SIZES } from '@aesthetic/react';
import { Button, ButtonFill, ButtonProps } from '../../src/buttons/Button';
import { Shape } from '../../src/types/shape';

export default {
	title: 'Buttons/Button',
	component: Button,
	args: {
		children: 'Button',
	},
};

export function Default(args: ButtonProps) {
	return (
		<>
			<Button {...args} /> <Button {...args} to="#" />
		</>
	);
}

Default.parameters = {
	controls: { disabled: false },
};

export function Borders() {
	return (
		<>
			<Button fill="hollow" border="sm">
				Small
			</Button>{' '}
			<Button fill="hollow" border="df">
				Default
			</Button>{' '}
			<Button fill="hollow" border="lg">
				Large
			</Button>
		</>
	);
}

export function Shapes() {
	return (
		<>
			<Button shape="sharp">Sharp</Button> <Button shape="round">Round</Button>{' '}
			<Button shape="pill">Pill</Button>
			<br />
			<br />
			<Button shape="round" border="sm" fill="hollow">
				Small round
			</Button>{' '}
			<Button shape="round" border="df" fill="hollow">
				Default round
			</Button>{' '}
			<Button shape="round" border="lg" fill="hollow">
				Large round
			</Button>
		</>
	);
}

export function Sizes() {
	return (
		<>
			<Button size="sm">Small</Button> <Button size="df">Default</Button>{' '}
			<Button size="lg">Large</Button>
		</>
	);
}

export function Fills() {
	return (
		<>
			<Button fill="solid" border="df">
				Solid
			</Button>{' '}
			<Button fill="hollow" border="df">
				Hollow
			</Button>{' '}
			<Button fill="empty" border="df">
				Empty
			</Button>
		</>
	);
}

export function Palettes() {
	return (
		<>
			{PALETTE_TYPES.map((palette) => (
				<div key={palette} style={{ paddingBottom: 8 }}>
					<Button palette={palette} fill="solid" border="df">
						Solid
					</Button>{' '}
					<Button palette={palette} fill="hollow" border="df">
						Hollow
					</Button>{' '}
					<Button palette={palette} fill="empty" border="df">
						Empty
					</Button>{' '}
					<Button palette={palette} fill="solid" border="df" disabled>
						Solid
					</Button>{' '}
					<Button palette={palette} fill="hollow" border="df" disabled>
						Hollow
					</Button>{' '}
					<Button palette={palette} fill="empty" border="df" disabled>
						Empty
					</Button>
				</div>
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
		PALETTE_TYPES.forEach((palette) => {
			TEXT_SIZES.forEach((size) => {
				(['solid', 'hollow', 'empty'] as ButtonFill[]).forEach((fill) => {
					(['sharp', 'round', 'pill'] as Shape[]).forEach((shape) => {
						if (!examples[palette]) {
							examples[palette] = [];
						}

						examples[palette]?.push(
							<span key={`${border}-${palette}-${size}-${fill}-${shape}`} style={styles}>
								<Button border={border} fill={fill} palette={palette} shape={shape} size={size}>
									Button
								</Button>
							</span>,
						);
					});
				});
			});
		});
	});

	return <>{Object.values(examples)}</>;
}
