import { renderHook } from '@testing-library/react-hooks';
import { useShadow } from '../../../src/hooks/styles/useShadow';
import { getRenderedStyles, withStyles, Wrapper } from '../../helpers';

describe('useShadow()', () => {
	it('renders default', () => {
		const { result } = renderHook(() => useShadow('md'), { wrapper: Wrapper });

		expect(result.current).toBe('element variant:size:md');
	});

	it(
		'renders default styles',
		withStyles(() => {
			renderHook(() => useShadow('md'), { wrapper: Wrapper });

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);

	it('can change the size', () => {
		const { result } = renderHook(() => useShadow('xs'), { wrapper: Wrapper });

		expect(result.current).toBe('element variant:size:xs');
	});
});
