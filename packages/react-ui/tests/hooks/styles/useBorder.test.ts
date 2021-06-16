import { renderHook } from '@testing-library/react-hooks';
import { useBorder } from '../../../src/hooks/styles/useBorder';
import { getRenderedStyles, Wrapper } from '../../helpers';

describe('useBorder()', () => {
	it('renders default styles', () => {
		const { result } = renderHook(() => useBorder(), { wrapper: Wrapper });

		expect(result.current).toBe('a b');
		expect(getRenderedStyles('standard')).toMatchSnapshot();
	});

	it('can set the size', () => {
		const { result } = renderHook(() => useBorder('lg'), { wrapper: Wrapper });

		expect(result.current).toBe('a b e');
	});

	it('can apply a border radius', () => {
		const { result } = renderHook(() => useBorder('sm', true), { wrapper: Wrapper });

		expect(result.current).toBe('a b c f');
	});
});
