import { renderHook } from '@testing-library/react-hooks';
import { useSpacing } from '../../../src/hooks/styles/useSpacing';
import { getRenderedStyles, withStyles, Wrapper } from '../../helpers';

describe('useSpacing()', () => {
	it('renders default', () => {
		const { result } = renderHook(() => useSpacing({}), { wrapper: Wrapper });

		expect(result.current).toEqual({ className: 'element', style: {} });
	});

	it(
		'renders default styles',
		withStyles(() => {
			renderHook(() => useSpacing({}), { wrapper: Wrapper });

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);

	it('can set all sides', () => {
		const { result } = renderHook(() => useSpacing({ spacing: 'df' }), { wrapper: Wrapper });

		expect(result.current).toEqual({ className: 'element variant:all:df', style: {} });
	});

	it('can set horizontal sides', () => {
		const { result } = renderHook(() => useSpacing({ spacingHorizontal: 'xs' }), {
			wrapper: Wrapper,
		});

		expect(result.current).toEqual({ className: 'element variant:horizontal:xs', style: {} });
	});

	it('can set vertical sides', () => {
		const { result } = renderHook(() => useSpacing({ spacingVertical: 'xl' }), {
			wrapper: Wrapper,
		});

		expect(result.current).toEqual({ className: 'element variant:vertical:xl', style: {} });
	});

	it('can set top side', () => {
		const { result } = renderHook(() => useSpacing({ spacingTop: 'sm' }), {
			wrapper: Wrapper,
		});

		expect(result.current).toEqual({ className: 'element variant:top:sm', style: {} });
	});

	it('can set right side', () => {
		const { result } = renderHook(() => useSpacing({ spacingEnd: 'df' }), {
			wrapper: Wrapper,
		});

		expect(result.current).toEqual({ className: 'element variant:end:df', style: {} });
	});

	it('can set bottom side', () => {
		const { result } = renderHook(() => useSpacing({ spacingBottom: 'lg' }), {
			wrapper: Wrapper,
		});

		expect(result.current).toEqual({ className: 'element variant:bottom:lg', style: {} });
	});

	it('can set left side', () => {
		const { result } = renderHook(() => useSpacing({ spacingStart: 'xl' }), {
			wrapper: Wrapper,
		});

		expect(result.current).toEqual({ className: 'element variant:start:xl', style: {} });
	});

	it('can set multiple sides with correct specificity', () => {
		const { result } = renderHook(
			() => useSpacing({ spacing: 'df', spacingVertical: 'sm', spacingTop: 'xs' }),
			{
				wrapper: Wrapper,
			},
		);

		expect(result.current).toEqual({
			className: 'element variant:all:df variant:vertical:sm variant:top:xs',
			style: {},
		});
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
			className:
				'element variant:all:inline variant:horizontal:inline variant:vertical:inline variant:top:inline variant:bottom:inline variant:start:inline variant:end:inline',
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
