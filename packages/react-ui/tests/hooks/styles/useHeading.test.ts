import { renderHook } from '@testing-library/react-hooks';
import { useHeading } from '../../../src/hooks/styles/useHeading';
import { getRenderedStyles, withStyles, Wrapper } from '../../helpers';

describe('useHeading()', () => {
	it('renders default', () => {
		const { result } = renderHook(() => useHeading(1), { wrapper: Wrapper });

		expect(result.current).toBe('element variant:level:1');
	});

	it(
		'renders default styles',
		withStyles(() => {
			renderHook(() => useHeading(1), { wrapper: Wrapper });

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);

	it('can change the level', () => {
		const { result } = renderHook(() => useHeading(4), { wrapper: Wrapper });

		expect(result.current).toBe('element variant:level:4');
	});
});
