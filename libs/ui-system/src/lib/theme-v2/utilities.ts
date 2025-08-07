import includes from 'lodash/includes';
import isUndefined from 'lodash/isUndefined';

import { colors, cssKeywords, namedColors, palette } from './colors';
import type { Variable } from './variables';

export const cssColor = (variable: Variable, missingVarColor = colors.debugMint[600]) =>
    `var(${variable}, ${missingVarColor})`;

export const opacityToHex = (opacity: Opacity) => {
    const value = Number(opacity.replace('%', '')) / 100;

    return Math.round(value * 255)
        .toString(16)
        .toUpperCase()
        .padStart(2, '0');
};

export const toColor = (name: ColorName): ValidColor => {
    if (isNamedColor(name) || isCssKeyword(name)) {
        return name;
    }

    const [colorName, colorOpacity] = name.split(':') as [NamedColor, Opacity];

    if (isNamedColor(colorName) && colorOpacity) {
        return `${colors[colorName]}${opacityToHex(colorOpacity)}` as HexColor;
    }

    const [paletteColorName, shadeAndOpacity] = name.split('.') as [PaletteColor, string];
    const color = colors[paletteColorName] as HexColor | Palette;

    if (isHexColor(color)) {
        return color;
    }

    const [shade, opacity] = shadeAndOpacity.split(':') as [Shade, Opacity];

    if (isPaletteColor(paletteColorName)) {
        const color = palette[paletteColorName];

        const hexColor = color[shade];

        if (isUndefined(hexColor)) {
            console.warn(`no color, got:${name}`, { shade, hexColor, color });

            return colors.debugMint[700] as HexColor;
        }

        if (opacity && isShade(shade) && hexColor) {
            const opacityHex = opacityToHex(opacity);

            return `${hexColor}${opacityHex}`;
        }

        if (isShade(shade) && hexColor) {
            return hexColor;
        }

        return colors.debugMint[800] as HexColor;
    }

    console.warn('no color', { name });

    return colors.debugMint[900] as HexColor;
};

export const isCssKeyword = (color: unknown): color is CSSKeywords => includes(cssKeywords, color);

export const isNamedColor = (color: unknown): color is NamedColor => includes(namedColors, color);

export const isHexColor = (color: unknown): color is HexColor => {
    if (typeof color !== 'string') {
        return false;
    }

    return /^#[0-9A-F]{6}$/i.test(color);
};

export const isPaletteColor = (color: string): color is PaletteColor => color in palette;

export const isShade = (shade: unknown): shade is Shade =>
    typeof shade === 'number' || typeof Number(shade) === 'number';
