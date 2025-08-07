import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';

export const materialTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        //fontFamily: 'Noto Sans',
        body1: {
            fontSize: '14px',
        },
        body2: {
            fontSize: '10px',
        },
    },
});

export function MuiThemeProvider({ children }: PropsWithChildren) {
    return <ThemeProvider theme={materialTheme}>{children}</ThemeProvider>;
}
