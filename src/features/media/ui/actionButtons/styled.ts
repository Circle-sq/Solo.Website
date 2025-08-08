import styled from '@emotion/styled';

import { cssColor } from '@solo-ui/system';

export const S_IconsWrapper = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 16px;
    padding: 0 16px 0 8px;
    gap: 10px;
`;

export const S_StatisticsWrapper = styled.div`
    display: flex;
    align-items: center;
    text-decoration: none;

    & > * {
        text-decoration: none !important;
        display: flex !important;
        width: auto !important;
        color: ${cssColor('--text-secondary')};

        &:hover {
            color: white;
        }
    }

    &:empty {
        display: none;
    }
`;

export const S_AlignmentBox = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    svg path {
        fill: ${cssColor('--icon-color')};
    }

    &:hover svg path {
        fill: ${cssColor('--icon-light-color')};
    }
`;
