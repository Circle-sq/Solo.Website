import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

import { ModalRouteName } from 'src/common/enums';
import Checkbox from 'src/ui/common/Checkbox';
import { S_CheckmarkWrap } from 'src/ui/common/Checkbox/styled';

export const FreeBetsWrapper = styled.div`
    position: relative;
`;

export const FreeBetsDropdownWrapper = styled.div<{ isOpen: boolean }>`
    width: 294px;
    border-radius: 1px;

    ${(props): string => {
        const { isOpen } = props;

        return `
            display: ${isOpen ? 'block' : 'none'};
            position: ${isOpen ? 'absolute' : 'static'};
            left: 0;
            top: 20px;
            z-index: ${isOpen ? 99 : 1};
            background-color: ${cssColor('--popover-bg')};
        `;
    }}
`;

export const FreeBetsContainerHeader = styled.div`
    font-size: 14px;
    font-weight: ${fontWeight.semibold};
    padding: 8px;
    color: ${cssColor('--popover-text-color')};
    border-bottom: 1px solid ${cssColor('--box-primary-border')};
`;

export const FreeBetsContentHeader = styled.div`
    font-size: 12px;
    font-weight: 300;
    padding-right: 20px;
    color: cssColor('--text-quaternary');
`;

export const FreeBetsContent = styled.div`
    padding: 8px;
`;

export const FreeBetsLabel = styled.div<{ component?: string }>`
    display: flex;
    border-radius: 2px;
    height: 16px;

    div:last-of-type {
        padding-top: 1px;
    }

    ${(props): string => {
        const { component = ModalRouteName.Betslip } = props;

        return `
            color: ${cssColor('--chip-freebet-text')};
            cursor: ${component === 'myBets' ? 'initial' : 'pointer'};

            div:first-of-type {
                background-color: ${cssColor('--chip-freebet-bg')};
            }

            div {
                background-color: ${cssColor('--chip-freebet-bg')};
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            &:hover {

                div:not(:first-of-type) {
                    background-color: ${cssColor('--chip-freebet-bg')};
                }
            }

            div:first-of-type {
                border-right: 1px solid ${cssColor('--chip-default-border')};
            }
        `;
    }}
`;

export const FreeBetsLabelElWrapper = styled.div`
    font-size: 12px;
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    padding: 0 4px;
    user-select: none;
    -webkit-tap-highlight-color: ${cssColor('--chip-highlight-color')};
`;

export const CheckBoxIcon = styled(Checkbox)`
    display: flex;
    padding-right: 4px;

    ${(props): string => {
        const { isChecked } = props;

        return `
            ${S_CheckmarkWrap} {
                border-radius: 2px;
                border-color: ${cssColor('--checkbox-warning-border')};
                display: flex;
                justify-content: center;
                align-items: center;

                span:first-of-type {
                    display: flex;
                }

                &:hover {
                    border-color: ${
                        isChecked ? cssColor('--checkbox-text') : cssColor('--checkbox-warning-hover-border')
                    };
                }
            }
        `;
    }};
`;

export const FreeBetsSelect = styled.div<{ isOpen?: boolean; component?: string }>`
    position: relative;
    display: flex;
    align-items: flex-start;

    ${(props): string => {
        const { isOpen = false, component = 'selection' } = props;

        return `
            z-index: ${isOpen ? 2 : 'auto'};

            div:first-of-type {
                font-size: ${component === 'myBets' ? '8px' : '12px'};
            }
        `;
    }}
`;

export const S_FreeBetOverlay = styled.div<{ isActive: boolean }>`
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: auto;
    cursor: initial;
    background-color: ${cssColor('--overlay-secondary-bg')};
    display: ${({ isActive = false }) => (isActive ? 'block !important' : 'none')};
`;
