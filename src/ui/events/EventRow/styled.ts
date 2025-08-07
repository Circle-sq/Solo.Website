import styled from '@emotion/styled';

import {
    breakpoints,
    cssColor,
    DarkBluePalette,
    dynamicContainers,
    dynamicSelections,
    fontWeight,
} from '@sc-ui/system';

import { incrementBreakpointValue } from 'src/common/helpers/styled';
import { S_EventInfo, S_EventInfoParticipants, S_EventScore } from 'src/ui/common/EventInfographics/styled';
import { S_SelectionInlineLine } from 'src/ui/events/Selection/styled';
import { LANGUAGES, NUMBERS } from 'src/utils/constants';
import Link from 'src/utils/Router/NewLink';

export const EventLink = styled(Link)`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    position: relative;
    text-decoration: none;
    z-index: 1;
    border-bottom: 1px solid ${cssColor('--list-item-border')};
    align-items: center;
    padding: 11px 12px;
    color: ${cssColor('--body-text')};
    background-color: ${cssColor('--list-item-bg')};

    &:last-child {
        margin-bottom: 0;
        border-radius: 0 0 6px 6px;
        border-bottom: 0;
    }

    @media screen and (min-width: ${incrementBreakpointValue(breakpoints.bp960)}) {
        &:hover {
            background-color: ${cssColor('--list-item-hover-bg')};
        }
    }

    @media screen and (max-width: ${breakpoints.bp500}) {
        padding: 7px 8px;
    }
`;

export const S_EventInfographicsContainer = styled.div`
    min-width: 0;
    display: flex;
    flex: 1;

    @media (max-width: ${breakpoints.bp500}) {
        padding: 0;
    }
`;

export const S_EventInfographicsWrapper = styled(S_EventInfo)`
    width: 100%;
    padding-right: 16px;

    ${S_EventInfoParticipants}, ${S_EventScore} {
        width: 100%;
    }

    @media (max-width: ${breakpoints.bp500}) {
        padding: 0;
    }
`;

export const SelectionsContainer = styled.span<{
    isAmericanSports?: boolean;
    isScoreboardSport?: boolean;
    cols?: number;
}>`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    ${({ isAmericanSports = false, isScoreboardSport = false, cols = 3 }) => {
        const { bp1536, bp1366, bp1280, bp1279, bp960, bp896, bp500 } = breakpoints;
        const { regular: regularContainer, scoreboard: scoreboardContainer } = dynamicContainers;
        const { american } = dynamicSelections;

        const container = isScoreboardSport ? scoreboardContainer : regularContainer;

        const twoColsStyles =
            cols === 2
                ? `
                    justify-content: flex-end;
                    & > div {
                        flex: 0 1 30%;
                        @media(max-width: ${bp500}) {
                            flex: 1;
                        }
                    }
                `
                : '';

        const regularStyles = `
            flex-direction: row;
            width: ${container.bp1920[cols]}px;
            margin-right: ${container.bp1920.gap}px;

            min-width: 160px;

            &:last-of-type {
                margin-right: 0px;
            }

            ${twoColsStyles};

            @media(max-width: ${bp1536}) {
                width: ${container.bp1536[cols]}px;
                margin-right: ${container.bp1536.gap}px;
            }

            @media(max-width: ${bp1366}) {
                width: ${container.bp1366[cols]}px;
                margin-right: ${container.bp1366.gap}px;
            }

            @media(max-width: ${bp1280}) {
                width: ${container.bp1280[cols]}px;
                margin-right: ${container.bp1280.gap}px;
            }

            @media(max-width: ${bp1279}) {
                width: ${container.bp1279[cols]}px;
                margin-right: ${container.bp1279.gap}px;
            }

            @media(max-width: ${bp960}) {
                width: ${container.bp960[cols]}px;
                margin-right: ${container.bp960.gap}px;
            }

            @media(max-width: ${bp896}) {
                width: ${container.bp896[cols]}px;
                margin-right: ${container.bp896.gap}px;
            }

            @media(max-width: ${bp500}) {
                width: ${container.bp500[cols]}px;
                margin-right: ${container.bp500.gap}px;
                min-width: auto;
            }
        `;

        const americanStyles = `
            flex-direction: column;
            width: ${container.bp1920[cols]}px;
            margin-right: ${american.gap}px;

            &:last-of-type {
                margin-right: 0px;
            }

            @media(max-width: ${bp1536}) {
                width: ${container.bp1536[cols]}px;
            }

            @media(max-width: ${bp1366}) {
                width: ${container.bp1366[cols]}px;
            }

            @media(max-width: ${bp1280}) {
                width: ${container.bp1280[cols]}px;
            }

            @media(max-width: ${bp1279}) {
                width: ${container.bp1279[cols]}px;
            }

            @media(max-width: ${bp960}) {
                width: ${container.bp960[cols]}px;
            }

            @media(max-width: ${bp896}) {
                width: ${container.bp896[cols]}px;
            }

            @media(max-width: ${bp500}) {
                width: ${container.bp500[cols]}px;
            }
        `;

        return `
            ${isAmericanSports ? americanStyles : regularStyles}

            > div {
                width: 100%;
                height: 100%
            }

            && ${S_SelectionInlineLine} {
                font-size: 10px;
            }
        `;
    }}
`;

export const S_MetaGroup = styled.span`
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;

    ${() => {
        const { bp1570, bp1536, bp1440, bp1279, bp1100, bp960, bp850, bp768, bp680, bp500 } = breakpoints;
        const { regular: container } = dynamicContainers;

        const threexColumnGroups = [NUMBERS.three, NUMBERS.three, NUMBERS.three];
        const twoColumnGroups = [NUMBERS.three, NUMBERS.three];
        const oneColumnGroups = [NUMBERS.three];

        const totalGroupsWidthDefault = threexColumnGroups?.reduce(
            (sum, val) => sum + container.bp1920[val] + container.bp1920.gap,
            -container.bp1920.gap,
        );

        const totalGroupsWidth1570 = twoColumnGroups?.reduce(
            (sum, val) => sum + container.bp1570[val] + container.bp1570.gap,
            -container.bp1570.gap,
        );

        const totalGroupsWidth1536 = twoColumnGroups?.reduce(
            (sum, val) => sum + container.bp1536[val] + container.bp1536.gap,
            -container.bp1536.gap,
        );

        const totalGroupsWidth1440 = oneColumnGroups?.reduce(
            (sum, val) => sum + container.bp1440[val] + container.bp1440.gap,
            -container.bp1440.gap,
        );

        const totalGroupsWidth1279 = threexColumnGroups?.reduce(
            (sum, val) => sum + container.bp1279[val] + container.bp1279.gap,
            -container.bp1279.gap,
        );

        const totalGroupsWidth1100 = twoColumnGroups?.reduce(
            (sum, val) => sum + container.bp1100[val] + container.bp1100.gap,
            -container.bp1100.gap,
        );

        const totalGroupsWidth960 = threexColumnGroups?.reduce(
            (sum, val) => sum + container.bp960[val] + container.bp960.gap,
            -container.bp960.gap,
        );

        const totalGroupsWidth850 = twoColumnGroups?.reduce(
            (sum, val) => sum + container.bp850[val] + container.bp850.gap,
            -container.bp850.gap,
        );

        const totalGroupsWidth768 = twoColumnGroups?.reduce(
            (sum, val) => sum + container.bp768[val] + container.bp768.gap,
            -container.bp768.gap,
        );

        const totalGroupsWidth680 = oneColumnGroups?.reduce(
            (sum, val) => sum + container.bp680[val] + container.bp680.gap,
            -container.bp680.gap,
        );

        return `
            width: ${totalGroupsWidthDefault}px;

            @media (max-width: ${bp1570}) {
                width: ${totalGroupsWidth1570}px;
            }

            @media (max-width: ${bp1536}) {
                width: ${totalGroupsWidth1536}px;
            }

            @media (max-width: ${bp1440}) {
                width: ${totalGroupsWidth1440}px;
            }

            @media (max-width: ${bp1279}) {
                width: ${totalGroupsWidth1279}px;
            }

            @media (max-width: ${bp1100}) {
                width: ${totalGroupsWidth1100}px;
            }

            @media (max-width: ${bp960}) {
                width: ${totalGroupsWidth960}px;
            }

            @media (max-width: ${bp850}) {
                width: ${totalGroupsWidth850}px;
            }

            @media (max-width: ${bp768}) {
                width: ${totalGroupsWidth768}px;
            }

            @media (max-width: ${bp680}) {
                width: ${totalGroupsWidth680}px;
            }

            @media (max-width: ${bp500}) {
                width: auto;
            }
        `;
    }}
`;

export const S_AmericanSportMarketsContainer = styled.div`
    display: flex;
    width: 100%;
`;

export const S_AmericanSportWrapper = styled.div`
    display: flex;
    justify-content: flex-end;

    ${() => {
        const { bp1570, bp1536, bp1440, bp1366, bp1279, bp1100, bp960, bp896, bp850, bp768, bp680, bp500 } =
            breakpoints;
        const { american: container } = dynamicContainers;
        const { american: selection } = dynamicSelections;

        const containerHeight = selection.bp1920.height * 2 + selection.gap;
        const mobileContainerHeight = selection.bp500.height * 2 + selection.gap;

        return `
            width: ${container.bp1920}px;
            height: ${containerHeight}px;

            @media (max-width: ${bp1570}) {
                width: ${container.bp1570}px;
            }

            @media (max-width: ${bp1536}) {
                width: ${container.bp1536}px;
            }

            @media (max-width: ${bp1440}) {
                width: ${container.bp1440}px;
            }

            @media (max-width: ${bp1366}) {
                width: ${container.bp1366}px;
            }

            @media (max-width: ${bp1279}) {
                width: ${container.bp1279}px;
            }

            @media (max-width: ${bp1100}) {
                width: ${container.bp1100}px;
            }

            @media (max-width: ${bp960}) {
                width: ${container.bp960}px;
            }

            @media (max-width: ${bp896}) {
                width: ${container.bp896}px;
            }

            @media (max-width: ${bp850}) {
                width: ${container.bp850}px;
            }

            @media (max-width: ${bp768}) {
                width: ${container.bp768}px;
            }

            @media (max-width: ${bp680}) {
                width: ${container.bp680}px;
            }

            @media (max-width: ${bp500}) {
                width: ${container.bp500}px;
                height: ${mobileContainerHeight}px;
                margin: 0;
            }
        `;
    }}
`;

export const S_DefaultSport = styled.div<{ columnGroups?: number[]; hasMinWidth?: boolean }>`
    display: flex;
    justify-content: flex-end;

    ${({ columnGroups }) => {
        const { bp1536, bp1279, bp500 } = breakpoints;
        const { regular: container } = dynamicContainers;
        const { regular: selection } = dynamicSelections;

        const totalGroupsWidthDefault = columnGroups?.reduce(
            (sum, val) => sum + container.bp1920[val] + container.bp1920.gap,
            -container.bp1920.gap,
        );
        const totalGroupsWidth1536 = columnGroups?.reduce(
            (sum, val) => sum + container.bp1536[val] + container.bp1536.gap,
            -container.bp1536.gap,
        );
        const totalGroupsWidth1279 = columnGroups?.reduce(
            (sum, val) => sum + container.bp1279[val] + container.bp1279.gap,
            -container.bp1279.gap,
        );
        const totalGroupsWidth500 = columnGroups?.reduce(
            (sum, val) => sum + container.bp500[val] + container.bp500.gap,
            -container.bp500.gap,
        );

        const style = `
            width: ${totalGroupsWidthDefault}px;
            height: ${selection.bp1920.height}px;


            @media (max-width: ${bp1536}) {
                width: ${totalGroupsWidth1536}px;
                height: ${selection.bp1536.height}px;
            }

            @media (max-width: ${bp1279}) {
                width: ${totalGroupsWidth1279}px;
                height: ${selection.bp1279.height}px;
            }

            @media (max-width: ${bp500}) {
                width: ${totalGroupsWidth500}px;
                height: ${selection.bp500.height}px;
            }
        `;

        return style;
    }}
`;

export const S_ScoreboardSport = styled.div<{ columnGroups?: number[] }>`
    display: flex;
    justify-content: flex-end;

    ${({ columnGroups }) => {
        const { bp1536, bp1280, bp1279, bp500 } = breakpoints;
        const { scoreboard: container } = dynamicContainers;
        const { scoreboard: selection } = dynamicSelections;

        const totalGroupsWidthDefault = columnGroups?.reduce(
            (sum, val) => sum + container.bp1920[val] + container.bp1920.gap,
            -container.bp1920.gap,
        );
        const totalGroupsWidth1536 = columnGroups?.reduce(
            (sum, val) => sum + container.bp1536[val] + container.bp1536.gap,
            -container.bp1536.gap,
        );
        const totalGroupsWidth1280 = columnGroups?.reduce(
            (sum, val) => sum + container.bp1280[val] + container.bp1280.gap,
            -container.bp1280.gap,
        );
        const totalGroupsWidth1279 = columnGroups?.reduce(
            (sum, val) => sum + container.bp1279[val] + container.bp1279.gap,
            -container.bp1279.gap,
        );
        const totalGroupsWidth500 = columnGroups?.reduce(
            (sum, val) => sum + container.bp500[val] + container.bp500.gap,
            -container.bp500.gap,
        );

        const style = `
            width: ${totalGroupsWidthDefault}px;
            height: ${selection.bp1920.height}px;


            @media (max-width: ${bp1536}) {
                width: ${totalGroupsWidth1536}px;
                height: ${selection.bp1536.height}px;
            }

            @media (max-width: ${bp1280}) {
                width: ${totalGroupsWidth1280}px;
                height: ${selection.bp1280.height}px;
            }

            @media (max-width: ${bp1279}) {
                width: ${totalGroupsWidth1279}px;
                height: ${selection.bp1279.height}px;
            }

            @media (max-width: ${bp500}) {
                width: ${totalGroupsWidth500}px;
                height: ${selection.bp500.height}px;
            }
        `;

        return style;
    }}
`;

export const S_DefaultMore = styled(S_DefaultSport)`
    align-items: center;
    font-size: 16px;
    font-weight: ${fontWeight.bold};
    color: ${DarkBluePalette.darkBlue6};
    min-width: ${({ hasMinWidth = false }) => (hasMinWidth ? '100px' : '0')};
`;

export const S_AmericanMore = styled(S_AmericanSportWrapper)`
    align-items: center;
    font-size: 16px;
    font-weight: ${fontWeight.bold};
    color: ${DarkBluePalette.darkBlue6};
`;

export const S_ScoreboardMore = styled(S_ScoreboardSport)`
    align-items: center;
    font-size: 16px;
    font-weight: ${fontWeight.bold};
    color: ${DarkBluePalette.darkBlue6};
`;

export const S_MarginBox = styled.div<{ userLang: string | null }>`
    margin-left: 10px;
    margin-top: ${({ userLang }) => (userLang === LANGUAGES.english ? '1px' : '0')};
`;

export const S_AlignmentBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
`;
