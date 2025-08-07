import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

import { fontWeight, GenericColors, cssColor } from '@sc-ui/system';

export const S_FreeBetBadgeWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
    margin-bottom: 6px;
`;

export const S_Chip = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 11px;
    background-color: ${cssColor('--chip-freebet-bg')};
`;

export const T_UpperBold = styled(Typography)`
    color: ${cssColor('--chip-freebet-text')};
    text-transform: uppercase;
    padding: 2px 4px;
    user-select: none;
    -webkit-tap-highlight-color: ${GenericColors.transparent};
    font-weight: 800;
`;

export const S_FreeBetDescription = styled.div`
    font-size: 10px;
    line-height: 14px;
    margin-bottom: 5px;
    overflow: hidden;
    font-weight: ${fontWeight.regular};
    color: ${cssColor('--body-text')};
`;

export const S_FreeBetValidity = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 8px;
    line-height: 11px;
    color: ${cssColor('--text-secondary')};
    font-weight: ${fontWeight.medium};
`;
