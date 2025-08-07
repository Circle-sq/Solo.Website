import styled from '@emotion/styled';

import { fontWeight, breakpoints, cssColor } from '@sc-ui/system';

export const S_MarketGroupContainer = styled.section`
    page-break-inside: avoid;
    break-inside: avoid-column;
    margin-bottom: 15px;
`;

export const S_TabList = styled.div`
    width: 100%;
    border: 0;
    border-left: 1px solid ${cssColor('--list-selection-item-border')};
    border-right: 1px solid ${cssColor('--list-selection-item-border')};
    background: ${cssColor('--tab-primary-bg')};
`;

export const S_TabButton = styled.button<{ isActive: boolean }>`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 0;
    flex: 1;
    max-width: 100%;
    min-height: 40px;
    margin-left: 4px;
    color: ${cssColor('--body-text')};
    cursor: pointer;
    font-weight: ${({ isActive = false }) => (isActive ? fontWeight.bold : fontWeight.regular)};

    &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 3px;
        background-color: ${cssColor('--tab-active-border')};
        opacity: ${({ isActive = false }) => (isActive ? '1' : '0')};
        transition: opacity 0.2s;
    }

    @media (min-width: ${breakpoints.bp768}) {
        &:hover:after {
            opacity: 1;
        }
    }
`;

export const S_TabTitle = styled.span`
    padding: 4px 4.8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: ${fontWeight.semibold};
`;

export const S_MarketGroupSpacing = styled.section`
    width: 100%;
    display: inline-block;
    break-inside: avoid-column;
`;

export const S_InfoIconWrapper = styled.span`
    cursor: pointer;
    background-color: ${cssColor('--button-text')};
    padding: 0;
    border: 0;
    margin-top: 3px;
`;
