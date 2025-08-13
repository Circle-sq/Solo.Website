import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import { SoloTheme } from '@solo-ui/system';

import { materialTheme } from '../src/lib/theme';

import { GlobalStyles } from './styles';

/* eslint-disable-next-line */
import '../../../../src_sassbuild/buildcss/main.css';

const solo = {
    star: SoloTheme,
};

export const decorators = [
    withThemeFromJSXProvider({
        themes: {
            solo: solo,
        },
        defaultTheme: 'solo',
        Provider: EmotionThemeProvider,
        GlobalStyles,
    }),
    withThemeFromJSXProvider({
        themes: {
            dark: materialTheme,
        },
        defaultTheme: 'dark',
        Provider: MuiThemeProvider,
        GlobalStyles: CssBaseline,
    }),
];

export const tags = ['autodocs'];
