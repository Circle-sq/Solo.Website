import styled from '@emotion/styled';

import { fontWeight, breakpoints, cssColor } from '@solo-ui/system';

import { S_SelectionMarketName } from 'src/ui/common/SelectionMarketName/styled';

export const S_SelectionOdd = styled.span`
    background-color: ${cssColor('--chip-betslip-bg')};
    font-weight: ${fontWeight.bold};
    display: flex;
    align-items: center;
    position: absolute;
    padding: 0 8px;
    height: 20px;
    font-size: 14px;
    right: 15px;
    top: 20px;
    border: none;
    border-radius: 2px;

    &:after {
        content: '';
        position: absolute;
    }

    + ${S_SelectionMarketName} {
        max-width: 240px;

        @media (max-width: ${breakpoints.bp500}) {
            max-width: 210px;
        }

        @media (max-width: ${breakpoints.bp420}) {
            max-width: 190px;
        }
`;

export const S_OddPrice = styled.span`
    font-weight: ${fontWeight.bold};
`;
