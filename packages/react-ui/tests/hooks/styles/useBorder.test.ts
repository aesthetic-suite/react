import { ThemeProvider } from '@aesthetic/react';
import { renderHook } from '@testing-library/react-hooks';
import { useBorder } from '../../../src/hooks/styles/useBorder';
import { getRenderedStyles } from '../../helpers';

describe('useBorder()', () => {
  it('renders default styles', () => {
    const { result } = renderHook(() => useBorder(), { wrapper: ThemeProvider });

    expect(result.current).toBe('a b');
    expect(getRenderedStyles('standard')).toMatchSnapshot();
  });

  it('can set the size', () => {
    const { result } = renderHook(() => useBorder('lg'), { wrapper: ThemeProvider });

    expect(result.current).toBe('a b e');
  });

  it('can apply a border radius', () => {
    const { result } = renderHook(() => useBorder('sm', true), { wrapper: ThemeProvider });

    expect(result.current).toBe('a b c f');
  });
});
