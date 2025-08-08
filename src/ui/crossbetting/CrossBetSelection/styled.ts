import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { cssColor, GreyPalette, fontWeight, breakpoints } from '@solo-ui/system';

import { incrementBreakpointValue } from 'src/common/helpers/styled';
import { S_BaseSelectionAction } from 'src/ui/events/Selection/SelectionAction/styled';
import { S_NonAmericanSelection } from 'src/ui/events/Selection/styled';

export const S_CrossBetSelection = styled(S_NonAmericanSelection)<{ isFractional?: boolean }>`
    font-size: ${({ isFractional = false }) => `${isFractional ? '13px' : '14px'}`};
`;

export const S_BaseAlignedSpan = styled.span<{ alignDirection: 'left' | 'right' }>`
    position: absolute;
    ${({ alignDirection }) => `${alignDirection}: 12px;`}
    font-size: 12px;
    opacity: 0.85;
    font-weight: ${fontWeight.semibold};
    margin: 0;

    @media (max-width: ${breakpoints.bp500}) {
        ${({ alignDirection }) => `${alignDirection}: 6px;`}
        font-size: 8px;
    }
`;

export const S_CrossBetSelectionName = styled(S_BaseAlignedSpan)`
    display: flex;
    overflow: hidden;
    text-transform: capitalize;
`;

export const S_IdentifierLabel = styled(S_BaseAlignedSpan)`
    min-width: auto;
`;

export const S_CrossBetSelectionIdentifier = styled.span`
    display: flex;
    position: absolute;
    justify-content: end;
    width: auto;
    min-width: 37px;
    max-width: 80%;
    margin-left: 30px;
    left: 35%;
    overflow: hidden;
    text-transform: capitalize;
    font-weight: ${fontWeight.regular};
    color: ${GreyPalette.grey5};

    ${() => {
        const { bp768, bp1120, bp1279, bp1536 } = breakpoints;

        return `
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

            @media(max-width: ${bp768}) {
                display: block;
                margin-left: 0;
                text-align: center;
            }
        `;
    }}
`;

export const S_CrossBetSelectionAction = styled(S_BaseSelectionAction)`
    ${({ isSelected = false, isHighlightedBuildABet = false }) => {
        if (isSelected && isHighlightedBuildABet) {
            return css`
                &&& {
                    background-color: ${cssColor('--button-warning-bg')};
                }

                &&&:hover {
                    background-color: ${cssColor('--button-warning-hover-bg')};
                }

                @media screen and (min-width: ${incrementBreakpointValue(breakpoints.bp960)}) {
                    &:hover {
                        & > span {
                            color: ${cssColor('--body-text')};
                        }
                    }
                }

                & > span {
                    color: ${cssColor('--body-text')};
                }
            `;
        }

        return `
            background-color: ${cssColor('--button-bg')};
        `;
    }}
`;
