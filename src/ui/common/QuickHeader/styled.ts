import styled from '@emotion/styled';

import { fontWeight, breakpoints, DarkBluePalette, GenericColors, GreyPalette, YellowPalette } from '@solo-ui/system';

import Link from 'src/utils/Router/NewLink';

export const S_Wrapper = styled.div<{ isAuthenticated?: boolean }>`
    position: relative;
    width: 390px;
    display: flex;
    justify-content: flex-end;

    @media (max-width: ${breakpoints.bp1279max}) {
        width: auto;
        position: inherit;
    }
`;

export const S_LinkName = styled(Link)`
    font-size: 14px;
    text-decoration: none;
    text-align: right;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-right: 10px;
    color: ${GreyPalette.grey7};
    @media (max-width: ${breakpoints.bp960}) {
        width: auto;
        position: inherit;
    }
    @media (max-width: ${breakpoints.bp1279max}) {
        margin-right: 0;
    }
`;

export const S_UserBalanceLabel = styled('span')`
    font-size: 16px;
    display: block;
    font-weight: ${fontWeight.bold};
    color: ${GreyPalette.grey7};

    @media (max-width: ${breakpoints.bp500}) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    @media (max-width: ${breakpoints.bp1280}) {
        font-size: 12px;
    }
`;

export const S_UserBalanceWrapper = styled.div`
    max-width: 100%;
    position: relative;

    > div {
        position: absolute;
        bottom: 100%;
        right: 0;
    }
`;

export const S_FreeBetsBadge = styled.div`
    display: flex;
    height: 8px;
    border-radius: 4px;
    color: ${DarkBluePalette.darkBlue1};
    background-color: ${YellowPalette.yellow4};
`;

export const S_FreeBetsLabelWrapper = styled.div`
    font-size: 6px;
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    padding: 0 4px;
    user-select: none;
    -webkit-tap-highlight-color: ${GenericColors.transparent};
`;
