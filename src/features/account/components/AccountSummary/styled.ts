import styled from '@emotion/styled';

import { fontWeight, GenericColors, GreyPalette, LightBluePalette, cssColor } from '@sc-ui/system';

import Checkbox from 'src/ui/common/Checkbox';
import { S_CheckmarkWrap } from 'src/ui/common/Checkbox/styled';
import Icon from 'src/ui/common/Icon/Icon';

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
                background-color: ${GenericColors.transparent};
                border-color: ${isChecked ? GenericColors.transparent : LightBluePalette.lightBlue5};

                &:hover {
                    border-color: ${isChecked ? GenericColors.transparent : LightBluePalette.lightBlue5};
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

export const S_HelpIcon = styled(Icon)`
    color: ${GreyPalette.grey7};
    display: inline-block;
    font-size: 1.2em;
    margin-left: 5px;
    opacity: 0.7;
`;

export const S_GiftIcon = styled(Icon)`
    display: inline-block;
    font-size: 1em;
    vertical-align: baseline;
    margin-right: 5px;
`;
