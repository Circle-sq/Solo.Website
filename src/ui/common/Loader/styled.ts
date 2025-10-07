import styled from '@emotion/styled';

import { GenericColors, GreyPalette, LightBluePalette, cssColor } from '@solo-ui/system';

export const S_Loading = styled.div`
    position: fixed;
    z-index: 2000;
    width: 100%;
    height: 100vh;
    pointer-events: all;
`;

export const S_LoadingContainer = styled.div`
    position: relative;
    width: 220px;
    height: 82px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export const S_LoadingImg = styled.img`
    position: absolute;
`;

export const S_LoadingImgColored = styled.img`
    position: absolute;
    animation: 2s fill ease-in-out infinite;
    animation-delay: -2s;

    @keyframes fill {
        0% {
            clip-path: inset(0 100% 0 0);
        }
        50% {
            clip-path: inset(0);
        }
        100% {
            clip-path: inset(0 0 0 100%);
        }
    }
`;

export const S_LoadingPlaceholder = styled.span`
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    transform: translateZ(0);
    animation: spinplaceholder 1s linear infinite;
    display: block;
    overflow: hidden;
    margin: auto;
    outline: 1px solid hsla(0, 0%, 100%, 0);
    border: 0.5rem solid ${GreyPalette.grey9};
    border-left-color: ${LightBluePalette.lightBlue6};
    margin-top: 2rem;

    @-webkit-keyframes spinplaceholder {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes spinplaceholder {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const S_LoadingPlaceholderLocal = styled.span`
    border-radius: 50%;
    width: 20px;
    height: 20px;
    transform: translateZ(0);
    animation: spinplaceholder 1s linear infinite;
    outline: 1px solid hsla(0, 0%, 100%, 0);
    border: 3px solid ${GreyPalette.grey9};
    border-left-color: ${cssColor('--box-secondary-border')};

    @-webkit-keyframes spinplaceholder {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @-moz-keyframes spinplaceholder {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes spinplaceholder {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const S_LoaderMessage = styled.span`
    color: ${GenericColors.white};
    font-size: 12px;
    text-indent: 10px;
`;

export const S_InitAppLoaderMessage = styled.span`
    font-size: 12px;
    text-indent: 10px;
    position: absolute;
    bottom: -30px;
    left: 50%;
    color: ${GreyPalette.grey4};
    transform: translateX(-50%);
    white-space: nowrap;
`;

export const S_LoaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7em;
`;
