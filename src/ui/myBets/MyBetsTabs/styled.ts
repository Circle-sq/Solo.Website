import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@sc-ui/system';

import Link from 'src/utils/Router/Link';

export const S_MyBetsTabs = styled.div`
    display: flex;
    font-size: 0.8em;
    position: relative;
    height: 50px;
    padding: 16px 10px;
`;

export const S_TabItem = styled(Link)<{ isSelected: boolean }>`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 14px;
    text-decoration: none;
    white-space: nowrap;
    text-transform: capitalize;
    z-index: 2;
    padding: 6px 10px;
    border-radius: 6px;
    width: 125px;
    height: 32px;
    margin-right: 10px;
    flex: 1;
    color: ${cssColor('--body-text')};
    background-color: ${cssColor('--button-contained-betslip-bg')};
    border: 1px solid ${cssColor('--button-contained-betslip-border')};
    font-weight: ${fontWeight.medium};
    color: ${cssColor('--body-text')};

    &:last-child {
        margin-right: 0;
    }

    ${({ isSelected }): string => {
        let styles = `
            &:hover {
                background-color: ${cssColor('--button-contained-betslip-hover-bg')};
            }
        `;

        if (isSelected) {
            styles += `
                background-color: ${cssColor('--button-outlined-betslip-bg')};
                border: 1px solid ${cssColor('--button-outlined-betslip-border')};

                &:hover {
                    border: 1px solid ${cssColor('--button-outlined-betslip-border')};
                }
            `;
        }

        return styles;
    }}
`;
