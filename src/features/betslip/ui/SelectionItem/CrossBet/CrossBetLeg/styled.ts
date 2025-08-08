import styled from '@emotion/styled';

import { fontWeight, DarkBluePalette, GenericColors, GreyPalette, cssColor } from '@solo-ui/system';

import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';

export const S_CrossBetLeg = styled.div`
    padding-left: 8px;
    position: relative;
    max-width: 300px;
`;

export const S_CrossbetSelectionWrapper = styled.div`
    line-height: 1em;
    display: flex;
    position: relative;
    color: ${GenericColors.white};

    &:last-of-type {
        margin-top: 8px;
    }
`;

export const S_ResultIconWrapper = styled.div`
    height: 15px;
    width: 16px;
    display: flex;
    align-items: center;

    &.first {
        &::before,
        &::after {
            content: '';
            border: 1px solid ${DarkBluePalette.darkBlue6};
            position: absolute;
            top: 7px;
            left: -6px;
            width: 7px;
            border-bottom: none;
            border-right: none;
            bottom: 7px;
        }

        &::after {
            transform: rotate(180deg) scaleX(-1);
            bottom: -16px;
        }
    }
`;

export const SelectionName = styled(TooltipTruncatedText)`
    font-size: 14px;
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 0 2px 0;
    max-width: 175px;
    font-weight: ${fontWeight.semibold};
    color: ${cssColor('--body-text')};
`;

export const S_SelectionMarketName = styled.span`
    font-size: 14px;
    line-height: 1;
    word-break: keep-all;
    position: relative;
    max-width: inherit;
    color: ${cssColor('--text-muted')};
    font-weight: ${fontWeight.medium};
`;

export const S_SelectionInfo = styled.div<{ isSingleTab: boolean }>`
    margin-left: 8px;
    flex-wrap: wrap;
    display: flex;
    flex: 1;
    gap: 8px;
    align-items: flex-start;
    flex-direction: column;

    ${({ isSingleTab = false }): string => {
        return `
            max-width: ${isSingleTab ? `240px` : `210px`};
        `;
    }}
`;

export const S_ScoreInfo = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-left: 16px;
    font-size: 14px;
    font-weight: ${fontWeight.bold};
    color: ${GreyPalette.grey7};
`;
