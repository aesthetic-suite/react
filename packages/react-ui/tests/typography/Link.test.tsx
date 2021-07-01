import React from 'react';
import { render, screen } from '@testing-library/react';
import { Link } from '../../src/typography/Link';
import { Text } from '../../src/typography/Text';
import {
	getRenderedStyles,
	withAccessibility,
	withEnvironment,
	withStyles,
	Wrapper,
	WrapperProps,
} from '../helpers';

function getElement() {
	return screen.getByText('Copy') as HTMLParagraphElement;
}

function LinkWrapper({ children }: WrapperProps) {
	return (
		<Wrapper>
			<Text>{children ?? <div />}</Text>
		</Wrapper>
	);
}

describe('Link', () => {
	it('errors if not wrapped in typography', () => {
		const spy = jest.spyOn(console, 'error').mockImplementation();

		expect(() => {
			render(<Link>Copy</Link>, { wrapper: Wrapper });
		}).toThrow('`Link` component must be rendered within a `Text` or `Heading` component.');

		spy.mockRestore();
	});

	it(
		'doesnt error if not wrapped in typography when in production',
		withEnvironment('production', () => {
			const spy = jest.spyOn(console, 'error').mockImplementation();

			expect(() => {
				render(<Link>Copy</Link>, { wrapper: Wrapper });
			}).not.toThrow();

			spy.mockRestore();
		}),
	);

	it('renders the link', () => {
		render(<Link>Copy</Link>, { wrapper: LinkWrapper });

		expect(getElement().className).toBe(
			'typography variant:palette:primary variant:weight:normal link',
		);
	});

	it(
		'renders the link styles',
		withStyles(() => {
			render(<Link>Copy</Link>, { wrapper: LinkWrapper });

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);

	it(
		'passes accessibility',
		withAccessibility(async (axe) => {
			const { container } = render(<Link>Copy</Link>, { wrapper: LinkWrapper });

			expect(await axe(container)).toHaveNoViolations();
		}),
	);

	it('renders an `button` by default', () => {
		render(<Link>Copy</Link>, { wrapper: LinkWrapper });

		expect(getElement().tagName).toBe('BUTTON');
	});

	it('renders an `a` when linking', () => {
		render(<Link to="/">Copy</Link>, { wrapper: LinkWrapper });

		expect(getElement().tagName).toBe('A');
	});

	it('can pass a custom class name', () => {
		render(<Link className="foobar">Copy</Link>, { wrapper: LinkWrapper });

		expect(getElement().className).toEqual(expect.stringContaining('foobar'));
	});

	it('can change all props', () => {
		render(
			<Link palette="danger" transform="capitalize" weight="bold">
				Copy
			</Link>,
			{ wrapper: LinkWrapper },
		);

		expect(getElement().className).toBe(
			'typography variant:palette:danger variant:transform:capitalize variant:weight:bold link',
		);
	});

	it('can pass native attributes', () => {
		render(
			<Link aria-label="Label" id="foo">
				Copy
			</Link>,
			{ wrapper: LinkWrapper },
		);

		const el = getElement();

		expect(el.id).toBe('foo');
		expect(el.getAttribute('aria-label')).toBe('Label');
	});
});
