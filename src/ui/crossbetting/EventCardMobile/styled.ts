import styled from '@emotion/styled';

import { fontWeight, breakpoints, DarkBluePalette, GreyPalette, GenericColors } from '@sc-ui/system';

import Link from 'src/utils/Router/NewLink';

export const S_EventCardMobile = styled.div`
    display: grid;
    grid-template-rows: 1fr;
    flex-wrap: wrap;
    margin: 8px 0;
    font-size: 14px;
    grid-template-columns: 1fr;
    background-color: ${DarkBluePalette.darkBlue2};

    &:first-of-type {
        margin: 0 0 8px 0;
    }

    &:last-of-type {
        margin: 0;

        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
`;

export const S_EventCardMobileHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 6px;

    @media screen and (max-width: ${breakpoints.bp768}) {
        border: 0 none;
    }
`;

export const S_CardTimeMobile = styled.div`
    flex-basis: 100%;
    text-align: center;
    font-size: 12px;
    line-height: 19px;
    display: flex;
    padding: 6px 6px 6px 8px;
    grid-column: 1;
    justify-content: space-between;
    margin: 0;
    transform: none;
    color: ${GreyPalette.grey7};
    font-weight: ${fontWeight.medium};

    @media (min-width: ${breakpoints.bp500}) {
        font-size: 14px;
    }
`;

export const S_CardMoreLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    text-decoration: none;
    margin-left: 10px;
    min-width: fit-content;
    padding: 3px 8px;
    color: ${GreyPalette.grey7};
    font-weight: ${fontWeight.medium};

    @media (min-width: ${breakpoints.bp500}) {
        font-size: 14px;
    }
`;

export const S_MarketsMobile = styled.div`
    display: flex;
    flex-direction: column;
    padding: 6px;
    justify-content: center;
    max-width: 100%;
`;

export const S_ShowMoreMarkets = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 35px;
    font-size: 12px;
    color: ${GreyPalette.grey7};
    font-weight: ${fontWeight.medium};

    &:hover {
        color: ${GenericColors.white};
        svg path {
            fill: ${GenericColors.white};
        }
    }
`;

export const S_CrossBetMediaButton = styled.button`
    display: flex;
    margin-left: 10px;
    border: none;
    padding: 0;
    background-color: transparent;
    cursor: pointer;

    @media (min-width: ${breakpoints.bp500}) {
        margin-left: 16px;
    }

    &:hover path {
        fill: ${GenericColors.white};
    }
`;

export const S_MarginBox = styled.div`
    display: flex;
    margin-left: 5px;
`;

export const S_EventCardMarketFilters = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    .market-filters-wrapper {
        justify-content: space-evenly;
        flex: 1;
    }

    .market-item {
        width: 116px;
        display: flex;
        justify-content: center;
        border: 1px solid ${DarkBluePalette.darkBlue4};

        @media screen and (max-width: ${breakpoints.bp500}) {
            width: 67px;
            height: 23px;
            font-size: 10px;
        }
    }
`;
