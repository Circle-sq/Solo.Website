import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import { BeteastTheme } from '@solo-ui/system';

import { materialTheme } from '../src/lib/theme';

import { GlobalStyles } from './styles';

/* eslint-disable-next-line */
import '../../../../src_sassbuild/buildcss/main.css';

const beteast = {
    star: BeteastTheme,
};

export const decorators = [
    withThemeFromJSXProvider({
        themes: {
            beteast,
        },
        defaultTheme: 'beteast',
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
