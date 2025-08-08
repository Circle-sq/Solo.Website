import styled from '@emotion/styled';

import { fontWeight, DarkBluePalette, LightBluePalette, cssColor } from '@solo-ui/system';

export const S_Icon = styled.span`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 16px;
    width: 16px;
    background-color: transparent;
    border-radius: 50%;

    &::after {
        content: '';
        position: absolute;
        display: none;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${LightBluePalette.lightBlue6};
    }

    border: 2px solid ${DarkBluePalette.darkBlue5};

    &[aria-checked='true'] {
        border: 2px solid ${LightBluePalette.lightBlue6};
    }
`;

export const S_Input = styled.input`
    position: absolute;
    opacity: 1;
    cursor: pointer;
    height: 0;
    width: 0;

    &[aria-checked='true'] {
        & ~ ${S_Icon} {
            &::after {
                display: block;
            }
        }
    }
`;

export const S_RadioButtonWrapper = styled.label`
    display: block;
    position: relative;
    padding-left: 24px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 14px;
    line-height: 19px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: ${cssColor('--label-default-text')};
    font-weight: ${fontWeight.bold};

    &[aria-checked='true'] {
        color: ${cssColor('--label-primary-text')};
    }
`;
