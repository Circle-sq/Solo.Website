import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';

export const S_SingleBetItem = styled.div`
    margin-bottom: 8px;
    border-radius: 6px;
    background-color: ${cssColor('--list-primary-item-bg')};
`;

export const S_SingleBetHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    border-bottom: 1px solid ${cssColor('--list-primary-item-border')};
`;

export const S_SingleBetHeaderWrapper = styled.div`
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const S_SingleBetHeaderLabel = styled.div`
    padding-right: 8px;
    white-space: nowrap;
    text-transform: capitalize;
    line-height: 24px;
    display: flex;
    align-items: center;
    font-weight: ${fontWeight.semibold};
`;

export const S_SingleBetHeaderText = styled(TooltipTruncatedText)`
    padding-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${cssColor('--text-muted')};
    line-height: 24px;
`;

export const S_EventName = styled.div`
    display: flex;
    align-items: center;
    font-size: 10px;
    line-height: 1em;
    margin-top: 15px;
    padding-left: 24px;
    max-width: 170px;
    color: ${cssColor('--body-text')};

    .x-logo-icon {
        transform: scale(0.8);
        position: relative;

        path {
            fill: ${cssColor('--icon-tertiary-color')};
        }
    }
`;

export const S_EventNameText = styled.div`
    margin-left: 8px;
`;

export const S_LegStakeInfo = styled.div`
    text-align: right;
    margin-top: 4px;
`;
