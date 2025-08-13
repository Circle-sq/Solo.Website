import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import type { StoryProps } from '@storybook/blocks';
import type { Preview } from '@storybook/react';
import { themes as SbThemes, ThemeProvider, ensure as ensureTheme } from '@storybook/theming';
import type { FC, ReactNode } from 'react';

import { ThemeNames, getThemeOptions } from '@solo-ui/system';

/* eslint-disable-next-line */
import '../../../src_sassbuild/buildcss/main.css';
import { GlobalStyles } from './styles';
import './styles.css';

const preview: Preview = {
    parameters: {
        docs: {
            theme: SbThemes.dark,
        },
    },
};

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const SbProviders = (Story: FC<StoryProps>, context: any) => {
    const {
        parameters: { options = {}, docs = {} },
    } = context;

    let themeVars = docs.theme;

    if (!themeVars && options.theme) {
        themeVars = options.theme;
    }

    const theme = ensureTheme(themeVars);

    return (
        <ThemeProvider theme={theme}>
            <Story {...context} />
        </ThemeProvider>
    );
};

export const decorators = [
    // @storybook theme
    SbProviders,
    // @sc theme
    withThemeFromJSXProvider({
        themes: {
            blue: createTheme(getThemeOptions(ThemeNames.Blue)),
            neon: createTheme(getThemeOptions(ThemeNames.Neon)),
        },
        defaultTheme: ThemeNames.Blue,
        Provider: ({ theme, children }: { theme: object; children: ReactNode }) => (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        ),
        GlobalStyles,
    }),
];

export const tags = ['autodocs'];

export default preview;
