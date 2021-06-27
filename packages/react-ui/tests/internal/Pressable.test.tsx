import React from 'react';
import { render, screen } from '@testing-library/react';
import { Pressable } from '../../src/internal/Pressable';

describe('Pressable', () => {
	describe('button', () => {
		it('renders a button by default', () => {
			const { getByTestId } = render(<Pressable testID="el">Button</Pressable>);

			expect(getByTestId('el').tagName).toBe('BUTTON');
		});

		it('renders a button when `onClick` is provided', () => {
			const { getByTestId } = render(
				<Pressable testID="el" onClick={() => {}}>
					Button
				</Pressable>,
			);

			expect(getByTestId('el').tagName).toBe('BUTTON');
		});

		it('can change the `type`', () => {
			const { getByTestId } = render(
				<Pressable testID="el" type="submit">
					Button
				</Pressable>,
			);

			expect(getByTestId('el').getAttribute('type')).toBe('submit');
		});
	});

	describe('link', () => {
		it('renders a link when `to` is provided', () => {
			const { getByTestId } = render(
				<Pressable testID="el" to="/">
					Button
				</Pressable>,
			);

			expect(getByTestId('el').tagName).toBe('A');
			expect(getByTestId('el').getAttribute('href')).toBe('/');
		});

		it('renders a link when `to` and `onClick` is provided', () => {
			const { getByTestId } = render(
				<Pressable testID="el" to="/" onClick={() => {}}>
					Button
				</Pressable>,
			);

			expect(getByTestId('el').tagName).toBe('A');
			expect(getByTestId('el').getAttribute('href')).toBe('/');
		});

		it('renders a link when `href` is provided', () => {
			const { getByTestId } = render(
				<Pressable href="/" testID="el">
					Button
				</Pressable>,
			);

			expect(getByTestId('el').tagName).toBe('A');
			expect(getByTestId('el').getAttribute('href')).toBe('/');
		});

		it('renders a link when `href` and `onClick` is provided', () => {
			const { getByTestId } = render(
				<Pressable href="/" testID="el" onClick={() => {}}>
					Button
				</Pressable>,
			);

			expect(getByTestId('el').tagName).toBe('A');
			expect(getByTestId('el').getAttribute('href')).toBe('/');
		});

		it('cannot set the button `type`', () => {
			const { getByTestId } = render(
				<Pressable testID="el" to="/" type="submit">
					Button
				</Pressable>,
			);

			expect(getByTestId('el').getAttribute('type')).toBeNull();
		});

		it('sets `rel` if `target` is _blank', () => {
			const { getByTestId } = render(
				<Pressable target="_blank" testID="el" to="/">
					Button
				</Pressable>,
			);

			expect(getByTestId('el').tagName).toBe('A');
			expect(getByTestId('el').getAttribute('rel')).toBe('noopener noreferrer');
			expect(getByTestId('el').getAttribute('target')).toBe('_blank');
		});

		it('can set `rel` even if `target` is _blank', () => {
			const { getByTestId } = render(
				<Pressable rel="something" target="_blank" testID="el" to="/">
					Button
				</Pressable>,
			);

			expect(getByTestId('el').tagName).toBe('A');
			expect(getByTestId('el').getAttribute('rel')).toBe('something');
			expect(getByTestId('el').getAttribute('target')).toBe('_blank');
		});
	});
});
