import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

export const S_BetIdContainer = styled.div`
    color: ${cssColor('--text-muted')};
`;

export const S_BetIdContent = styled.div`
    font-size: 14px;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: ${fontWeight.medium};
    border-top: 1px solid ${cssColor('--card-border')};
`;

export const S_BetIdContentContainer = styled.div`
    line-height: 1;
`;

export const S_BetIdContentLabel = styled.span`
    padding-left: 4px;
    line-height: 1;
    display: flex;
    align-items: center;

    > span {
        white-space: nowrap;
    }
    min-height: 20px;
`;

export const S_BetIdCopyIcon = styled.span`
    padding-right: 4px;
    position: relative;
    cursor: pointer;
`;

export const S_BetTime = styled.div<{ timeSettings?: string }>`
    font-size: 14px;
    font-weight: 500;
    line-height: 1em;
    display: inline-block;
    white-space: nowrap;
    color: ${cssColor('--text-muted')};

    ${({ timeSettings }): string => {
        return `
            font-size: ${timeSettings === 'startTime' ? '10px' : '14px'}
        `;
    }};
`;

export const S_CopiedBox = styled.div`
    padding: 2px 4px;
    display: flex;
    font-size: 12px;
    background-color: ${cssColor('--alert-inline-success-bg')};
    color: ${cssColor('--alert-inline-success-color')};

    span {
        margin-left: 4px;
        white-space: nowrap;
        margin-top: 2px;
    }
`;
