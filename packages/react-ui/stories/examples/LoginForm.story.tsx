import { Button } from '../../src/buttons/Button';
import { Input } from '../../src/inputs/Input';
import { Inline } from '../../src/layout/Inline';
import { Stack } from '../../src/layout/Stack';
import { Text } from '../../src/typography/Text';

export default {
	title: 'Examples/Login Form',
};

export function Example() {
	return (
		<div style={{ width: 300, margin: 'auto' }}>
			<Stack gap={2}>
				<div>
					<label htmlFor="email">
						<Text as="span" size="sm" weight="bold" transform="uppercase">
							Email
						</Text>
					</label>
					<Input type="text" name="email" id="email" />
				</div>

				<div>
					<label htmlFor="password">
						<Text as="span" size="sm" weight="bold" transform="uppercase">
							Password
						</Text>
					</label>
					<Input type="password" name="password" id="password" />
				</div>

				<Inline gap={1} spacingTop={1}>
					<Button fluid palette="primary">
						Login
					</Button>

					<Button fluid palette="neutral" fill="hollow">
						Cancel
					</Button>
				</Inline>
			</Stack>
		</div>
	);
}
