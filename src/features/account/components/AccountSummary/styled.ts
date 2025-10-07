import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

import Checkbox from 'src/ui/common/Checkbox';
import { S_CheckmarkWrap } from 'src/ui/common/Checkbox/styled';

export const S_AccountSummary = styled.section`
    display: flex;
    flex-direction: column;
    margin: 10px 0 0 0;
    padding: 0 20px 18px 20px;
    overflow: hidden;
    background-color: ${cssColor('--box-default-bg')};
`;

export const S_AccountSummaryRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 2px;
    color: ${cssColor('--body-text')};
`;

export const S_BalanceInHeaderCheckbox = styled(Checkbox)`
    ${({ isChecked }) => {
        return `
            ${S_CheckmarkWrap} {
                background-color: ${cssColor('--checkbox-generic-bg')};
                border-color: ${
                    isChecked ? cssColor('--checkbox-generic-border') : cssColor('--checkbox-default-border')
                };

                &:hover {
                    border-color: ${
                        isChecked ? cssColor('--checkbox-generic-border') : cssColor('--checkbox-default-border')
                    };
                }
            }
        `;
    }};
`;

export const S_RadioButton = styled.span<{ active: boolean }>`
    cursor: pointer;
    font-weight: ${fontWeight.medium};

    &:before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        transition: 100ms ease-in;
        border-radius: 50%;
        background-color: ${cssColor('--radio-bg')};
        border: 2px solid ${cssColor('--radio-border')};
        height: 18px;
        width: 18px;
    }

    &:hover {
        &:before {
            border-color: ${cssColor('--radio-hover-border')};
        }
    }

    ${({ active }) => {
        if (active) {
            return `
                &:before {
                    background-color: ${cssColor('--radio-active-bg')};
                    border-color: ${cssColor('--radio-active-border')};
                    box-shadow: inset 0 0 0 4px ${cssColor('--radio-active-shadow')};
                }
            `;
        }
    }};
`;

export const S_OddsRadioButtons = styled.div`
    display: flex;
`;

export const S_Gap = styled.div`
    margin-right: 8px;
`;
