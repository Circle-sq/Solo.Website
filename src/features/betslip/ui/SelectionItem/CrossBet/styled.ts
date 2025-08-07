import styled from '@emotion/styled';

import { fontWeight, GreyPalette, LightBluePalette, cssColor } from '@sc-ui/system';

import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';

export const S_CrossBet = styled.div<{ showFadeInAnimation: boolean }>`
    display: flex;
    flex: 1;
    flex-wrap: wrap;

    ${({ showFadeInAnimation = false }): string => {
        if (showFadeInAnimation) {
            return `
            animation: 0.6s fadeIn;

            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
              }
            `;
        }

        return '';
    }}
`;

export const S_CrossBetLeg = styled.div`
    flex: 1;
    min-width: 180px;
`;

export const S_CardEventName = styled(TooltipTruncatedText)<{ isSingleTab: boolean }>`
    font-size: 10px;
    line-height: 1.4em;
    color: ${GreyPalette.grey7};
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: ${fontWeight.medium};
    max-width: ${({ isSingleTab = false }) => (isSingleTab ? '190px' : '275px')};
`;

export const CardEventWrapper = styled.div<{ isSingleTab?: boolean }>`
    display: flex;
    align-items: center;
    margin-top: 15px;
    padding-left: ${({ isSingleTab = false }) => (isSingleTab ? '29px' : '5px')};

    .x-logo-icon {
        transform: scale(0.8);

        path {
            fill: ${LightBluePalette.lightBlue10};
        }
    }
`;

export const S_CrossBetIconWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 4px;
`;

export const S_LiveName = styled.span<{ isDisabled?: boolean }>`
    text-transform: uppercase;
    font-style: italic;
    margin-right: 4px;
    font-size: 12px;
    font-weight: 900;
    position: relative;
    border-radius: 2px 0 2px 0;
    text-wrap: nowrap;
    font-family: 'Roboto', sans-serif;

    ${({ isDisabled = false }): string => {
        let styles = `
            color: ${cssColor('--text-live')};

            &:before {
                border-color: transparent transparent transparent ${cssColor('--text-live')};
            }
        `;

        if (isDisabled) {
            styles += `
                opacity: 0.6;
            `;
        }

        return styles;
    }}
`;

export const NameStakeWrapper = styled.div`
    display: flex;
    width: 100%;
`;
