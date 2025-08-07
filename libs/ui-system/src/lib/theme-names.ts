import { componentsOptions } from '../customizations/components';

import { CommonThemeOptions } from './theme-common-options';
import { cssColor } from './theme-v2/utilities';
import * as AllVariables from './theme-v2/variables';

export enum ThemeNames {
    Blue = 'blue',
    Neon = 'neon',
    Contrast = 'contrast',
}

export const getThemeOptions = (themeName: ThemeNames) => {
    const components = getComponentOptions(themeName);

    return { ...CommonThemeOptions, components };
};

export function getComponentOptions(themeName: ThemeNames) {
    const vars = AllVariables[themeName];

    return {
        ...componentsOptions,
        MuiCssBaseline: {
            styleOverrides: {
                ':root': vars,
                '*': {
                    boxSizing: 'border-box',
                },
                body: {
                    textRendering: 'optimizeLegibility',
                    WebkitFontSmoothing: 'antialiased',
                    backgroundColor: cssColor('--body-bg'),
                    color: cssColor('--body-text'),
                    WebkitTextSizeAdjust: '100%',
                    MozTextSizeAdjust: 'none',
                    msTextSizeAdjust: '100%',
                    font: "400 16px/1.5em 'Noto Sans', sans-serif",
                },
            },
        },
    };
}
