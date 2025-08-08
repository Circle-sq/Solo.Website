import styled from '@emotion/styled';
import Typography, { type TypographyProps } from '@mui/material/Typography';

import { fontWeight, RedPalette, typographyColor } from '@solo-ui/system';

import { HIGHLIGHTS_HEIGHT, OFFSET_TOP } from '../utils/constants';

export const S_QuickBet = styled.div<{ duration: number }>`
    overflow: hidden;
    position: fixed;
    z-index: 9997;
    inset: auto 8px 0;
    margin: 0 auto;
    max-width: 480px;
    max-height: calc(100vh - ${OFFSET_TOP}px);
    max-height: calc(100dvh - ${OFFSET_TOP}px);
    display: flex;
    flex-direction: column;
    border-radius: 6px 6px 0 0;
    transition: transform ${({ duration }) => duration}ms ease;
`;

export const S_QuickBetBackdrop = styled.div`
    position: fixed;
    z-index: 9996;
    inset: ${OFFSET_TOP}px 0 0;
`;

/**
 * background-color: #3a3f5f (ioDarkBlue.400)
 * Not sure if we should use cssVar here, as the header only uses this color. This should be investigated once the Betslip component is themed.
 */
export const S_QuickBetHighlights = styled.button`
    position: relative;
    outline: none;
    cursor: pointer;
    flex: 1 0 auto;
    height: ${HIGHLIGHTS_HEIGHT}px;
    padding: 0 32px 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background-color: #3a3f5f;
    border: none;
    border-radius: 6px 6px 0 0;

    &:disabled {
        cursor: not-allowed;
    }
`;

export const S_Counter = styled(Typography)<TypographyProps>`
    flex-shrink: 0;
    padding: 0 4px;
    min-width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${typographyColor.white};
    font-weight: ${fontWeight.bold};
    background-color: ${RedPalette.red5};
    border-radius: 8px;
`;
