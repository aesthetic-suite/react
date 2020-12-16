import { useState, useEffect, useRef } from 'react';
import { ClassNameSheet, LocalSheet } from '@aesthetic/core';
import { isSSR } from '@aesthetic/utils';
import aesthetic from './aesthetic';
import { ClassNameGenerator } from './types';
import { useDirection } from './direction';
import { useTheme } from './theme';
import generateCX from './generateCX';

/**
 * Hook within a component to provide a style sheet.
 */
export default function useStyles<T = unknown>(sheet: LocalSheet<T>): ClassNameGenerator<keyof T> {
  const direction = useDirection();
  const theme = useTheme();
  const cache = useRef<Record<string, string>>({});

  // Render the styles immediately for SSR since effects do not run
  const [classNames, setClassNames] = useState<ClassNameSheet<string>>(() => {
    if (isSSR() || global.AESTHETIC_CUSTOM_ENGINE) {
      return aesthetic.renderComponentStyles(sheet, {
        direction,
        theme: theme.name,
      });
    }

    return {};
  });

  // Re-render styles when the theme or direction change
  useEffect(() => {
    cache.current = {};

    setClassNames(
      aesthetic.renderComponentStyles(sheet, {
        direction,
        theme: theme.name,
      }),
    );
    // It wants to include `sheet` but that triggers an infinite render loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, theme]);

  // Return function to generate dynamic class names
  return (...keys: unknown[]) => generateCX(keys, classNames, cache.current);
}
