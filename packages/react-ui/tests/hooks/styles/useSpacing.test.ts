import { renderHook } from '@testing-library/react-hooks';
import { useSpacing } from '../../../src/hooks/styles/useSpacing';
import { getRenderedStyles, Wrapper } from '../../helpers';

describe('useSpacing()', () => {
	it('renders default styles', () => {
		const { result } = renderHook(() => useSpacing({}), { wrapper: Wrapper });

		expect(result.current).toEqual({ className: '', style: {} });
		expect(getRenderedStyles('standard')).toMatchSnapshot();
	});

	it('can set all sides', () => {
		const { result } = renderHook(() => useSpacing({ spacing: 'df' }), { wrapper: Wrapper });

		expect(result.current).toEqual({ className: 'c1xb6ewu', style: {} });
	});

	it('can set horizontal sides', () => {
		const { result } = renderHook(() => useSpacing({ spacingHorizontal: 'xs' }), {
			wrapper: Wrapper,
		});

		expect(result.current).toEqual({ className: 'c11b8tkx c1pyn0u2', style: {} });
	});

	it('can set vertical sides', () => {
		const { result } = renderHook(() => useSpacing({ spacingVertical: 'xl' }), {
			wrapper: Wrapper,
		});

		expect(result.current).toEqual({ className: 'c1atx52m c11w6nd6', style: {} });
	});

	it('can set top side', () => {
		const { result } = renderHook(() => useSpacing({ spacingTop: 'sm' }), {
			wrapper: Wrapper,
		});

		expect(result.current).toEqual({ className: 'cwdul6s', style: {} });
	});

	it('can set right side', () => {
		const { result } = renderHook(() => useSpacing({ spacingEnd: 'df' }), {
			wrapper: Wrapper,
		});

		expect(result.current).toEqual({ className: 'c1mj2ayb', style: {} });
	});

	it('can set bottom side', () => {
		const { result } = renderHook(() => useSpacing({ spacingBottom: 'lg' }), {
			wrapper: Wrapper,
		});

		expect(result.current).toEqual({ className: 'cs15051', style: {} });
	});

	it('can set left side', () => {
		const { result } = renderHook(() => useSpacing({ spacingStart: 'xl' }), {
			wrapper: Wrapper,
		});

		expect(result.current).toEqual({ className: 'c11mjqpq', style: {} });
	});

	it('can set multiple sides with correct specificity', () => {
		const { result } = renderHook(
			() => useSpacing({ spacing: 'df', spacingVertical: 'sm', spacingTop: 'xs' }),
			{
				wrapper: Wrapper,
			},
		);

		expect(result.current).toEqual({ className: 'c1xb6ewu cwdul6s c16ip6ow c1yh1hbl', style: {} });
	});

	it('can set sides using a number', () => {
		const { result } = renderHook(
			() =>
				useSpacing({
					spacing: 1,
					spacingHorizontal: 0.5,
					spacingVertical: 2,
					spacingTop: 3,
					spacingBottom: 5,
					spacingStart: 0,
					spacingEnd: -1,
				}),
			{
				wrapper: Wrapper,
			},
		);

		expect(result.current).toEqual({
			className: 'c1g5rurh cw2ew7o c1yx0hov cplmy08 c13z83ws c1f31uz5 c1o3yudt c1yeaeq2 cdpbbi6',
			style: {
				'--spacing-all': '1.25rem',
				'--spacing-bottom': '6.25rem',
				'--spacing-end': '-1.25rem',
				'--spacing-horizontal': '0.63rem',
				'--spacing-start': '0rem',
				'--spacing-top': '3.75rem',
				'--spacing-vertical': '2.50rem',
			},
		});
	});
});
