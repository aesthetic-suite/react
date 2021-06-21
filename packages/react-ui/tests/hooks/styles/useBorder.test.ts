import { renderHook } from '@testing-library/react-hooks';
import { useBorder } from '../../../src/hooks/styles/useBorder';
import { getRenderedStyles, Wrapper } from '../../helpers';

describe('useBorder()', () => {
	it('renders default styles', () => {
		const { result } = renderHook(() => useBorder(), { wrapper: Wrapper });

		expect(result.current).toBe('c1oowyan cfdmyha');
		expect(getRenderedStyles('standard')).toMatchSnapshot();
	});

	it('can set the size', () => {
		const { result } = renderHook(() => useBorder('lg'), { wrapper: Wrapper });

		expect(result.current).toBe('c1oowyan cfdmyha c1xgoolj');
	});

	it('can apply a border radius', () => {
		const { result } = renderHook(() => useBorder('sm', true), { wrapper: Wrapper });

		expect(result.current).toBe('c1oowyan cfdmyha c1e95qeq c18pn6tu');
	});
});
