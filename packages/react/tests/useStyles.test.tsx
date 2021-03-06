/* eslint-disable react/jsx-no-literals */

import React, { useState } from 'react';
import { render } from 'rut-dom';
import { getRenderedStyles } from '@aesthetic/style/test';
import { ClassName, ComponentSheet, Rule, useStyles } from '../src';
import {
	ButtonProps,
	createAdditionalStyleSheet,
	createStyleSheet,
	Wrapper,
} from './__fixtures__/Button';
import { dawnTheme, setupAestheticReact, teardownAestheticReact, twilightTheme } from './helpers';

describe('useStyles()', () => {
	let sheet: ComponentSheet<'button_block' | 'button_disabled' | 'button', Rule, ClassName>;

	function Button({ children, compound, block, disabled, large, small }: ButtonProps) {
		const cx = useStyles(sheet);

		return (
			<button
				className={cx(
					{
						compound,
						// eslint-disable-next-line no-nested-ternary
						size: large ? 'lg' : small ? 'sm' : 'df',
					},
					'button',
					block && 'button_block',
					disabled && 'button_disabled',
				)}
				type="button"
			>
				{children}
			</button>
		);
	}

	function CustomSheetButton({ children }: ButtonProps) {
		const cx = useStyles(sheet);

		return (
			<button className={cx()} type="button">
				{children}
			</button>
		);
	}

	function MultiSheetButton({ children, icon }: ButtonProps) {
		const [otherSheet] = useState(createAdditionalStyleSheet());
		const cx = useStyles(sheet, otherSheet);

		return (
			<button className={cx('button', icon && 'icon')} type="button">
				{children}
			</button>
		);
	}

	function StylelessButton({ children, disabled }: ButtonProps) {
		const cx = useStyles(sheet);

		return (
			<button className={cx(disabled && 'button_disabled')} type="button">
				{children}
			</button>
		);
	}

	beforeEach(() => {
		setupAestheticReact();
		sheet = createStyleSheet();
	});

	afterEach(() => {
		teardownAestheticReact();
	});

	it('renders a button and its base styles', () => {
		const { root } = render<ButtonProps>(<Button>Child</Button>, {
			wrapper: <Wrapper />,
		});

		expect(getRenderedStyles('standard')).toMatchSnapshot();

		expect(root.findOne('button')).toHaveProp(
			'className',
			'a b c d e f g h i j k l m n o p q r s t u v w z a1',
		);
	});

	it('changes class name based on props enabled', () => {
		const { root, update } = render<ButtonProps>(<Button>Child</Button>, {
			wrapper: <Wrapper />,
		});

		expect(root.findOne('button')).toHaveProp(
			'className',
			'a b c d e f g h i j k l m n o p q r s t u v w z a1',
		);

		update({ disabled: true });

		expect(root.findOne('button')).toHaveProp(
			'className',
			'a b c d e f g h i j k l m n o p q r s t u v w z a1 m1',
		);

		update({ block: true, large: true });

		expect(root.findOne('button')).toHaveProp(
			'className',
			'a b c d e f g h i j k l m n o p q r s t u v w b1 c1 e1 f1 g1 h1 i1 j1 k1 n1',
		);
	});

	it('includes variants and compound variants when activated', () => {
		const { root, update } = render<ButtonProps>(
			<Button large compound="test">
				Child
			</Button>,
			{
				wrapper: <Wrapper />,
			},
		);

		expect(root.findOne('button')).toHaveProp(
			'className',
			'a b c d e f g h i j k l m n o p q r s t u v w b1 c1 d1',
		);

		// Test compound no longer matches
		update({ large: true, compound: 'invalid' });

		expect(root.findOne('button')).toHaveProp(
			'className',
			'a b c d e f g h i j k l m n o p q r s t u v w b1 c1',
		);

		// Test other element variants are applied
		update({ large: true, compound: 'test', disabled: true });

		expect(root.findOne('button')).toHaveProp(
			'className',
			'a b c d e f g h i j k l m n o p q r s t u v w b1 c1 d1 n1 o1',
		);
	});

	it('returns an empty string if no selectors enabled', () => {
		const { root } = render<ButtonProps>(<StylelessButton>Child</StylelessButton>, {
			wrapper: <Wrapper />,
		});

		expect(root.findOne('button')).toHaveProp('className', '');
	});

	it('only renders once unless theme or direction change', () => {
		const spy = jest.spyOn(sheet, 'render');

		const { update } = render<ButtonProps>(<CustomSheetButton>Child</CustomSheetButton>, {
			wrapper: <Wrapper />,
		});

		update();
		update();
		update();

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('re-renders if direction changes', () => {
		const spy = jest.spyOn(sheet, 'render');

		const { rerender } = render<ButtonProps>(
			<Wrapper>
				<CustomSheetButton>Child</CustomSheetButton>
			</Wrapper>,
		);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(
			expect.anything(),
			twilightTheme,
			expect.objectContaining({
				direction: 'ltr',
				theme: 'twilight',
			}),
		);

		rerender(
			<Wrapper direction="rtl">
				<CustomSheetButton>Child</CustomSheetButton>
			</Wrapper>,
		);

		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy).toHaveBeenCalledWith(
			expect.anything(),
			twilightTheme,
			expect.objectContaining({
				direction: 'rtl',
				theme: 'twilight',
			}),
		);
	});

	it('re-renders if theme changes', () => {
		const spy = jest.spyOn(sheet, 'render');

		const { rerender } = render<ButtonProps>(
			<Wrapper>
				<CustomSheetButton>Child</CustomSheetButton>
			</Wrapper>,
		);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(
			expect.anything(),
			twilightTheme,
			expect.objectContaining({
				direction: 'ltr',
				theme: 'twilight',
			}),
		);

		rerender(
			<Wrapper theme="dawn">
				<CustomSheetButton>Child</CustomSheetButton>
			</Wrapper>,
		);

		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy).toHaveBeenCalledWith(
			expect.anything(),
			dawnTheme,
			expect.objectContaining({
				direction: 'ltr',
				theme: 'dawn',
			}),
		);
	});

	it('re-renders when direction and theme change', () => {
		const spy = jest.spyOn(sheet, 'render');

		const { rerender } = render<ButtonProps>(
			<Wrapper>
				<CustomSheetButton>Child</CustomSheetButton>
			</Wrapper>,
		);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(
			expect.anything(),
			twilightTheme,
			expect.objectContaining({
				direction: 'ltr',
				theme: 'twilight',
			}),
		);

		rerender(
			<Wrapper direction="rtl" theme="dawn">
				<CustomSheetButton>Child</CustomSheetButton>
			</Wrapper>,
		);

		// Annoying that this fires multiple times, possible to batch?
		expect(spy).toHaveBeenCalledTimes(3);

		expect(spy).toHaveBeenCalledWith(
			expect.anything(),
			twilightTheme,
			expect.objectContaining({
				direction: 'rtl',
				theme: 'twilight',
			}),
		);

		expect(spy).toHaveBeenCalledWith(
			expect.anything(),
			dawnTheme,
			expect.objectContaining({
				direction: 'rtl',
				theme: 'dawn',
			}),
		);
	});

	it('supports rendering multiple style sheets', () => {
		const { root, update } = render<ButtonProps>(<MultiSheetButton>Child</MultiSheetButton>, {
			wrapper: <Wrapper />,
		});

		expect(root.findOne('button')).toHaveProp(
			'className',
			'a b c d e f g h i j k l m n o p q r s t u v w',
		);

		update({ icon: true });

		expect(root.findOne('button')).toHaveProp(
			'className',
			'a b c d e f g h i j k l m n o p q r s t u v w p1',
		);
	});
});
