import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@sc-ui/system';

export const S_SportTabs = styled.div`
    display: flex;
    border-bottom: 1px solid ${cssColor('--tabs-border')};
    background-color: ${cssColor('--tabs-bg')};
`;

export const S_SportTab = styled.button<{ isSelected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-size: 14px;
    font-weight: ${fontWeight.semibold};
    text-decoration: none;
    white-space: nowrap;
    text-transform: capitalize;

    border: none;
    padding: 8px 0;

    cursor: pointer;

    width: 100%;
    height: 35px;
    color: ${cssColor('--body-text')};
    ${({ isSelected }) =>
        isSelected
            ? `
        background-color: ${cssColor('--tabs-inline-active-bg')};
        border-bottom: 2px solid ${cssColor('--tabs-active-border')};
    `
            : `
        background-color: ${cssColor('--tabs-bg')};
        border-bottom: none;
    `}
`;

export const S_LiveDotIconWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
`;
