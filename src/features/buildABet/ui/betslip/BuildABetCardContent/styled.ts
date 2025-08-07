import { css } from '@emotion/css';
import styled from '@emotion/styled';

import { GreyPalette, cssColor } from '@sc-ui/system';

export const S_BuildABetCardContent = styled.div<{ showFadeInAnimation: boolean }>`
    display: flex;
    flex: 1;
    flex-wrap: wrap;

    ${({ showFadeInAnimation = false }) => {
        if (showFadeInAnimation) {
            return css`
                animation: 0.6s fadeIn;

                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
            `;
        }

        return '';
    }}
`;

export const S_CardSelection = styled.div`
    flex: 1;
    min-width: '170px';
`;

export const S_BuildABetCardEventName = styled.div<{ isSingleTab: boolean }>`
    max-width: ${({ isSingleTab = false }) => (isSingleTab ? '190px' : '275px')};
    color: ${GreyPalette.grey7};
    font-size: 10px;
    line-height: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const S_CardEventWrapper = styled.div<{ isSingleTab?: boolean }>`
    padding-left: ${({ isSingleTab = false }) => (isSingleTab ? '15px' : '5px')};
    display: flex;
    align-items: center;
    margin-top: 15px;
`;

export const S_BuildABetIconWrapper = styled.div`
    width: 20px;
    height: 16px;
    display: flex;
    align-items: center;
    margin-right: 5px;
`;

export const S_LiveName = styled.span<{ isDisabled?: boolean }>`
    opacity: ${({ isDisabled }) => (isDisabled ? 0.6 : 1)};
    color: ${cssColor('--text-live')};
    text-transform: uppercase;
    font-style: italic;
    margin-right: 0.9em;
    padding: 0 3px 0 7px;
    font-size: 11px;
    font-weight: 900;
    position: relative;
    border-radius: 2px 0 2px 0;

    &:before {
        content: '';
        position: absolute;
        border-color: ${`transparent transparent transparent ${cssColor('--text-live')}`};
        top: 30%;
        left: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 3px 0 3px 5px;
        transform: rotate(135deg);
        border-radius: 1px;
    }
`;

export const S_NameStakeWrapper = styled.div`
    display: flex;
    width: 100%;
`;
