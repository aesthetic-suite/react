import { renderHook } from '@testing-library/react-hooks';
import { useText } from '../../../src/hooks/styles/useText';
import { getRenderedStyles, withStyles, Wrapper } from '../../helpers';

describe('useText()', () => {
	it('renders default', () => {
		const { result } = renderHook(() => useText('df'), { wrapper: Wrapper });

		expect(result.current).toBe('element variant:size:df');
	});

	it(
		'renders default styles',
		withStyles(() => {
			renderHook(() => useText('df'), { wrapper: Wrapper });

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);

	it('can change the size', () => {
		const { result } = renderHook(() => useText('lg'), { wrapper: Wrapper });

		expect(result.current).toBe('element variant:size:lg');
	});
});
