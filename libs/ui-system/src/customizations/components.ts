import { type ThemeOptions } from '@mui/material/styles';

import { typographyCustomizations } from './typography';

export const componentsOptions: ThemeOptions['components'] = {
    MuiTypography: typographyCustomizations,
    MuiAccordion: {
        styleOverrides: {
            root: {
                borderRadius: '6px',
                backgroundColor: 'var(--mui-solo-accordion-background, royalblue)',
                borderColor: 'var(--mui-solo-accordion-border, royalblue)',
            },
        },
    }
};
