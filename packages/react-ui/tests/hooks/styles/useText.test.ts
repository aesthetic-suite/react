import { ThemeProvider } from '@aesthetic/react';
import { renderHook } from '@testing-library/react-hooks';
import { useText } from '../../../src/hooks/styles/useText';
import { getRenderedStyles } from '../../helpers';

describe('useText()', () => {
  it('renders default styles', () => {
    const { result } = renderHook(() => useText('df'), { wrapper: ThemeProvider });

    expect(result.current).toBe('a d e');
    expect(getRenderedStyles('standard')).toMatchSnapshot();
  });

  it('can change the size', () => {
    const { result } = renderHook(() => useText('lg'), { wrapper: ThemeProvider });

    expect(result.current).toBe('a f g');
  });
});
