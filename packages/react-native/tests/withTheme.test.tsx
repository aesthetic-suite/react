import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { InternalWithThemeWrappedProps, NativeRule, ThemeProvider, withTheme } from '../src';
import { dawnTheme, setupAestheticReact, teardownAestheticReact, twilightTheme } from './helpers';

describe('withTheme()', () => {
	beforeEach(() => {
		setupAestheticReact();
	});

	afterEach(() => {
		teardownAestheticReact();
	});

	function BaseComponent(props: InternalWithThemeWrappedProps<NativeRule>) {
		return null;
	}

	function WrappingComponent({ children }: { children?: React.ReactNode }) {
		return <ThemeProvider name="dawn">{children ?? <View />}</ThemeProvider>;
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
			return <View />;
		}

		const Wrapped = withTheme()(ThemeComponent);
		const result = render(<Wrapped />, { wrapper: WrappingComponent });

		expect(result.UNSAFE_getByType(ThemeComponent).props.theme).toEqual(dawnTheme);
	});

	it('can bubble up the ref with `wrappedRef`', () => {
		interface RefProps {
			unknown?: boolean;
		}

		// eslint-disable-next-line react/prefer-stateless-function
		class RefComponent extends React.Component<
			InternalWithThemeWrappedProps<NativeRule> & RefProps
		> {
			override render() {
				return <View />;
			}
		}

		let foundRef: Function | null = null;
		const Wrapped = withTheme()(RefComponent);

		render(
			<Wrapped
				wrappedRef={(ref: Function | null) => {
					foundRef = ref;
				}}
			/>,
			{ wrapper: WrappingComponent },
		);

		expect(foundRef).not.toBeNull();
		expect(foundRef!.constructor.name).toBe('RefComponent');
	});

	it('returns new theme if theme context changes', () => {
		const Wrapped = withTheme()(BaseComponent);
		const result = render(
			<ThemeProvider name="dawn">
				<Wrapped />
			</ThemeProvider>,
		);

		expect(result.UNSAFE_getByType(BaseComponent).props.theme).toEqual(dawnTheme);

		result.update(
			<ThemeProvider name="twilight">
				<Wrapped />
			</ThemeProvider>,
		);

		expect(result.UNSAFE_getByType(BaseComponent).props.theme).toEqual(twilightTheme);
	});
});
