import { OmitUnwantedHtmlProps } from '../types';

export type ButtonFill = 'empty' | 'hollow' | 'solid';

export type ButtonShape = 'pill' | 'round' | 'sharp';

export type HtmlAnchorProps = OmitUnwantedHtmlProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>;

export type HtmlButtonProps = OmitUnwantedHtmlProps<React.ButtonHTMLAttributes<HTMLButtonElement>>;
