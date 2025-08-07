import styled from '@emotion/styled';

import { fontWeight, selections, breakpoints, dynamicContainers, DarkBluePalette, GreyPalette } from '@sc-ui/system';

import { S_ContentIcon } from 'src/ui/common/NavigationList/styled';

import type { SelectionColumnLabel } from './types';

export const S_HeaderGroup = styled.header`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    overflow: hidden;
    position: relative;
    font-size: 11px;
    padding-left: 12px;
    cursor: pointer;
    padding-right: 12px;
    height: 22px;
    color: ${GreyPalette.grey4};

    & > svg {
        font-size: 12px;
    }

    &:empty {
        display: none;
    }

    @media (max-width: ${breakpoints.bp680}) {
        margin-bottom: 8px;
        height: auto;
        padding-left: 7px;
        margin-right: 0;
    }
`;

export const S_GroupName = styled.h4<{ isGroupedByDate?: boolean }>`
    justify-content: center;
    margin: 0;
    overflow: hidden;
    padding-right: 8px;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: inherit;
    display: flex;
    align-items: center;
    color: ${GreyPalette.grey7};
    font-weight: ${fontWeight.semibold};
    font-size: ${({ isGroupedByDate = false }) => (isGroupedByDate ? '14px' : '16px')};

    @media (max-width: ${breakpoints.bp500}) {
        font-size: 12px;
    }
`;

export const S_GroupNameWrapper = styled.div`
    flex: 1 1 100%;
    margin: 0;
    overflow: hidden;
    padding-right: 8px;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    justify-content: flex-start;
`;

export const S_EventsCount = styled.span`
    margin: 0;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: ${fontWeight.semibold};
    color: ${GreyPalette.grey7};

    @media (max-width: ${breakpoints.bp500}) {
        font-size: 12px;
    }
`;

export const S_SelectionColumnLabel = styled.div<SelectionColumnLabel>`
    align-items: center;
    display: flex;
    justify-content: center;
    text-align: center;
    flex: 1;
    line-height: 1.5;
    color: ${DarkBluePalette.darkBlue6};
    margin-right: ${({ isAmericanSports }) => (isAmericanSports ? selections.gutter : '0')};

    &:last-of-type {
        margin-right: 0;
    }

    @media (max-width: ${breakpoints.bp600}) {
        margin-right: ${selections.gutter};

        &:last-of-type {
            margin-right: 0;
            margin-left: 0;
        }
    }
`;

export const S_GroupSelections = styled.div<{
    isAmericanSports?: boolean;
    isScoreboardSport: boolean;
    cols: number;
}>`
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    flex-direction: row;

    &:not(:empty) {
        max-height: 32px;
    }

    ${(props): string => {
        const { isAmericanSports, isScoreboardSport, cols } = props;
        const { bp1570, bp1536, bp1440, bp1366, bp1280, bp1279, bp1100, bp960, bp896, bp850, bp768, bp680, bp500 } =
            breakpoints;

        const { regular, american, scoreboard } = dynamicContainers;

        const container = isScoreboardSport ? scoreboard : regular;

        const DOUBLE_COLUMN = 2;

        const twoColsStyles =
            cols === DOUBLE_COLUMN
                ? `
                    &&& {
                        min-width: 160px;

                        @media(max-width: ${bp500}) {
                            min-width: ${container.bp500[cols]}px;
                        }
                        & > div {
                            flex: 0 1 33.3%;
                            @media(max-width: ${bp500}) {
                                flex: 1;
                            }
                        }
                    }
                `
                : ``;

        const defaultStyles = `
            min-width: ${container.bp1920[cols]}px;
            margin-right: ${container.bp1920.gap}px;
            font-size: 12px;

            &:last-of-type {
                margin-right: 0;
            }

            ${twoColsStyles};

            @media (max-width: ${bp1570}) {
                min-width: ${container.bp1570[cols]}px;
                margin-right: ${container.bp1570.gap}px;
            }

            @media (max-width: ${bp1536}) {
                min-width: ${container.bp1536[cols]}px;
                margin-right: ${container.bp1536.gap}px;
            }

            @media (max-width: ${bp1280}) {
                min-width: ${container.bp1280[cols]}px;
                margin-right: ${container.bp1280.gap}px;
            }

            @media (max-width: ${bp1279}) {
                min-width: ${container.bp1279[cols]}px;
                margin-right: ${container.bp1279.gap}px;
            }

            @media (max-width: ${bp1100}) {
                min-width: ${container.bp1100[cols]}px;
                margin-right: ${container.bp1100.gap}px;
            }

            @media (max-width: ${bp850}) {
                min-width: ${container.bp850[cols]}px;
                margin-right: ${container.bp850.gap}px;
            }

            @media (max-width: ${bp768}) {
                min-width: ${container.bp768[cols]}px;
                margin-right: ${container.bp768.gap}px;
            }

            @media (max-width: ${bp680}) {
                font-size: 10px;
            }

            @media (max-width: ${bp500}) {
                min-width: ${container.bp500[cols]}px;
                margin-right: 0;
            }
        `;

        const americanStyles = `
            min-width: ${american.bp1920}px;
            font-size: 12px;

            @media (max-width: ${bp1536}) {
                min-width: ${american.bp1536}px;
            }

            @media (max-width: ${bp1440}) {
                min-width: ${american.bp1440}px;
            }

            @media (max-width: ${bp1366}) {
                min-width: ${american.bp1366}px;
            }

            @media (max-width: ${bp1279}) {
                min-width: ${american.bp1279}px;
            }

            @media (max-width: ${bp960}) {
                min-width: ${american.bp960}px;
            }

            @media (max-width: ${bp896}) {
                min-width: ${american.bp896}px;
            }

            @media (max-width: ${bp680}) {
                min-width: ${american.bp680}px;
                font-size: 10px;
            }

            @media (max-width: ${bp500}) {
                min-width: ${american.bp500}px;
                margin-right: 0;
            }
        `;

        return isAmericanSports ? americanStyles : defaultStyles;
    }}
`;

export const S_CompetitionIcon = styled(S_ContentIcon)`
    position: relative;
`;

export const S_GroupNameSeparator = styled.span`
    width: 1px;
    height: 16px;
    margin: 0 8px;
    font-size: 11.8px;
    border-left: 1px solid ${DarkBluePalette.darkBlue5};
`;

export const S_MarginBox = styled.div`
    display: flex;
    margin-right: 8px;
    flex-direction: row;
    align-items: center;
`;
