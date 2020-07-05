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

export default function Button({
  block = false,
  children,
  palette = 'primary',
  size = 'df',
  ...props
}: ButtonProps) {
  const cx = useStyles(styleSheet);

  return (
    <button
      type="button"
      className={cx(
        'button',
        block && 'button_block',
        size === 'sm' && 'button_small',
        size === 'lg' && 'button_large',
      )}
      {...props}
    >
      {children}
    </button>
  );
}
