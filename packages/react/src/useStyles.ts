import { useCallback, useState, useEffect } from 'react';
import { ClassNameSheet, LocalSheet, renderComponentStyles } from '@aesthetic/core';
import { ClassNameGenerator } from './types';
import useDirection from './useDirection';
import useTheme from './useTheme';
import cxHandler from './cxHandler';

/**
 * Hook within a component to provide a style sheet.
 */
export default function useStyles<T = unknown>(sheet: LocalSheet<T>): ClassNameGenerator<keyof T> {
  const direction = useDirection();
  const theme = useTheme();

  // Render the styles immediately
  const [classNames, setClassNames] = useState<ClassNameSheet<string>>(() =>
    renderComponentStyles(sheet, {
      direction,
      theme: theme.name,
    }),
  );

  // Re-render styles when the theme or direction change
  useEffect(() => {
    setClassNames(
      renderComponentStyles(sheet, {
        direction,
        theme: theme.name,
      }),
    );
    // It wants to include `sheet` but that triggers an infinite render loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, theme]);

  // Return function to generate dynamic class names
  return useCallback((...keys: unknown[]) => cxHandler(keys, classNames), [classNames]);
}
