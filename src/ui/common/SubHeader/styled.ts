import styled from '@emotion/styled';

import { breakpoints, cssColor, fontWeight } from '@sc-ui/system';

import Link from 'src/utils/Router/NewLink';

export const S_SubHeaderWrapper = styled.div`
    display: flex;
    height: 34px;
    gap: 12px;
    padding: 0 12px;
    margin-bottom: 7px;

    @media (max-width: ${breakpoints.bp1279max}) {
        margin-bottom: 12px;
    }

    @media (max-width: ${breakpoints.bp680}) {
        height: 28px;
    }

    @media (max-width: ${breakpoints.bp500}) {
        margin-bottom: 8px;
        padding: 0 8px;
        gap: 8px;
    }
`;

export const S_NavLink = styled(Link)<{ isActive: boolean }>`
    text-decoration: none;
    text-align: center;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: ${fontWeight.bold};
    text-transform: uppercase;
    color: ${cssColor('--navlink-text')};
    border-radius: 6px;
    background-color: ${({ isActive = false }): string =>
        isActive ? cssColor('--navlink-active-bg') : cssColor('--navlink-bg')};

    @media (max-width: ${breakpoints.bp680}) {
        font-size: 12px;
        font-weight: ${fontWeight.medium};

        &:nth-of-type(1),
        &:nth-of-type(2) {
            svg {
                font-size: initial;
            }
        }
    }
`;

export const S_TextWrapper = styled.span``;

export const S_Icon = styled.div`
    margin-right: 6px;
    display: flex;

    @media (max-width: ${breakpoints.bp680}) {
        margin-right: 4px;
    }
`;
