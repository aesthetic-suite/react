import { renderHook } from '@testing-library/react-hooks';
import { useBorder } from '../../../src/hooks/styles/useBorder';
import { getRenderedStyles, withStyles, Wrapper } from '../../helpers';

describe('useBorder()', () => {
	it('renders default', () => {
		const { result } = renderHook(() => useBorder(), { wrapper: Wrapper });

		expect(result.current).toBe('element');
	});

	it(
		'renders default styles',
		withStyles(() => {
			renderHook(() => useBorder(), { wrapper: Wrapper });

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);

	it('can set the size', () => {
		const { result } = renderHook(() => useBorder('lg'), { wrapper: Wrapper });

		expect(result.current).toBe('element variant:size:lg');
	});

	it('can apply a border radius', () => {
		const { result } = renderHook(() => useBorder('sm', true), { wrapper: Wrapper });

		expect(result.current).toBe('element variant:size:sm variant:radius:sm');
	});
});
