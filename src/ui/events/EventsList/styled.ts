import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
    breakpoints,
    cssColor,
    DarkBluePalette,
    dynamicContainers,
    fontWeight,
    GenericColors,
    selections,
} from '@solo-ui/system';

import DropdownSelect from 'src/ui/common/DropdownSelect/DropdownSelect';

import { S_GroupName, S_HeaderGroup } from '../EventGroupHeader/styled';

const marketHeader = {
    columnWidth: '166px',
    columnGap: '16px',
};

export const S_EventList = styled.section<{ isLoadingUpcomingContent?: boolean }>`
    color: ${cssColor('--body-text')};

    ${({ isLoadingUpcomingContent = false }) => {
        let style = ``;

        if (isLoadingUpcomingContent) {
            style = `
                @media (min-width: ${breakpoints.bp960}) {
                    height: 70vh;
                }
            `;
        }

        style += `
            @media (max-width: ${breakpoints.bp680}) {
                padding: 0;
            }
        `;

        return style;
    }}
`;

export const S_SportIcon = styled.span`
    margin-right: 16px;

    @media (max-width: ${breakpoints.bp680}) {
        margin-right: 6px;
    }
`;

export const S_Header = styled.div<{ showSort: boolean }>`
    align-items: center;
    display: flex;
    padding-right: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    justify-content: flex-start;
    font-weight: ${fontWeight.bold};

    ${(props): string => {
        const { showSort } = props;

        return `
            @media(max-width: ${breakpoints.bp680}) {
                font-size: 14px;
                width: ${showSort ? '20px' : 'auto'};
                padding-left: 10px;
                padding-right: 16px;
                height: ${showSort ? '20px' : '19px'};
                margin-right: ${showSort ? '75px' : ''};
            }
        `;
    }}
`;

export const MarketDropdown = styled(DropdownSelect)<{ isAmericanSports: boolean }>`
    margin: 0;
    width: ${({ isAmericanSports }) => (isAmericanSports ? '100%' : marketHeader.columnWidth)};
    margin-right: ${marketHeader.columnGap};

    @media (max-width: ${breakpoints.bp600}) {
        width: ${marketHeader.columnWidth};
        margin-right: ${selections.gutter};
    }
`;

export const S_GroupSelects = styled.div<{ isAmericanSports: boolean }>`
    flex-grow: 0;
    flex-shrink: 0;
    font-size: 0.875em;
    white-space: nowrap;
    display: flex;
    margin-right: 12px;

    ${({ isAmericanSports }): string => {
        let style = `
            @media (max-width: ${breakpoints.bp500}) {
                max-width: 160px;
                width: 100%;

                &&& ${MarketDropdown} {
                    width: 100%;
                };
            }
        `;

        if (isAmericanSports) {
            style += `
                justify-content: flex-end;
            `;
        }

        return style;
    }}
`;

export const S_Panel = styled.div`
    padding-left: 11px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-height: 40px;
    padding-top: 16px;

    @media (max-width: ${breakpoints.bp680}) {
        justify-content: flex-start;
        max-height: 51px;
        padding: 12px 0 5px 0;
    }
`;

export const S_HeaderResponsiveContainer = styled.div<{
    isShowSortOrHeader: boolean;
    hasSportTemplateOptions: boolean;
}>`
    padding-bottom: 5px;

    ${(props) => {
        const { isShowSortOrHeader, hasSportTemplateOptions } = props;

        return css`
            & > ${S_HeaderGroup} {
                padding-left: 16px;
                padding-right: 12px;
            }

            @media (max-width: ${breakpoints.bp680}) {
                display: ${hasSportTemplateOptions ? '' : 'flex'};
                justify-content: ${isShowSortOrHeader
                    ? 'space-between'
                    : !isShowSortOrHeader && hasSportTemplateOptions
                    ? 'flex-start'
                    : 'flex-end'};
                flex-wrap: wrap;
                align-items: end;
                & > ${S_HeaderGroup} {
                    padding: 0 8px;
                    margin-right: 0;
                    padding-left: 0;
                    padding-right: 14px;
                    ${hasSportTemplateOptions &&
                    'width: 100%; display: flex; justify-content: flex-end; margin-bottom: 2px;'}
                }
            }

            @media (max-width: ${breakpoints.bp500}) {
                padding-bottom: 0;

                & > ${S_HeaderGroup} {
                    padding-right: 10px;
                    margin-bottom: ${hasSportTemplateOptions ? '6' : '8'}px;
                }
            }
        `;
    }}
`;

export const S_Message = styled.div`
    position: relative;
    padding: 10px 5px;
    text-align: center;
    font-size: 14px;
    color: ${GenericColors.white};
`;

export const S_HeaderGrouping = styled.div`
    & > ${S_HeaderGroup} {
        min-height: 38px;

        @media (max-width: ${breakpoints.bp680}) {
            margin-bottom: 0;
        }

        @media (max-width: ${breakpoints.bp500}) {
            min-height: 28px;
        }

        & > ${S_GroupName} {
            line-height: inherit;
            margin-right: auto;
        }
    }
`;

export const S_EventsGroup = styled.div`
    border-radius: 6px;
    margin-bottom: 12px;
    background-color: ${cssColor('--accordion-bg')};
    border: 1px solid ${cssColor('--accordion-border')};
    border-top: none;
    color: ${GenericColors.white};
`;

export const S_EventsRowWrapper = styled.div`
    border-radius: 6px;

    &:empty {
        display: none;
    }
`;

export const S_DropdownWrapper = styled.div<{ cols?: number; isAmericanSports: boolean; isScoreboardSport: boolean }>`
    ${(props): string => {
        const collNumber = 3;

        const { bp1570, bp1536, bp1440, bp1366, bp1280, bp1279, bp1100, bp960, bp896, bp850, bp768, bp680, bp500 } =
            breakpoints;
        const { cols = collNumber, isAmericanSports, isScoreboardSport } = props;
        const { regular, american, scoreboard } = dynamicContainers;

        const container = isScoreboardSport ? scoreboard : regular;

        const baseStyles = `
            margin-right: ${regular.bp1920.gap}px;
            &:last-of-type {
                margin-right: 0;
            }

            @media (max-width: ${bp1570}) {
                margin-right: ${container.bp1570.gap}px;
            }

            @media (max-width: ${bp1536}) {
                margin-right: ${container.bp1536.gap}px;
            }

            @media (max-width: ${bp1440}) {
                margin-right: ${container.bp1440.gap}px;
            }

            @media (max-width: ${bp1366}) {
                margin-right: ${container.bp1366.gap}px;
            }

            @media (max-width: ${bp1280}) {
                margin-right: ${container.bp1280.gap}px;
            }

            @media (max-width: ${bp1279}) {
                margin-right: ${container.bp1279.gap}px;
            }

            @media (max-width: ${bp1100}) {
                margin-right: ${container.bp1100.gap}px;
            }

            @media (max-width: ${bp960}) {
                margin-right: ${container.bp960.gap}px;
            }

            @media (max-width: ${bp896}) {
                margin-right: ${container.bp896.gap}px;
            }

            @media (max-width: ${bp850}) {
                margin-right: ${container.bp850.gap}px;
            }

            @media (max-width: ${bp768}) {
                margin-right: ${container.bp768.gap}px;
            }

            @media (max-width: ${bp680}) {
                margin-right: ${container.bp680.gap}px;
            }

            @media (max-width: ${bp500}) {
                margin-right: ${container.bp500.gap}px;
                width: 100%;
            }
        `;

        const regularStyles = `
            ${baseStyles}
            ${MarketDropdown} {
                margin-right: 0px;
                width: ${container.bp1920[cols]}px;

                min-width: 160px;

                @media (max-width: ${bp1570}) {
                    width: ${container.bp1570[cols]}px;
                }

                @media (max-width: ${bp1536}) {
                    width: ${container.bp1536[cols]}px;
                }

                @media (max-width: ${bp1440}) {
                    width: ${container.bp1440[cols]}px;
                }

                @media (max-width: ${bp1366}) {
                    width: ${container.bp1366[cols]}px;
                }

                @media (max-width: ${bp1280}) {
                    width: ${container.bp1280[cols]}px;
                }

                @media (max-width: ${bp1279}) {
                    width: ${container.bp1279[cols]}px;
                }

                @media (max-width: ${bp1100}) {
                    width: ${container.bp1100[cols]}px;
                }

                @media (max-width: ${bp960}) {
                    width: ${container.bp960[cols]}px;
                }

                @media (max-width: ${bp896}) {
                    width: ${container.bp896[cols]}px;
                }

                @media (max-width: ${bp850}) {
                    width: ${container.bp850[cols]}px;
                }

                @media (max-width: ${bp768}) {
                    width: ${container.bp768[cols]}px;
                }

                @media (max-width: ${bp680}) {
                    width: ${container.bp680[cols]}px;
                }

                @media (max-width: ${bp500}) {
                    width: ${container.bp500[cols]}px;
                }
            }
        `;

        const americanStyles = `
            ${MarketDropdown} {
                margin-right: 0px;
                width: ${american.bp1920}px;

                @media (max-width: ${bp1570}) {
                    width: ${american.bp1570}px;
                }

                @media (max-width: ${bp1536}) {
                    width: ${american.bp1536}px;
                }

                @media (max-width: ${bp1440}) {
                    width: ${american.bp1440}px;
                }

                @media (max-width: ${bp1366}) {
                    width: ${american.bp1366}px;
                }

                @media (max-width: ${bp1279}) {
                    width: ${american.bp1279}px;
                }

                @media (max-width: ${bp1100}) {
                    width: ${american.bp1100}px;
                }

                @media (max-width: ${bp960}) {
                    width: ${american.bp960}px;
                }

                @media (max-width: ${bp896}) {
                    width: ${american.bp896}px;
                }

                @media (max-width: ${bp850}) {
                    width: ${american.bp850}px;
                }

                @media (max-width: ${bp768}) {
                    width: ${american.bp768}px;
                }

                @media (max-width: ${bp680}) {
                    width: ${american.bp680}px;
                }

                @media (max-width: ${bp500}) {
                    width: ${american.bp500}px;
                }

            }

            @media (max-width: ${bp500}) {
                width: 100%;
            }
        `;

        return isAmericanSports ? americanStyles : regularStyles;
    }}
`;

export const S_Label = styled.div`
    margin-right: 16px;
    white-space: nowrap;
    font-family: 'Roboto', sans-serif;
    font-weight: ${fontWeight.semibold};
    color: ${DarkBluePalette.darkBlue6};
`;

export const S_EventListDivider = styled.hr`
    border-width: 0;
    height: 16px;
    margin: 0;
`;

export const S_SwiperButtonContainer = styled.div`
    display: flex;
    user-select: none;
    font-size: 12px;
    margin-right: 6px;
`;

export const S_FilterContainer = styled.div`
    display: flex;
    align-items: center;
    min-width: 110px;
    justify-content: flex-start;
    width: 100%;

    @media (max-width: ${breakpoints.bp680}) {
        max-width: 110px;
    }
`;
