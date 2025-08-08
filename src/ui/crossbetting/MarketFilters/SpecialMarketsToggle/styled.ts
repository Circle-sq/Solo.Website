import { styled } from '@mui/material/styles';
import Switch, { switchClasses } from '@mui/material/Switch';

import { cssColor } from '@solo-ui/system';

export const S_SpecialMarketsToggle = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',

    '&:active': {
        [`& .${switchClasses.thumb}`]: {
            width: 12,
            height: 12,
        },
        [`& .${switchClasses.switchBase}.${switchClasses.checked}`]: {
            transform: 'translateX(9px)',
        },
    },

    [`& .${switchClasses.switchBase}`]: {
        padding: 2,
        [`&.${switchClasses.checked}`]: {
            transform: 'translateX(12px)',
            [`& + .${switchClasses.track}`]: {
                background: `${cssColor('--link-text')}`,
                opacity: 1,
                ...theme.applyStyles('dark', {
                    backgroundColor: `${cssColor('--switch-primary-active-bg')}`,
                }),
            },
        },
    },

    [`& .${switchClasses.thumb}`]: {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        color: `${cssColor('--switch-thumb-primary-bg')}`,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },

    [`& .${switchClasses.track}`]: {
        borderRadius: 16 / 2,
        opacity: 1,
        boxSizing: 'border-box',
        ...theme.applyStyles('dark', {
            backgroundColor: `${cssColor('--switch-primary-disabled-bg')}`,
        }),
    },
}));
