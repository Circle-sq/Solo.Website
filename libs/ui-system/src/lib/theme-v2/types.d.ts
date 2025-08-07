/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-magic-numbers */
type ThemeNames = import('../theme-names').ThemeNames;
type PaletteColor = import('./colors').PaletteColor;
type Palette = import('./colors').Palette;
type CSSKeywords = import('./colors').CSSKeywords;
type NamedColor = import('./colors').NamedColor;

type HexColor = `#${string}`;
type CSSVariable = `--${string}`;

type ValidColor = HexColor | CSSKeywords | NamedColor;

type ColorVariables = Readonly<Record<CSSVariable, Record<ThemeNames, ColorName>>>;

type Shade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'A100' | 'A200' | 'A400' | 'A700';

type Opacity = `${number}%`;
type Shades = Record<Shade, HexColor>;
type PartialShades = Partial<Record<Shade, HexColor>>;

type Color = [PaletteColor, Shade | undefined] | HexColor;

type ColorName =
    | Exclude<keyof typeof import('./colors').colors, PaletteColor>
    | `${PaletteColor}.${Shade}`
    | `${PaletteColor}.${Shade}:${Opacity}`
    | `${NamedColor}:${Opacity}`;
