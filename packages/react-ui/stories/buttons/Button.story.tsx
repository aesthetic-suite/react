import { PALETTE_TYPES } from '@aesthetic/react';
import { Button, ButtonProps } from '../../src/buttons/Button';

export default {
	title: 'Buttons/Button',
	component: Button,
	args: {
		children: 'Button',
	},
};

export function Default(args: ButtonProps) {
	return <Button {...args} />;
}

Default.parameters = {
	controls: { disabled: false },
};

export function Sizes() {
	return (
		<>
			<Button size="sm">Small</Button> <Button size="df">Default</Button>{' '}
			<Button size="lg">Large</Button>
		</>
	);
}

export function States() {
	return (
		<>
			<Button>Default</Button> <Button className="is-focused">Focused</Button>{' '}
			<Button className="is-selected">Selected</Button>{' '}
			<Button className="is-hovered">Hovered</Button>{' '}
			<Button className="is-disabled" disabled>
				Disabled
			</Button>
		</>
	);
}

export function Palettes() {
	return (
		<>
			{PALETTE_TYPES.map((palette) => (
				<div key={palette} style={{ paddingBottom: 8 }}>
					<Button palette={palette} fill="solid" border="lg">
						Solid
					</Button>{' '}
					<Button palette={palette} fill="hollow" border="df">
						Hollow
					</Button>{' '}
					<Button palette={palette} fill="empty" border="lg">
						Empty
					</Button>
				</div>
			))}
		</>
	);
}
