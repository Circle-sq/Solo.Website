import type { ThemeOptions } from '@mui/material/styles';

import { breakpointsOptions } from '../customizations/breakpoints';
import { typographyOptions } from '../customizations/typography';

import { BeteastTheme } from './beteast-theme';

export const CommonThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        generic: {
            white: '#fff',
            black: '#000',
            transparent: 'transparent',
        },
    },
    star: BeteastTheme,
    breakpoints: breakpointsOptions,
    typography: typographyOptions,
};
