import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

export const S_BuildABetHeaderTitle = styled.div`
    padding-right: 8px;
    gap: 8px;
    font-weight: ${fontWeight.bold};
    text-transform: uppercase;
    white-space: nowrap;
    line-height: 1em;
    display: flex;
    align-items: center;
`;

export const S_BuildABetResultIcon = styled.div`
    margin-top: 6px;
    height: 16px;
    width: 16px;
    display: flex;
    align-items: center;
`;

export const S_BuildABetSelection = styled.div<{ defaultIcon: boolean; iconBulb: boolean }>`
    gap: ${({ defaultIcon }) => (defaultIcon ? '8px' : '0')};
    position: relative;
    display: flex;

    svg {
        margin-left: ${({ iconBulb }) => (iconBulb ? '3px' : '0')};
    }

    &:nth-of-type(n) {
        &::before,
        &::after {
            background-color: ${cssColor('--icon-chain-border')};
            left: ${({ defaultIcon }) => (defaultIcon ? '7.5px' : '6.5px')};
            content: '';
            position: absolute;
            top: 12px;
            width: 1px;
            bottom: 7px;
        }

        &::after {
            transform: rotate(180deg) scaleX(-1);
            bottom: -16px;
        }
    }

    &:nth-last-of-type(1):not(:nth-of-type(1)) {
        &::before,
        &::after {
            display: none;
        }
    }

    ${S_BuildABetResultIcon} {
        svg {
            background-color: ${({ defaultIcon }) =>
                defaultIcon ? cssColor('--icon-chain-link-bg') : cssColor('--icon-chain-link-secondary-bg')};
            margin-left: ${({ defaultIcon }) => (!defaultIcon ? '3px' : '0')};
            z-index: 1;
        }
    }
`;

export const S_BuildABetContentItem = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 10px;
`;

export const S_BuildABetLeg = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 300px;

    ${S_BuildABetContentItem} & {
        padding-left: 1px;
    }
`;

export const S_BuildABetSelectionInfo = styled.div<{ isSingleTab: boolean }>`
    max-width: ${({ isSingleTab }) => (isSingleTab ? '240px' : '210px')};
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    flex: 1;
    gap: 0 8px;
`;

export const S_SelectionName = styled.span`
    font-weight: ${fontWeight.semibold};
    color: ${cssColor('--body-text')};
    font-size: 14px;
    line-height: 1.9;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 175px;
    width: 100%;
`;

export const S_MarketName = styled.span`
    font-weight: ${fontWeight.medium};
    color: ${cssColor('--text-muted')};
    font-size: 14px;
    line-height: 19px;
    word-break: keep-all;
    position: relative;
    max-width: inherit;
    width: 100%;
`;

export const S_SelectionEvent = styled.div`
    display: inline;
    font-size: 10px;
    min-height: 24px;
    max-width: 225px;
    text-overflow: ellipsis;
    margin-right: 4px;
    font-weight: ${fontWeight.medium};
`;

export const S_SelectionEventContainer = styled.div``;

export const S_MultiBetLegEvent = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    > div:only-child {
        padding-left: 33px;
    }
`;

export const S_BetStatusType = styled.span`
    svg circle {
        fill: ${cssColor('--icon-warning-fill-color')};
        stroke: ${cssColor('--icon-warning-stroke-color')};
    }
`;
