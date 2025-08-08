import styled from '@emotion/styled';

import { fontWeight, GreyPalette, cssColor } from '@solo-ui/system';

import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';

export const S_StandardLeg = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 150px;
`;

export const S_EventDetails = styled.div<{ isSingleTab?: boolean }>`
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: ${({ isSingleTab = false }) => (isSingleTab ? '220px' : '305px')};
`;

export const S_EventName = styled(TooltipTruncatedText)`
    color: ${cssColor('--body-text')};
    width: 100%;
    font-weight: ${fontWeight.medium};
`;

export const S_LiveName = styled.span<{ isDisabled?: boolean }>`
    text-transform: uppercase;
    font-style: italic;
    margin-right: 4px;
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
    font-weight: 900;
    position: relative;
    border-radius: 2px 0 2px 0;

    ${(props): string => {
        const { isDisabled } = props;

        let styles = ``;

        if (isDisabled === true) {
            styles += `
                opacity: 0.6;
            `;
        }

        return `
            color: ${cssColor('--text-live')};

            ${styles}
            &:before {
                border-color: transparent transparent transparent ${cssColor('--text-live')};
            }
        `;
    }}
`;

export const S_MarketName = styled.div`
    display: inline-block;
    color: ${cssColor('--text-muted')};
    font-weight: ${fontWeight.medium};
`;

export const S_SelectionName = styled.div<{ isSingleTab?: boolean }>`
    display: flex;
    font-size: 14px;
    line-height: 1em;
    text-align: left;
    align-items: center;
    margin-bottom: 8px;

    ${({ isSingleTab = false }): string => {
        let styles = `
            justify-content: ${isSingleTab ? 'start' : 'space-between'};
            font-weight: ${isSingleTab ? fontWeight.semibold : fontWeight.bold};
            color: ${cssColor('--body-text')};
        `;

        if (isSingleTab) {
            styles += `
                > div {
                    display: block;
                    font-weight: ${fontWeight.medium};
                }
            `;
        }

        return styles;
    }}
`;

export const S_SelectionEvent = styled.div<{ isSingleTab?: boolean }>`
    display: flex;
    justify-content: space-between;
    line-height: 1.3;
    text-align: left;
    font-size: 10px;
    color: ${GreyPalette.grey4};
    font-weight: ${({ isSingleTab = false }) => (isSingleTab ? fontWeight.medium : fontWeight.regular)};
`;

export const SelectionName = styled(TooltipTruncatedText)`
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 3px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 0 2px 0;
`;

export const SelectionNameWrapper = styled.div<{ isSingleTab?: boolean }>`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    ${({ isSingleTab = false }): string => {
        let styles = '';

        if (!isSingleTab) {
            styles = `
                flex-direction: column;
                align-items: flex-start;
            `;
        }

        styles += `
            max-width: ${isSingleTab ? `210px` : `240px`};
        `;

        return styles;
    }}
`;

export const S_StandardBet = styled.div`
    display: flex;
    flex: 1;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
`;

export const NameStakeWrapper = styled.div`
    display: flex;
    width: 100%;
`;
