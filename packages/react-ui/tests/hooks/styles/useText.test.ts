import { renderHook } from '@testing-library/react-hooks';
import { useText } from '../../../src/hooks/styles/useText';
import { getRenderedStyles, Wrapper } from '../../helpers';

describe('useText()', () => {
	it('renders default styles', () => {
		const { result } = renderHook(() => useText('df'), { wrapper: Wrapper });

		expect(result.current).toBe('cwhyrls c1q1da5a cpfxegw');
		expect(getRenderedStyles('standard')).toMatchSnapshot();
	});

	it('can change the size', () => {
		const { result } = renderHook(() => useText('lg'), { wrapper: Wrapper });

		expect(result.current).toBe('cwhyrls c10l4oaf ckfuq95');
	});
});
