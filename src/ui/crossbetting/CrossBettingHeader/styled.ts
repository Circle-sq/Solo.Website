import styled from '@emotion/styled';

import { fontWeight, breakpoints, DarkBluePalette, GreyPalette } from '@solo-ui/system';

export const S_Wrapper = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 9px 16px;
    background-color: ${DarkBluePalette.darkBlue4};
    text-transform: uppercase;

    button {
        margin-left: auto;
    }

    .cross-bet-header-logo {
        vertical-align: middle;
        margin-right: 8px;
        margin-top: -2px;
    }

    & > div:last-child {
        margin-left: auto;
    }

    @media (max-width: ${breakpoints.bp500}) {
        height: 28px;
        font-size: 12px;
    }
`;

export const S_PageName = styled.div`
    margin-left: 8px;
    text-transform: uppercase;
    color: ${GreyPalette.grey7};
    font-weight: ${fontWeight.semibold};
`;

export const S_SportLabel = styled.div`
    color: ${GreyPalette.grey7};
`;

export const S_Divider = styled.span`
    margin: auto 8px;
    background-color: ${DarkBluePalette.darkBlue5};
    width: 1px;
    height: 22px;

    @media (max-width: ${breakpoints.bp500}) {
        margin: 0 8px;
        height: 16px;
    }
`;

export const S_FilterButton = styled.button`
    display: flex;
    font-size: 14px;
    font-weight: ${fontWeight.bold};
    justify-content: center;
    background: none;
    border: none;
    height: 19px;
    align-items: center;
`;
