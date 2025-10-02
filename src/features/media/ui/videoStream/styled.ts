import styled from '@emotion/styled';

import { breakpoints, fontWeight, GenericColors, GreyPalette, cssColor } from '@solo-ui/system';

import Link from 'src/utils/Router/Link';

const mediaPlayerHeight = '236px';

export const S_MediaStreamPlayer = styled.div`
    position: relative;

    @media (max-width: ${breakpoints.bp500}) {
        margin: 0 -8px;
    }
`;

export const S_MediaStream = styled.div<{ isAuthenticated?: boolean; isHiddenPlayer?: boolean }>`
    position: relative;

    ${(props): string => {
        const { isHiddenPlayer = false } = props;

        if (isHiddenPlayer) {
            return `
                opacity: 0;
                visibility: hidden;
                height: 0;
            `;
        }

        return `
            height: ${mediaPlayerHeight} !important;
        `;
    }};

    iframe {
        height: 100%;
        width: 100%;
        border: none;

        &:hover {
            & + div {
                opacity: 1;
                visibility: visible;
            }
        }
    }

    @media (max-width: ${breakpoints.bp1279}) {
        .video-js {
            height: ${mediaPlayerHeight} !important;
        }

        .vjs-fluid:not(.vjs-audio-only-mode) {
            padding-top: 0 !important;
        }
    }

    #playercontainer {
        position: relative;
        width: 100% !important;
        height: 100% !important;

        > div {
            width: 100% !important;
            height: ${mediaPlayerHeight} !important;
            color: ${GenericColors.white};
        }

        .sravvpl_uiContainer {
            overflow: visible;
        }

        .sravvpl_settingsContainer {
            > div {
                justify-content: flex-end;
            }
        }

        .sravvpl_settingsContainer.sravvpl_overlayBackground {
            right: 8px !important;
            bottom: 30px !important;
            left: unset !important;
        }
    }

    ${(props): string => {
        const { isAuthenticated } = props;

        let styles = ``;

        if (isAuthenticated === false || isAuthenticated === undefined) {
            styles = `
                font-size: 14px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: ${cssColor('--box-default-bg')};
            `;
        }

        return styles;
    }}
`;

export const S_PlayerContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const S_PlayerLink = styled(Link)`
    padding: 0 3px;
    font-weight: ${fontWeight.bold};
    color: ${GenericColors.white};
`;

export const S_PlayerPseudoLink = styled.span`
    padding: 0 3px;
    cursor: pointer;
    text-decoration: underline;
    font-weight: ${fontWeight.bold};
    color: ${GenericColors.white};

    &:hover {
        text-decoration: none;
    }
`;

export const S_Notification = styled.div`
    text-align: center;
    padding: 11px 10px;
    font-size: 13px;
    line-height: 1;
    font-weight: ${fontWeight.bold};
    border-top: 1px solid ${GreyPalette.grey2};
`;

export const InfoMessage = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 1.4;
`;

export const S_MarginBox = styled.div`
    margin-right: 8px;
    display: flex;
`;
