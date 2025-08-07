import styled from '@emotion/styled';
import type { MouseEvent } from 'react';

import { fontWeight, breakpoints, GenericColors, cssColor } from '@sc-ui/system';

import { S_ContentIcon } from 'src/ui/common/CountryListItem/styled';
import TabsBar from 'src/ui/common/TabsBar';
import type { Testable } from 'src/utils/Testable/types';

interface FilterItemProps extends Testable {
    onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
    centered?: boolean;
}

export const S_FilterWrapper = styled.div`
    font-size: 0.8em;
    position: relative;
    min-height: 38px;
    background: ${cssColor('--tabs-bg')};
    border-bottom: 1px solid ${cssColor('--tabs-border')};

    div.swiper-button-prev {
        left: 10px;
    }

    div.swiper-button-next {
        right: 10px;
    }
`;

export const FilterItem = styled(TabsBar.Link)<FilterItemProps>`
    font-size: 14px;
    margin: 0;
    text-transform: capitalize;
    padding: 2px 16px;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    text-align: center;
    flex: 1;
    z-index: 2;
    background-color: ${cssColor('--tabs-bg')};
    color: ${cssColor('--body-text')};

    align-items: center;
    height: 38px;

    ${(props): string => {
        const { bp600, bp500 } = breakpoints;

        const { centered = false, active = false } = props;

        let styles = `
            @media screen and (min-width: ${bp500}) {
                &:hover {
                    background-color: ${cssColor('--tabs-hover-bg')};
                }
            }

            @media screen and (max-width: ${bp500}) {
                background-color: ${active ? cssColor('--tabs-active-bg') : GenericColors.transparent};
            }
        `;

        if (centered) {
            styles += `
                justify-content: center;
            `;
        }

        if (active) {
            styles += `
                background-color: ${cssColor('--tabs-active-bg')};
                border-bottom: 2px solid ${cssColor('--tabs-active-border')};

                &:hover {
                    border-bottom: 2px solid ${cssColor('--tabs-active-border')};
                }
            `;
        }

        return `
            font-weight: ${fontWeight.semibold};

            ${styles}

            @media screen and (max-width: ${bp600}) {
                height: 39px;
            }
        `;
    }}
`;

export const S_CustomCompetitionIcon = styled(S_ContentIcon)`
    display: inline-block;
    align-self: center;
    margin-right: 4px;
`;
