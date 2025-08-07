import { type ThemeOptions } from '@mui/material/styles';

import { typographyCustomizations } from './typography';

export const componentsOptions: ThemeOptions['components'] = {
    MuiTypography: typographyCustomizations,
    MuiAccordion: {
        styleOverrides: {
            root: {
                borderRadius: '6px',
                backgroundColor: 'var(--mui-sc-accordion-background, royalblue)',
                borderColor: 'var(--mui-sc-accordion-border, royalblue)',
            },
        },
    }
};
