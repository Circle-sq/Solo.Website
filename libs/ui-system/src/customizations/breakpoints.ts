import type { BreakpointsOptions } from '@mui/material/styles';

import { BreakPoints } from '../lib/breakpoints';

export const breakpointsOptions: BreakpointsOptions = {
    values: {
        xs: 0,
        sm: BreakPoints.phoneLandscape,
        md: BreakPoints.smallTablet,
        lg: BreakPoints.tablet,
        xl: BreakPoints.desktop,
    },
};
