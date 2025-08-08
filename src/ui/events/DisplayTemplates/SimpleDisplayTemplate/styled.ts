import styled from '@emotion/styled';

import { fontWeight, breakpoints, cssColor } from '@solo-ui/system';

import { S_MarketGroupContainer } from 'src/ui/events/MarketGroup/styled';
import { MARKET_TEMPLATES_SETTINGS, NUMBERS } from 'src/utils/constants';

import type { S_SelectionProps, S_SimpleDisplayTemplateProps } from '../types';

const { columns } = MARKET_TEMPLATES_SETTINGS;

export const S_SimpleDisplayTemplate = styled.div<S_SimpleDisplayTemplateProps>`
    font-size: 14px;
    flex-basis: 100%;
    width: 100%;
    white-space: nowrap;

    ${S_MarketGroupContainer} &:nth-last-of-type(-n+1) {
        border-bottom: none;
    }

    ${({ displayTemplate, selectionLength }): string => {
        let styles = `
            border-bottom: 1px solid ${cssColor('--list-selection-item-border')};
        `;

        const oneColumnStyles = `
            &.one-column {
                flex-basis: 100%;
                border-bottom: 1px solid ${cssColor('--list-selection-item-border')};
            }
        `;

        const twoColumnsStyles = `
            &.two-column {
                flex-basis: 50%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-right: 1px solid ${cssColor('--list-selection-item-border')};

                &:nth-of-type(2n) {
                    border-right: none;
                }
            }
        `;

        const selectionTowDivision = selectionLength % 2 === 0 ? true : false;

        if (columns.one.includes(displayTemplate)) {
            styles += `
                ${oneColumnStyles}
            `;
        }

        if (selectionLength < NUMBERS.selectionsMaxRow) {
            if (columns.two.includes(displayTemplate) || columns.three.includes(displayTemplate)) {
                if (selectionLength > 2 && selectionTowDivision) {
                    styles += `
                        &:nth-last-of-type(-n+2) {
                            border-bottom: none;
                        }
                    `;
                } else if (selectionLength > 2 && !selectionTowDivision) {
                    styles += `
                        &:nth-last-of-type(-n+1) {
                            border-bottom: none;
                        }
                    `;
                }

                styles += `
                    ${twoColumnsStyles}
                `;
            }
        }

        return `
            ${styles}
        `;
    }}
`;

export const S_Selection = styled.div<S_SelectionProps>`
    width: 100%;
    height: 100%;

    > div {
        width: 100%;
        height: 100%;
    }

    button {
        font-size: 12px;
        padding: 10px 15px;
        flex-direction: row;
        align-items: center;
        text-align: initial;
        background: ${cssColor('--button-text')};

        @media (max-width: ${breakpoints.bp1279}) and (min-width: ${breakpoints.bp768}) {
            justify-content: space-between;
            padding: 10px 25px;
        }

        > div {
            padding: 0 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        ${(props): string => {
            const { displayTemplate } = props;

            let styles = `
                font-weight: ${fontWeight.bold};
            `;

            if (columns.one.includes(displayTemplate) || columns.three.includes(displayTemplate)) {
                styles += `justify-content: space-between;`;
            } else {
                styles += `
                    justify-content: center;
                    padding: 10px 0;
                `;
            }

            return `
                ${styles}
                @media(max-width: ${breakpoints.bp768}) {
                    padding: 10px 8px;
                }
            `;
        }}
    }
`;
