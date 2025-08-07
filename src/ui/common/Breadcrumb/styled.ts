import styled from '@emotion/styled';

import { fontWeight, breakpoints, cssColor } from '@sc-ui/system';

import Link from 'src/utils/Router/Link';

export const S_Wrapper = styled.div`
    display: flex;
    position: relative;
    border-radius: 3px;
    margin-bottom: 12px;
    height: 46px;
    align-items: center;
    background: ${cssColor('--box-secondary-bg')};
    justify-content: space-between;

    @media (max-width: ${breakpoints.bp1279max}) {
        margin: 0 12px 0px 12px;
        border-radius: 0;
        height: 44px;
    }

    @media (max-width: ${breakpoints.bp500}) {
        margin: 0px;
        padding: 0;
    }
`;

export const BackButton = styled.button`
    border: 0;
    padding: 0;
    cursor: pointer;
    display: flex;
    border-right: 1px solid ${cssColor('--divider-primary-color')};
    background-color: ${cssColor('--button-text')};
`;

export const S_BreadcrumbLink = styled(Link)`
    text-decoration: none;
    font-size: 16px;
    align-items: center;
    display: flex;
    text-overflow: ellipsis;
    padding: 11px 8px;
    color: ${cssColor('--body-text')};
    font-weight: ${fontWeight.semibold};
    position: relative;

    @media (max-width: ${breakpoints.bp960}) {
        padding: 10px;
    }

    @media (max-width: ${breakpoints.bp500}) {
        font-size: 13px;
    }
`;

export const S_Separator = styled.span`
    margin: 0 6px;
`;

export const S_SwiperWrapper = styled.div`
    max-width: 92%;
    width: auto;
    overflow: hidden;

    .swiper-button-prev,
    .swiper-button-next {
        visibility: hidden;
    }

    .swiper-slide:not(:last-of-type) {
        & > ${S_BreadcrumbLink} {
            &:after {
                content: '';
                position: absolute;
                top: 50%;
                right: 0;
                margin-top: -8px;
                height: 16px;
                width: 1px;
                background: ${cssColor('--divider-default-color')};
            }
        }
    }
`;

export const S_LinksWrapper = styled.div`
    max-width: 92%;
    width: auto;
    overflow: hidden;
    padding: 0 8px;

    a {
        padding-left: 0;
        padding-right: 0;
    }
`;

export const S_LiveBreadcrumb = styled(S_BreadcrumbLink)`
    font-size: 12px;
    margin-left: auto;
`;

export const S_LiveBreadcrumbWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const S_Icon = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 5px;
`;

export const S_LiveBtnLabel = styled.span`
    font-style: italic;
    text-transform: uppercase;
    white-space: nowrap;
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
    font-weight: 900;
    color: ${cssColor('--text-live')};
    margin-right: 8px;
`;

export const S_LiveBtnCounter = styled.span`
    border-radius: 50%;
    height: 16px;
    width: 16px;
    color: ${cssColor('--badge-text')};
    background-color: ${cssColor('--badge-bg')};
    font-size: 11px;
    font-weight: ${fontWeight.semibold};
    line-height: 15px;
    text-align: center;
    margin-right: 8px;
`;

export const S_PaddingBox = styled.div`
    display: flex;
    padding: 9px 8px;

    @media (max-width: ${breakpoints.bp1280}) {
        padding: 5px 8px;
    }
`;

export const S_MarginBox = styled.div`
    display: flex;
    margin-right: 8px;
`;
