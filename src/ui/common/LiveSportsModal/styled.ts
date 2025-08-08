import styled from '@emotion/styled';

import { fontWeight, breakpoints, cssColor } from '@solo-ui/system';

import Link from 'src/utils/Router/Link';

export const S_Wrapper = styled.div<{ isVisible?: boolean }>`
    height: 143px;
    background: ${cssColor('--body-bg')};
    transition: all 0.5s ease;
    position: relative;
    top: ${({ isVisible = false }) => (isVisible ? '0px' : '-200px')};
`;

export const S_LinkWrapper = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(4, auto);
`;

export const S_LinkLabel = styled.span`
    margin-left: 8px;
`;

export const S_EventsCounterContainer = styled.span`
    position: absolute;
    right: 8px;
    min-width: 10px;
    padding: 0 3px;
    height: 12px;
    line-height: 12px;
    font-size: 9px;
    border-radius: 2px;
    align-self: center;
    text-align: center;
    background: ${cssColor('--chip-az-bg')};
    color: ${cssColor('--body-text')};
    font-weight: ${fontWeight.semibold};

    @media (max-width: ${breakpoints.bp1280}) {
        width: 28px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
    }
`;

export const S_NavigationLink = styled(Link)`
    position: relative;
    overflow: hidden;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: none;
    padding: 10px;
    display: flex;
    line-height: 1.23;
    box-sizing: border-box;
    width: 220px;
    height: 32px;
    margin: 0 10px;

    color: ${cssColor('--body-text')};
    border-bottom: 1px solid ${cssColor('--list-az-item-border')};

    &:hover {
        background-color: ${cssColor('--list-az-item-hover-bg')};
    }

    &:before {
        font-size: 15px;
        margin-right: 8px;
    }

    @media (max-width: ${breakpoints.bp1280}) {
        width: 100%;
        flex: 0 50%;
        height: auto;
        margin: 0;
    }

    @media (max-width: ${breakpoints.bp600}) {
        flex: 0 0 100%;
    }
`;

export const S_DesktopContainer = styled.div<{ isVisible?: boolean }>`
    top: 65px;
    width: 100%;
    display: flex;
    left: calc(50% + 23px);
    justify-content: start;
    z-index: 9999;
    transform: translate(-50%);
    padding-bottom: 5px;
    overflow-y: hidden;
    position: absolute;
    max-width: ${breakpoints.bp1920};
    visibility: ${({ isVisible = false }) => `${isVisible ? 'visible' : 'hidden'}`};

    @media screen and (max-width: ${breakpoints.bp1280}) {
        display: none;
    }
`;
