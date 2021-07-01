import React, { createContext } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useContextRequirement } from '../../src/hooks/useContextRequirement';
import { withEnvironment, WrapperProps } from '../helpers';

const TestContext = createContext(false);

describe('useBorder()', () => {
	it('errors if context returns a falsy value', () => {
		const { result } = renderHook(() => {
			useContextRequirement(TestContext, 'Failed');
		});

		expect(result.error).toEqual(new Error('Failed'));
	});

	it(
		'doesnt error if context returns a falsy value when in production',
		withEnvironment('production', () => {
			const { result } = renderHook(() => {
				useContextRequirement(TestContext, 'Failed');
			});

			expect(result.error).toBeUndefined();
		}),
	);

	it('doesnt error if context returns a truth value', () => {
		function Wrapper({ children }: WrapperProps) {
			return <TestContext.Provider value>{children}</TestContext.Provider>;
		}

		const { result } = renderHook(
			() => {
				useContextRequirement(TestContext, 'Failed');
			},
			{ wrapper: Wrapper },
		);

		expect(result.error).toBeUndefined();
	});
});
