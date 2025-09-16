import { darkBlue } from '../colors/blue-dark';
import { lightBlue } from '../colors/blue-light';
import { green } from '../colors/green';
import { debugMint } from '../colors/green-mint';
import { grey } from '../colors/grey';
import { ioDarkBlue } from '../colors/io-blue-dark';
import { ioLightBlue } from '../colors/io-blue-light';
import { red } from '../colors/red';
import { contrastRed } from '../colors/red-contrast';
import { yellow } from '../colors/yellow';
import { orange } from '../colors/orange';

export type Palette = typeof palette;
export type PaletteColor = keyof Palette;

export const palette = {
    contrastRed, // for debug purpose
    debugMint, // for debug purpose
    darkBlue,
    lightBlue,
    green,
    grey,
    ioLightBlue,
    ioDarkBlue,
    red,
    yellow,
    orange,
} as const satisfies Record<string, PartialShades>;

export const cssKeywords = ['transparent', 'inherit', 'initial', 'unset', 'currentColor'] as const;
export const namedColors = ['white', 'black'] as const;

export type NamedColor = (typeof namedColors)[number];
export type CSSKeywords = (typeof cssKeywords)[number];

export const colors = {
    white: '#FFFFFF',
    black: '#000000',
    current: 'currentColor',
    transparent: 'transparent',
    ...palette,
} as const satisfies Record<string, HexColor | NamedColor | CSSKeywords | Partial<Shades>>;
