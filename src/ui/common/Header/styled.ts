import styled from '@emotion/styled';

import { fontWeight, breakpoints, GreyPalette, LightBluePalette, cssColor } from '@solo-ui/system';

import Link from 'src/utils/Router/NewLink';

export const S_HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 99;

    &.navigationStandalone {
        margin-top: 5px;
    }

    @media (max-width: ${breakpoints.bp500}) {
        top: 0;
        position: sticky;
        background: ${cssColor('--body-bg')};
    }
`;

export const S_HeaderBox = styled.div`
    max-width: 1920px;
    margin: 0 auto;
    width: 100%;
`;

export const S_HeaderContainer = styled.header`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 80px;
    text-align: center;
    width: auto;
    z-index: 2;

    @media (max-width: ${breakpoints.bp1279max}) {
        display: flex;
        height: 50px;
        padding: 12px 12px;
        align-items: center;
        gap: 20px;
        flex-shrink: 0;
    }

    @media (max-width: ${breakpoints.bp500}) {
        padding: 8px 8px;
        gap: 15px;
    }
`;

export const S_HamburgerWrapper = styled.div`
    display: flex;
    margin-top: 5px;
    position: relative;
    cursor: pointer;
`;

export const MyBetsLink = styled(Link)<{ isActive: boolean }>`
    font-size: 12px;
    line-height: 20px;
    text-decoration: none;
    transition: all 0.2s ease;
    margin-left: auto;
    font-weight: ${fontWeight.bold};

    color: ${({ isActive }) => (isActive ? LightBluePalette.lightBlue6 : GreyPalette.grey7)};

    @media (min-width: ${breakpoints.bp960}) {
        &:hover {
            color: ${LightBluePalette.lightBlue9};
        }
    }
`;

export const LogoContainer = styled(Link)`
    display: flex;
    margin-top: 0;

    @media (max-width: ${breakpoints.bp960}) {
        top: 38px;
    }
    @media (min-width: ${breakpoints.bp1279max}) {
        margin-left: 11px;
    }
    @media (max-width: ${breakpoints.bp1279max}) {
        margin: -5px;
    }
`;
