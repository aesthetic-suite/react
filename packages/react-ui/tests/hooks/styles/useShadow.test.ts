import { renderHook } from '@testing-library/react-hooks';
import { useShadow } from '../../../src/hooks/styles/useShadow';
import { getRenderedStyles, Wrapper } from '../../helpers';

describe('useShadow()', () => {
	it('renders default styles', () => {
		const { result } = renderHook(() => useShadow('md'), { wrapper: Wrapper });

		expect(result.current).toBe('c');
		expect(getRenderedStyles('standard')).toMatchSnapshot();
	});

	it('can change the size', () => {
		const { result } = renderHook(() => useShadow('xs'), { wrapper: Wrapper });

		expect(result.current).toBe('a');
	});
});
