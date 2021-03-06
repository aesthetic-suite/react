import React from 'react';
import { render } from 'rut-dom';
import {
	InternalWithThemeWrappedProps,
	Rule,
	ThemeProvider,
	ThemeProviderProps,
	withTheme,
} from '../src';
import { dawnTheme, setupAestheticReact, teardownAestheticReact, twilightTheme } from './helpers';

describe('withTheme()', () => {
	beforeEach(() => {
		setupAestheticReact();
	});

	afterEach(() => {
		teardownAestheticReact();
	});

	function BaseComponent(props: InternalWithThemeWrappedProps<Rule>) {
		return null;
	}

	function WrappingComponent({ children }: { children?: React.ReactNode }) {
		return <ThemeProvider name="dawn">{children ?? <div />}</ThemeProvider>;
	}

	it('inherits name from component `constructor.name`', () => {
		const Wrapped = withTheme()(BaseComponent);

		expect(Wrapped.displayName).toBe('withTheme(BaseComponent)');
	});

	it('inherits name from component `displayName`', () => {
		function DisplayComponent() {
			return null;
		}

		DisplayComponent.displayName = 'CustomDisplayName';

		const Wrapped = withTheme()(DisplayComponent);

		expect(Wrapped.displayName).toBe('withTheme(CustomDisplayName)');
	});

	it('stores the original component as a static property', () => {
		const Wrapped = withTheme()(BaseComponent);

		expect(Wrapped.WrappedComponent).toBe(BaseComponent);
	});

	it('receives theme from provider', () => {
		function ThemeComponent(props: { theme?: {} }) {
			return <div />;
		}

		const Wrapped = withTheme()(ThemeComponent);
		const { root } = render<{}>(<Wrapped />, { wrapper: <WrappingComponent /> });

		expect(root.findOne(ThemeComponent)).toHaveProp('theme', dawnTheme);
	});

	it('can bubble up the ref with `wrappedRef`', () => {
		interface RefProps {
			unknown?: boolean;
		}

		// eslint-disable-next-line react/prefer-stateless-function
		class RefComponent extends React.Component<InternalWithThemeWrappedProps<Rule> & RefProps> {
			override render() {
				return <div />;
			}
		}

		let foundRef: Function | null = null;
		const Wrapped = withTheme()(RefComponent);

		render<{}>(
			<Wrapped
				wrappedRef={(ref: Function | null) => {
					foundRef = ref;
				}}
			/>,
			{ wrapper: <WrappingComponent /> },
		);

		expect(foundRef).not.toBeNull();
		expect(foundRef!.constructor.name).toBe('RefComponent');
	});

	it('returns new theme if theme context changes', () => {
		const Wrapped = withTheme()(BaseComponent);
		const { root, update } = render<ThemeProviderProps>(
			<ThemeProvider name="dawn">
				<Wrapped />
			</ThemeProvider>,
		);

		expect(root.findOne(BaseComponent)).toHaveProp('theme', dawnTheme);

		update({ name: 'twilight' });

		expect(root.findOne(BaseComponent)).toHaveProp('theme', twilightTheme);
	});
});
