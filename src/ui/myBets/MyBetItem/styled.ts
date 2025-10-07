import styled from '@emotion/styled';

import { fontWeight, breakpoints, GreyPalette, cssColor } from '@solo-ui/system';

import StatefulButton from 'src/ui/common/Button/StatefulButton';
import { EventRowActiveIcon, EventRowName } from 'src/ui/common/EventInfographics/styled';
import { S_LiveShort } from 'src/ui/common/LiveLabel/styled';
import { getPlaceButtonStyles } from 'src/ui/shared/betting-button-color-mixin';

import { S_OddPrice, S_SelectionOdd } from './SelectionOdd/styled';

export const S_BetStatusContainer = styled.div`
    display: flex;
    padding-top: 8px;
    line-height: 1;
    align-items: center;

    .multipleBet-liveLabel:before {
        content: none;
    }

    .multipleBet-liveLabel {
        height: 16px;
        line-height: 18px;
        padding-left: 0;
    }
`;

export const S_CashOutButton = styled(StatefulButton)<{ isCashOutLocked: boolean; isCashOutFulfilled: boolean }>`
    padding: 15px 10px;
    width: 100%;
    font-size: 16px;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-weight: ${fontWeight.bold};

    ${({ isCashOutLocked, isCashOutFulfilled, loading = false }): string => {
        let styles = ``;

        if (isCashOutFulfilled) {
            styles += `
                pointer-events: none;
                cursor: not-allowed;
                padding: 13px 10px;
                ${getPlaceButtonStyles({
                    borderColor: cssColor('--button-text'),
                    bgColor: cssColor('--button-success-bg'),
                    color: cssColor('--text-contained-success'),
                })}
            `;
        } else if (isCashOutLocked) {
            styles += getPlaceButtonStyles({
                borderColor: cssColor('--button-brand-disabled-border'),
                bgColor: cssColor('--button-brand-disabled-bg'),
                color: cssColor('--text-muted'),
            });
        } else if (loading) {
            styles += getPlaceButtonStyles({
                borderColor: cssColor('--button-disabled-border'),
                bgColor: cssColor('--button-disabled-bg'),
                color: cssColor('--button-disabled-text'),
                bgHoverColor: cssColor('--button-disabled-bg'),
                borderHoverColor: cssColor('--button-disabled-border'),
            });
        } else {
            styles += getPlaceButtonStyles({
                borderColor: cssColor('--button-default-border'),
                bgColor: cssColor('--button-default-bg'),
                color: cssColor('--body-text'),
                bgHoverColor: cssColor('--button-default-hover-bg'),
            });
        }

        return `
            ${styles}
        `;
    }}
`;

export const S_SuccessIconWrapper = styled.span`
    padding: 4px 3px;
    margin-right: 8px;
    border-radius: 50px;
`;

export const S_CashOutValue = styled.span`
    font-weight: ${fontWeight.bold};
    margin-left: 8px;
`;

export const S_MyBetItem = styled.li`
    margin: 16px 8px;
    list-style-type: none;
    overflow: hidden;
    border-radius: 5px;
    background-color: ${cssColor('--card-bg')};
`;

export const S_MyBetEventName = styled.div`
    color: ${cssColor('--body-text')};
    display: inline;
    font-size: 10px;
    line-height: 1;
    max-width: 225px;
    text-overflow: ellipsis;
    margin-right: 8px;
    font-weight: ${fontWeight.medium};
`;

export const S_SettledBetTime = styled.div`
    color: ${cssColor('--text-muted')};
    font-weight: ${fontWeight.regular};
    font-size: 12px;
`;

export const S_CashOutWrapper = styled.div`
    padding: 16px;
    display: flex;
    align-items: center;
`;

export const InfoIconWrapper = styled.div`
    padding-left: 16px;
    display: flex;
    align-items: center;

    .invisible {
        display: none;
    }
`;

export const S_IconLink = styled.button`
    display: flex;
    cursor: pointer;
    background-color: transparent;
    padding: 0;
    border: 0;
`;

export const VerticalDivider = styled.div`
    background-color: ${GreyPalette.grey4};
`;

export const S_MyBetEventInfographics = styled.div`
    margin: 12px 0 4px;
    line-height: 1.2rem;

    @media (min-width: ${breakpoints.bp500}) {
        line-height: 1.4rem;
    }

    ${S_LiveShort} {
        color: ${cssColor('--text-live')};
        position: static;
        font-size: 12px;
        align-self: center;
        margin-right: 8px;
        margin-bottom: -2px;
        padding-left: 0;

        &:before {
            content: none;
        }
    }

    ${EventRowName} {
        margin-top: 4px;
    }

    ${EventRowActiveIcon} {
        color: ${cssColor('--icon-active-color')};
    }

    ${S_SelectionOdd} {
        top: 22px;
    }

    ${S_OddPrice} {
        vertical-align: middle;

        @media (max-width: ${breakpoints.bp500}) {
            bottom: 3px;
        }
    }
`;

export const S_BetHeaderMain = styled.div`
    display: flex;
    align-items: center;
    flex: 1;

    ${VerticalDivider} {
        min-height: 1em;
    }
`;

export const S_BetHeaderTitle = styled.div`
    font-weight: ${fontWeight.semibold};
    display: flex;
    align-items: center;
    padding-right: 8px;
    text-transform: uppercase;
`;

export const S_BetHeaderRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    ${VerticalDivider} {
        min-height: 1em;
    }
`;

export const S_BetHeader = styled.div`
    display: block;
    position: relative;
    text-transform: none;
    width: 100%;
`;

export const S_BetHeaderBase = styled.div`
    border-bottom: 1px solid ${cssColor('--card-border')};
    display: flex;
    align-items: center;
    text-transform: uppercase;
    padding: 12px 16px;
    height: 42px;
`;

export const S_SingleBetHeader = styled(S_BetHeaderBase)`
    cursor: default;
`;

export const S_ContentDetails = styled.div<{ hasPadding?: boolean }>`
    padding: ${({ hasPadding = false }) => (hasPadding ? '16px' : '0')};
    font-weight: ${fontWeight.semibold};
    font-size: 14px;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: 100%;

    & > div:not(:last-of-type) {
        border-bottom: 1px solid ${cssColor('--card-border')};
    }
`;

export const S_SingleBetInfo = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 10px 16px 16px;
`;

export const S_MarginBox = styled.div`
    margin-right: 8px;
`;
