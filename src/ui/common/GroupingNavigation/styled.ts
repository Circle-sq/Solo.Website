import styled from '@emotion/styled';

import { fontWeight, breakpoints, cssColor } from '@solo-ui/system';

import Link from 'src/utils/Router/Link';

export const S_GroupNavMenu = styled.nav<{ borderBottom?: boolean }>`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    background: ${cssColor('--body-bg')};
    padding-top: 7px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    ${(props): string => {
        const { borderBottom = true } = props;

        let styles = `
            font-size: 0.8em;
            position: relative;
            min-height: 32px;

            div.swiper-button-prev {
                left: 10px;
            }

            div.swiper-button-next {
                right: 10px;
            }
        `;

        if (borderBottom) {
            styles += `
                box-shadow: 0 1px 3px 1px ${cssColor('--tabs-shadow')};
                border-bottom: 1px solid ${cssColor('--tabs-border')};
            `;
        }

        return styles;
    }};
`;

export const GroupNavMenuLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    position: relative;
    text-align: center;
    padding: 0.7em 0.8em;
    margin: 0 0.4em;
    display: flex;
    font-size: 16px;
    align-items: center;

    &.active::after,
    &:hover::after {
        content: '';
        height: 3px;
        left: 0;
        right: 0;
        position: absolute;
        background-color: ${cssColor('--tabs-default-active-border')};
        font-weight: ${fontWeight.bold};

        @supports (-webkit-touch-callout: none) {
            bottom: 0.5px;
        }

        @supports not (-webkit-touch-callout: none) {
            bottom: 0;
        }
    }

    @media screen and (max-width: ${breakpoints.bp768}) {
        &:hover::after {
            content: none;
        }

        &.active::after {
            content: '';
        }
    }
`;

export const S_GroupNavMenuSpan = styled.span`
    font-family: inherit;
    display: block;
    font-size: 13px;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    color: ${cssColor('--text-info-color')};
    font-weight: ${fontWeight.bold};
`;
