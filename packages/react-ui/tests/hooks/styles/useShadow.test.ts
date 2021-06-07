import { ThemeProvider } from '@aesthetic/react';
import { renderHook } from '@testing-library/react-hooks';
import { useShadow } from '../../../src/hooks/styles/useShadow';
import { getRenderedStyles } from '../../helpers';

describe('useShadow()', () => {
  it('renders default styles', () => {
    const { result } = renderHook(() => useShadow('md'), { wrapper: ThemeProvider });

    expect(result.current).toBe('c');
    expect(getRenderedStyles('standard')).toMatchSnapshot();
  });

  it('can change the size', () => {
    const { result } = renderHook(() => useShadow('xs'), { wrapper: ThemeProvider });

    expect(result.current).toBe('a');
  });
});
