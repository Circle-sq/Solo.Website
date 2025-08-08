import styled from '@emotion/styled';

import { fontWeight, selections, breakpoints, GreyPalette, GenericColors, cssColor } from '@solo-ui/system';

import { incrementBreakpointValue } from 'src/common/helpers/styled';
import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';

export const S_BaseSelection = styled.div`
    flex: 1;
    position: relative;
    height: 100%;
    text-align: center;
    text-decoration: none;

    &:first-of-type {
        margin-left: 0;
    }

    &:first-of-type {
        margin-top: 0;
    }
`;

export const S_NonAmericanSelection = styled(S_BaseSelection)`
    margin-top: 0;
    margin-left: ${selections.gutter};
`;

export const S_PureSelection = styled(S_BaseSelection)<{ isFractional?: boolean }>`
    margin-top: ${selections.gutter};
    margin-left: 0;
    font-size: ${({ isFractional = false }) => `${isFractional ? '13px' : '14px'}`};
`;

export const S_Selection = styled(S_BaseSelection)<{ isFractional?: boolean; isAmericanSports?: boolean }>`
    ${({ isFractional = false, isAmericanSports = false }) => {
        let styles = '';

        if (isFractional) {
            styles += `
                font-size: 13px;
            `;
        } else {
            styles += `
                font-size: ${isAmericanSports ? '12px' : '14px'};
            `;
        }

        return `
            margin-left: ${isAmericanSports ? '0' : selections.gutter};
            margin-top: ${isAmericanSports ? selections.gutter : '0'};
            ${styles}
        `;
    }}
`;

export const S_EmptySelectionWrapper = styled(S_Selection)`
    > button {
        color: ${GreyPalette.grey7};
        background-color: ${GenericColors.transparent};

        &:hover {
            background-color: ${GenericColors.transparent};
        }
    }
`;

export const S_SelectionName = styled.span<{ isEventPage?: boolean }>`
    display: flex;
    overflow: hidden;
    max-width: 80%;
    left: 0.7vw;

    ${({ isEventPage = false }) => {
        const { bp768, bp1120, bp1279, bp1536 } = breakpoints;

        return `
            text-transform: ${isEventPage ? 'unset' : 'capitalize'};
            color: ${cssColor('--text-default-color')};
            font-weight: ${fontWeight.regular};

            @media(min-width: ${incrementBreakpointValue(bp768)}) and (max-width: ${bp1120}) {
                padding-right: 5px;
                margin-left: -15px;
                position: initial;
                right: unset;
                left: unset;
            }

            @media(min-width: ${bp1279}) and (max-width: ${bp1536}) {
                position: initial;
                right: unset;
                left: unset;
            }
        `;
    }}
`;

export const S_SelectionNameValue = styled(TooltipTruncatedText)`
    display: block;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 0.85;

    @media (max-width: ${breakpoints.bp768}) {
        padding: 0 10px 0 2px;
    }
`;

export const S_SelectionInlineLine = styled.span<{ isHighlighted?: boolean; isSelected?: boolean }>`
    font-size: 10px;
    text-align: center;
    line-height: 1;
    position: relative;
    top: 1px;
    opacity: 0.85;
    font-weight: ${fontWeight.regular};
    color: ${cssColor('--text-tertiary')};

    &:empty {
        display: none;
    }

    ${({ isHighlighted, isSelected }) => {
        let styles = '';

        if (isHighlighted) {
            styles += `
                font-size: 12px;
                position: absolute;
                text-align: left;
                padding-bottom: 0;
                color: ${cssColor('--text-tertiary')};
            `;
        }

        if (isSelected) {
            styles += `
                color: ${cssColor('--body-text')};
            `;
        }

        return styles;
    }}
`;
