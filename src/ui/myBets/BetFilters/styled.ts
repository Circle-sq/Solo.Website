import styled from '@emotion/styled';
import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';

import { fontWeight, radius, breakpoints, cssColor } from '@sc-ui/system';

import { S_BaseOverlay } from 'src/ui/common/Backdrop/styled';

export const S_Overlay = styled(S_BaseOverlay)`
    position: absolute;
    display: flex;
    justify-content: center;

    @media screen and (max-width: ${breakpoints.bp1280}) {
        position: fixed;
        bottom: 51px;
    }
`;

export const S_FiltersContainer = styled.div`
    min-height: 140px;
    margin: 30% auto;
    width: 95%;

    @media screen and (max-width: ${breakpoints.bp680}) {
        margin: 5% auto;
    }

    @media screen and (min-width: ${breakpoints.bp680}) and (max-width: ${breakpoints.bp1280}) {
        margin: 20% auto;
    }

    @media screen and (max-width: ${breakpoints.bp1280}) and (orientation: landscape) {
        margin: 5% auto;
    }
`;

export const S_Header = styled.div`
    padding: 10px;
    display: flex;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: ${cssColor('--modal-header-bg')};

    h3 {
        margin: 0;
        font-size: 16px;
    }
`;

export const S_ToggleButton = styled.button`
    border: none;
    background-color: ${cssColor('--button-text')};
    display: flex;
    align-items: center;
    padding: 4px 8px 0;
    margin-left: auto;
    line-height: 16px;
    cursor: pointer;
    font-size: 12px;
`;

export const S_CloseButton = styled.button`
    border: none;
    background-color: ${cssColor('--button-close-bg')};
    display: flex;
    margin-left: auto;
    cursor: pointer;
`;

export const S_Content = styled.div`
    padding: 8px 6px 12px 12px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    background-color: ${cssColor('--modal-body-bg')};
`;

export const S_ContentHeader = styled.h5`
    font-size: 14px;
    margin: 10px 0 5px;
    text-transform: capitalize;
`;

export const S_ShowResultButton = styled.button`
    font-size: 16px;
    text-align: center;
    width: calc(100% - 5px);
    flex: 1;
    padding: 10px 0;
    margin-top: 24px;
    border: none;
    cursor: pointer;
    font-weight: ${fontWeight.bold};
    border-radius: ${radius.main};
    background-color: ${cssColor('--button-contained-primary-bg')};
    color: ${cssColor('--body-text')};

    &:hover {
        background-color: ${cssColor('--button-contained-primary-hover-bg')};
    }
`;

export const S_Chip = styled.div`
    display: flex;
    align-items: center;
    margin-left: 5px;
    max-height: 24px;
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 20px;
    background-color: ${cssColor('--chip-info-bg')};
    font-weight: ${fontWeight.medium};
`;

export const S_RemoveFilterButton = styled.button`
    border: none;
    padding: 0;
    font-size: 10px;
    margin-left: 5px;
    cursor: pointer;
    display: flex;
    background-color: ${cssColor('--button-text')};

    &:hover {
        opacity: 0.8;
    }
`;

export const S_FilterToggleContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 8px 0 3px;
`;

export const S_DateRangeInfo = styled.div`
    display: flex;
    margin-top: 10px;
    color: ${cssColor('--text-info-color')};
`;

export const S_MarginBox = styled.div`
    display: flex;
    margin-top: 4px;
    margin-right: 7px;
`;

export const S_EmptyStatusMessage = styled.span`
    padding-left: 8px;
    font-weight: ${fontWeight.medium};
    font-size: 12px;
`;

export const S_RangePicker = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 20px;
    padding-right: 6px;
    width: 100%;
    }
`;

export const StyledTextField = styled(TextField)`
    & .MuiInputBase-root {
        background-color: ${cssColor('--input-DatePicker-bg')};
        color: ${cssColor('--body-text')};
        height: 43px;
        font-size: 14px;
        font-weight: ${fontWeight.medium};
        padding-right: 17px;
        font-family: 'Noto Sans', sans-serif;

        &.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: ${cssColor('--input-DatePicker-border-focused')} !important;
            border-width: 1px !important;
        }

        &:hover .MuiOutlinedInput-notchedOutline {
            border-color: ${cssColor('--input-DatePicker-border')};
        }
    }

    & {
        .MuiOutlinedInput-notchedOutline {
            border-color: ${cssColor('--input-DatePicker-border')};
            border-width: 1px;
        }
    }

    & {
        .MuiInputLabel-root,
        .MuiInputLabel-root.Mui-focused {
            color: ${cssColor('--body-text')};
            font-size: 14px;
            line-height: 1;
            font-family: 'Noto Sans', sans-serif;
        }
    }

    & .MuiIconButton-root {
        &:hover {
            background-color: ${cssColor('--icon-DatePicker-bg-hover')};
        }

        svg path {
            fill: ${cssColor('--icon-DatePicker-fill')};
        }
    }
`;

export const StyledPopper = styled(Popper)`
    &.MuiPickersPopper-root {
        z-index: 1300;
    }

    @media screen and (max-width: ${breakpoints.bp1055}) and (orientation: landscape) {
        position: relative;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
    }

    & .MuiPaper-root {
        border: none;
        border-radius: 4px;
        background-color: ${cssColor('--popper-DatePicker-bg')};
        color: ${cssColor('--popper-DatePicker-text')};
    }

    & .MuiPickersCalendarHeader-root {
        .MuiPickersCalendarHeader-labelContainer {
            .MuiPickersCalendarHeader-label {
                color: ${cssColor('--popper-DatePicker-text')};
                font-size: 14px;
                font-weight: ${fontWeight.bold};
                font-family: 'Noto Sans', sans-serif;
            }
        }

        .MuiPickersArrowSwitcher-root {
            padding-right: 10px;

            .MuiPickersArrowSwitcher-spacer {
                margin: 0 0 0 6px;
            }

            .MuiButtonBase-root {
                color: ${cssColor('--body-text')};
                font-size: 20px;

                &:hover {
                    background-color: ${cssColor('--button-DatePicker-arrow-bg-hover')};
                }
            }
        }
    }

    & .MuiButtonBase-root,
    & .MuiTypography-root {
        color: ${cssColor('--popper-DatePicker-text')};
        font-size: 12px;
        font-family: 'Noto Sans', sans-serif;
    }

    & .MuiButtonBase-root {
        font-weight: ${fontWeight.regular};
    }

    & .MuiTypography-root {
        font-weight: ${fontWeight.bold};
    }

    & .MuiButtonBase-root.MuiPickersDay-today {
        border: 1px solid ${cssColor('--button-DatePicker-today-border')};
    }

    & .MuiButtonBase-root.MuiPickersDay-root.Mui-selected {
        border: none;
        background-color: ${cssColor('--button-DatePicker-bg-selected')};
        font-weight: ${fontWeight.bold};
    }

    & .MuiButtonBase-root.MuiPickersDay-root:hover {
        border: none;
        background-color: ${cssColor('--button-DatePicker-bg-hover')};
        font-weight: ${fontWeight.regular};
    }

    &&& .MuiPickersYear-yearButton {
        font-family: 'Noto Sans', sans-serif;

        &.Mui-selected {
            background-color: ${cssColor('--button-DatePicker-bg-selected')};
            color: ${cssColor('--popper-DatePicker-text')};
            font-weight: ${fontWeight.bold};
        }
    }
`;
