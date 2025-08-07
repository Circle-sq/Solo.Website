import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const S_OfferTimerWrapper = styled.div<{ bgColor: string }>`
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 16px 16px 0 16px;
    padding-left: 14px;
    border-radius: 4px;
    background-color: ${({ bgColor }) => bgColor};

    .icon {
        pointer-events: none;
        user-select: none;
    }
`;

export const S_RejectButton = styled.button`
    background-color: transparent;
    border: none;
    padding: 0;
    color: currentColor;
    cursor: pointer;
    text-decoration: underline;
`;

export const S_OfferMessage = styled(Typography)<{ textColor: string }>`
    padding: 10px 0;
    color: ${({ textColor }) => textColor};
`;
