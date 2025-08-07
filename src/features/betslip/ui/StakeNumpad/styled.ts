import styled from '@emotion/styled';

import { GenericColors, cssColor } from '@sc-ui/system';

export const S_Container = styled.div`
    padding-top: 7px;
    width: 100%;
`;

export const S_NumpadContainer = styled.div`
    display: inline-grid;
    grid-template-columns: repeat(7, auto);
    grid-template-rows: repeat(2, auto);
    width: 100%;
    padding-top: 7px;
`;

export const S_ControlButton = styled.button`
    border: 0;
    border-radius: 2px;
    cursor: pointer;
    font-size: 14px;
    padding: 9px;
    margin: 1px;
    background-color: ${cssColor('--button-numpad-bg')};
    color: ${cssColor('--body-text')};
    transition: all 0.2s;

    &:hover {
        background-color: ${cssColor('--button-numpad-hover-bg')};
    }

    &:active {
        background-color: ${cssColor('--button-numpad-active-bg')};
    }
`;

export const S_ControlFloat = styled(S_ControlButton)`
    grid-column: 6;
    grid-row-start: 2;
`;

export const S_ControlBackspace = styled(S_ControlButton)`
    grid-column: 6;
    grid-row-start: 1;
`;

export const S_ControlOkButton = styled(S_ControlButton)`
    grid-column: 7;
    grid-row-start: 1;
    grid-row-end: 3;
`;

export const S_PresetContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    grid-auto-flow: dense;
`;

export const S_PresetControlButton = styled.button`
    flex: 1 1 0;
    font-size: 14px;
    border-radius: 3px;
    cursor: pointer;
    padding: 2px 3px;
    height: 29px;
    line-height: 1.1;
    margin: 0;
    transition: all 0.2s;
    background-color: ${cssColor('--button-preset-bg')};
    color: ${cssColor('--body-text')};
    border: 1px solid ${GenericColors.transparent};

    &:hover {
        border: 1px solid ${cssColor('--button-preset-hover-border')};
        background-color: ${cssColor('--button-preset-hover-bg')};
    }

    & > svg {
        margin: 0;
    }
`;

export const S_MaxBetControlButton = styled.button`
    flex: 1;
    font-size: 14px;
    border-radius: 3px;
    cursor: pointer;
    margin: 0;
    padding: 2px 3px;
    height: 29px;
    line-height: 1.1;
    grid-column: 4;
    grid-row: 1;
    border: 1px solid ${cssColor('--button-max-stake-border')};
    background-color: ${cssColor('--button-max-stake-bg')};
    color: ${cssColor('--button-max-stake-text')};

    &:disabled {
        opacity: 0.5;
        cursor: default;
        border: 1px solid ${cssColor('--button-max-stake-disabled-border')};
        background-color: ${cssColor('--button-max-stake-disabled-bg')};
        color: ${cssColor('--button-max-stake-disabled-text')};
    }
`;
