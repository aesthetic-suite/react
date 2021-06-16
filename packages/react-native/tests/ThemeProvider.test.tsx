/* eslint-disable react/jsx-no-literals */

import React from 'react';
import { View } from 'react-native';
import { OnChangeTheme } from '@aesthetic/core';
import { act, render } from '@testing-library/react-native';
import { ThemeProvider, useTheme } from '../src';
import { aesthetic } from '../src/aesthetic';
import { dawnTheme, setupAestheticReact, teardownAestheticReact, twilightTheme } from './helpers';

describe('ThemeProvider', () => {
	beforeEach(() => {
		setupAestheticReact();
	});

	afterEach(() => {
		teardownAestheticReact();
	});

	it('renders children', () => {
		const result = render(
			<ThemeProvider>
				<View>1</View>
				<View>2</View>
				<View>3</View>
			</ThemeProvider>,
		);

		expect(result.UNSAFE_getAllByType(View)).toHaveLength(3);
	});

	it('doesnt re-render children if props never change', () => {
		let count = 0;

		function Child() {
			count += 1;

			return null;
		}

		const child = <Child />;
		const result = render(<ThemeProvider>{child}</ThemeProvider>);

		result.update(<ThemeProvider>{child}</ThemeProvider>);
		result.update(<ThemeProvider>{child}</ThemeProvider>);
		result.update(<ThemeProvider>{child}</ThemeProvider>);

		expect(count).toBe(1);
	});

	it('provides preferred or default theme', () => {
		expect.assertions(1);

		function Test() {
			const theme = useTheme();

			expect(theme).toBe(dawnTheme);

			return null;
		}

		render(
			<ThemeProvider>
				<Test />
			</ThemeProvider>,
		);
	});

	it('provides explicit theme by name', () => {
		expect.assertions(1);

		function Test() {
			const theme = useTheme();

			expect(theme).toBe(dawnTheme);

			return null;
		}

		render(
			<ThemeProvider name="dawn">
				<Test />
			</ThemeProvider>,
		);
	});

	it('calls `changeTheme` when `name` changes', () => {
		const spy = jest.spyOn(aesthetic, 'changeTheme');

		const children = (
			<>
				<View>1</View>
				<View>2</View>
				<View>3</View>
			</>
		);
		const { update } = render(<ThemeProvider>{children}</ThemeProvider>);

		update(<ThemeProvider name="night">{children}</ThemeProvider>);

		expect(spy).toHaveBeenCalledWith('night', false);

		spy.mockRestore();
	});

	describe('subscriptions', () => {
		let subSpy: jest.SpyInstance;
		let unsubSpy: jest.SpyInstance;

		beforeEach(() => {
			subSpy = jest.spyOn(aesthetic, 'subscribe');
			unsubSpy = jest.spyOn(aesthetic, 'unsubscribe');
		});

		afterEach(() => {
			subSpy.mockRestore();
			unsubSpy.mockRestore();
		});

		it('subscribes on mount', () => {
			render(
				<ThemeProvider>
					<View />
				</ThemeProvider>,
			);

			expect(subSpy).toHaveBeenCalledTimes(1);
			expect(subSpy).toHaveBeenCalledWith('change:theme', expect.any(Function));
		});

		it('only subscribes once', () => {
			const { update } = render(
				<ThemeProvider>
					<View />
				</ThemeProvider>,
			);

			update(
				<ThemeProvider>
					<View />
				</ThemeProvider>,
			);
			update(
				<ThemeProvider>
					<View />
				</ThemeProvider>,
			);
			update(
				<ThemeProvider>
					<View />
				</ThemeProvider>,
			);

			expect(subSpy).toHaveBeenCalledTimes(1);
		});

		it('unsubscribes on unmount', () => {
			const { unmount } = render(
				<ThemeProvider>
					<View />
				</ThemeProvider>,
			);

			unmount();

			expect(unsubSpy).toHaveBeenCalledTimes(1);
			expect(unsubSpy).toHaveBeenCalledWith('change:theme', expect.any(Function));
		});

		it('changes theme if outside `changeTheme` is called', () => {
			const themeSpy = jest.fn();
			let doChangeTheme: OnChangeTheme = () => {};

			// Janky, but since we mocked the module, we need to extract this
			subSpy.mockImplementation((name, cb) => {
				doChangeTheme = cb as OnChangeTheme;
			});

			function Comp() {
				themeSpy(useTheme());

				return null;
			}

			render(
				<ThemeProvider name="twilight">
					<Comp />
				</ThemeProvider>,
			);

			void act(() => {
				doChangeTheme('dawn', []);
			});

			expect(themeSpy).toHaveBeenCalledWith(twilightTheme);
			expect(themeSpy).toHaveBeenCalledWith(dawnTheme);
		});
	});
});
