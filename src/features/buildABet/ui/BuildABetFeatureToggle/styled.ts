import styled from '@emotion/styled';

import { fontWeight, breakpoints, cssColor } from '@solo-ui/system';

export const S_BuildABetFeatureToggle = styled.div<{ checked: boolean }>`
    padding: 15px 12px;
    height: 32px;
    font-size: 12px;
    line-height: 1.2;
    display: flex;
    align-items: center;
    border-radius: 5px;
    font-weight: ${fontWeight.bold};
    background-color: ${({ checked }) => (checked ? cssColor('--toggle-active-bg') : cssColor('--toggle-default-bg'))};
`;

export const S_BuildABetLabel = styled.span`
    display: block;
    white-space: nowrap;
    font-size: 13px;
    line-height: 1.4;
    color: ${cssColor('--text-primary')};
    margin-right: 10px;
    user-select: none;
    font-weight: ${fontWeight.semibold};

    @media (max-width: ${breakpoints.bp768}) {
        display: none;
    }
`;

export const S_BuildABetToggleLabel = styled.div`
    flex: 1;
`;

export const S_Switch = styled.label`
    position: relative;
    display: block;
    width: 40px;
    height: 20px;
`;

export const S_Input = styled.input`
    display: none;
`;

export const S_Slider = styled.span<{ checked: boolean }>`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0.2s;
    border-radius: 24px;
    background-color: ${({ checked }) =>
        checked ? cssColor('--switch-warning-active-bg') : cssColor('--switch-default-bg')};

    &:before {
        color: ${cssColor('--switch-thumb-warning-bg')};
        background-color: ${({ checked }) =>
            checked ? cssColor('--switch-thumb-warning-active-bg') : cssColor('--switch-thumb-warning-bg')};
        transform: ${({ checked }) => (checked ? 'translateX(21px)' : 'none')};
        position: absolute;
        content: '';
        height: 12px;
        width: 12px;
        left: 4px;
        bottom: 4px;
        transition: 0.2s;
        border-radius: 50%;
    }
`;
