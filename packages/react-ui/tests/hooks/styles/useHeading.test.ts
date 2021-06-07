import { renderHook } from '@testing-library/react-hooks';
import { useHeading } from '../../../src/hooks/styles/useHeading';
import { getRenderedStyles, Wrapper } from '../../helpers';

describe('useHeading()', () => {
  it('renders default styles', () => {
    const { result } = renderHook(() => useHeading(1), { wrapper: Wrapper });

    expect(result.current).toBe('a b c d');
    expect(getRenderedStyles('standard')).toMatchSnapshot();
  });

  it('can change the level', () => {
    const { result } = renderHook(() => useHeading(4), { wrapper: Wrapper });

    expect(result.current).toBe('a k l m');
  });
});
