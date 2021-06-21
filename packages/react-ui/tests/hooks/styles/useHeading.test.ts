import { renderHook } from '@testing-library/react-hooks';
import { useHeading } from '../../../src/hooks/styles/useHeading';
import { getRenderedStyles, Wrapper } from '../../helpers';

describe('useHeading()', () => {
	it('renders default styles', () => {
		const { result } = renderHook(() => useHeading(1), { wrapper: Wrapper });

		expect(result.current).toBe('c6u9ihh c9kwtas crgd4fe c1d7w45w');
		expect(getRenderedStyles('standard')).toMatchSnapshot();
	});

	it('can change the level', () => {
		const { result } = renderHook(() => useHeading(4), { wrapper: Wrapper });

		expect(result.current).toBe('c6u9ihh c1v9whox c1rd0vjj c1y683ht');
	});
});
