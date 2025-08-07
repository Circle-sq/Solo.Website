import styled from '@emotion/styled';
import {
    backdropClasses,
    Dialog,
    dialogClasses,
    DialogContent,
    inputAdornmentClasses,
    inputBaseClasses,
    outlinedInputClasses,
    paperClasses,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { CloseIcon } from '@sc-ui/icons/svg';
import { breakpoints, cssColor, fontWeight } from '@sc-ui/system';

import Button from 'src/ui/common/Button/Button';
import { S_SwiperContainer } from 'src/ui/common/Carousel/styled';
import { S_CountOfGames, S_SubNavMenuNoLink, S_SubNavMenuSpan } from 'src/ui/common/SubNavigation/styled';

const { root: paperRoot } = paperClasses;
const { root: backDropRoot } = backdropClasses;
const { container: dialogContainer } = dialogClasses;
const { input, root: inputRoot } = inputBaseClasses;
const { notchedOutline } = outlinedInputClasses;
const { positionStart: startIcon, positionEnd: endIcon } = inputAdornmentClasses;

export const S_Dialog = styled(Dialog)`
    z-index: 99;

    & .${dialogContainer} {
        align-items: unset;
    }

    & .${backDropRoot} {
        background-color: ${cssColor('--overlay-bg')};
    }

    & .${paperRoot} {
        background-color: unset;
        box-shadow: none;
        background-image: none;
        border-radius: 3px;
        margin: 77px 0 0;

        @media (max-width: ${breakpoints.bp960}) {
            margin-top: 95px;
        }

        @media (max-width: ${breakpoints.bp500}) {
            margin-top: 10px;
            width: 100%;
            max-height: unset;
        }
    }
`;

export const S_DialogContent = styled(DialogContent)`
    flex: unset;
    display: flex;
    flex-direction: column;
    background-color: ${cssColor('--modal-body-bg')};
    max-height: 100%;
    overflow-y: hidden;
    padding: 0;
`;

export const S_Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    font-size: 16px;
    background-color: ${cssColor('--modal-header-bg')};

    svg {
        cursor: pointer;
    }
`;

export const S_Label = styled(Typography)`
    font-weight: ${fontWeight.medium};
    color: ${cssColor('--body-text')};
    padding-left: 6px;
`;

export const S_CloseIcon = styled(CloseIcon)`
    &:hover {
        opacity: 75%;
    }
`;

export const S_TextField = styled(TextField)`
    .${input} {
        height: unset;
        padding: 0;
        margin-top: -2px;
        line-height: 1.25;
        color: ${cssColor('--body-text')};
        font-weight: ${fontWeight.medium};

        &::placeholder {
            opacity: 1;
            font-size: 14px;
            font-weight: ${fontWeight.regular};
            color: ${cssColor('--input-placeholder-color')};
        }
    }

    .${inputRoot} {
        padding: 6px 12px;
        border-radius: 6px;
        outline: 2px solid ${cssColor('--input-search-border')};
    }

    .${notchedOutline} {
        border: none;
    }

    .${startIcon} {
        cursor: default;
        margin-right: 12px;
    }

    .${endIcon} {
        cursor: pointer;
        margin-left: 12px;
    }
`;

export const S_SwiperWrapper = styled(S_SwiperContainer)`
    padding: 0 10px;

    .swiper-slide {
        background-color: ${cssColor('--swiper-bg')};
    }

    .swiper-button-prev,
    .swiper-button-next {
        font-size: 0.75em;
    }

    .swiper-button-prev {
        left: 10px;
    }

    .swiper-button-next {
        right: 10px;
    }

    ${S_SubNavMenuSpan} {
        padding: 8px 4px 10px 4px;
    }
`;

export const S_SlideContent = styled(S_SubNavMenuNoLink)<{ isActive: boolean }>`
    width: 78px;
    border-bottom: 2px solid transparent;

    ${({ isActive }) =>
        isActive &&
        `border-bottom-color: ${cssColor('--swiper-slide-active-border-bottom')};
         background-color: ${cssColor('--swiper-slide-active-bg')};
    `};

    img {
        width: 24px;
        height: 24px;
        margin-right: unset;
    }

    ${S_CountOfGames} {
        width: auto;
        height: 14px;
        right: 12px;
        line-height: 1.8;
    }

    ${S_SubNavMenuSpan} {
        line-height: 0.8;
    }
`;

export const S_ScrollableWrapper = styled.div<{ hasScroll: boolean }>`
    padding-bottom: 18px;

    @media (max-width: ${breakpoints.bp500}) {
        padding-bottom: 12px;
    }

    ${({ hasScroll }) =>
        hasScroll &&
        `
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 4px;
            background-color: ${cssColor('--scrollbar-bg')};
        }

        &::-webkit-scrollbar-thumb {
            background-color: ${cssColor('--scrollbar-thumb-color')};
            border-radius: 3px;
        }

        @supports (-moz-appearance: none) {
            scrollbar-width: thin;
            scrollbar-color: ${cssColor('--scrollbar-thumb-color')} ${cssColor('--scrollbar-bg')};
        }
    `}
`;

export const S_EmptyResultsWrapper = styled(Stack)`
    gap: 12px;
    padding: 0 10px 12px;
`;

export const S_WarningMessageWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 4px;
    background-color: ${cssColor('--alert-warning-filled-bg')};
`;

export const S_FullWideButton = styled(Button)`
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    padding: 6px 10px;
    border-radius: 6px;
    background-color: ${cssColor('--button-bg')};

    svg:first-of-type {
        width: 40px;
    }

    svg:last-of-type {
        margin-left: auto;
    }

    &:hover {
        background-color: ${cssColor('--button-contained-secondary-hover-bg')};
    }
`;
