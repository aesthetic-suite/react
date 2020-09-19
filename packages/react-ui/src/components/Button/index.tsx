import React from 'react';
import { useStyles, PaletteType, TextSize } from '@aesthetic/react';
import styleSheet from './styles';

export { styleSheet };

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  children: NonNullable<React.ReactNode>;
  palette?: PaletteType;
  size?: TextSize;
}

export function Button({
  block = false,
  children,
  palette = 'primary',
  size = 'df',
  ...props
}: ButtonProps) {
  const cx = useStyles(styleSheet);

  return (
    <button type="button" className={cx({ size }, 'button', block && 'button_block')} {...props}>
      {children}
    </button>
  );
}
