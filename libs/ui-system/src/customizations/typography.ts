import type { Components, Theme } from '@mui/material';
import type { TypographyOptions } from '@mui/material/styles/createTypography';

import { fontWeight, typographyVariant } from '../lib/typography';

export const typographyOptions: TypographyOptions = {
    fontFamily: [
        'Noto Sans',
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
    ].join(','),
    h1: { ...typographyVariant.h1, fontWeight: fontWeight.semibold },
    h2: { ...typographyVariant.h2, fontWeight: fontWeight.semibold },
    h3: { ...typographyVariant.h3, fontWeight: fontWeight.semibold },
    h4: { ...typographyVariant.h4, fontWeight: fontWeight.semibold },
    body1: { ...typographyVariant.body1, fontWeight: fontWeight.regular },
    body2: { ...typographyVariant.body2, fontWeight: fontWeight.regular },
    body3: { ...typographyVariant.body3, fontWeight: fontWeight.regular },
    body4: { ...typographyVariant.body4, fontWeight: fontWeight.regular },
    body5: { ...typographyVariant.body5, fontWeight: fontWeight.regular },
};

export const typographyCustomizations: Components<Omit<Theme, 'components'>>['MuiTypography'] = {
    defaultProps: {
        variantMapping: {
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'h4',
            body1: 'p',
            body2: 'p',
            body3: 'p',
            body4: 'p',
            body5: 'p',
        },
    },
};
