import styled from '@emotion/styled';
import type { MouseEventHandler } from 'react';

import Spinner from 'src/assets/icons/Spinner';
import Link from 'src/utils/Router/Link';

import { getButtonSize, getButtonColors } from './helpers';
import type { ButtonSizes, Color } from './types';
import { fontWeight, LightBluePalette, radius } from '@solo-ui/system';

interface ButtonProps {
    size: ButtonSizes;
    className?: string;
    disabled: boolean;
    loading?: boolean;
    color?: Color;
    onClick?: MouseEventHandler;
}

const defaultBtn = ({ size, color, disabled }: ButtonProps): string => {
    let styles = `
        align-self: start;
        border: 0;
        cursor: pointer;
        display: inline-block;
        font-size: 15px;
        line-height: 1;
        margin: 0;
        text-decoration: none;
        transition: 0.2s ease background-color;

        &:active,
        &:focus {
            outline: 0;
        }

        border-radius: ${radius.selection};
        font-weight: ${fontWeight.bold};

        ${getButtonSize(size)}
        ${getButtonColors(color)}
    `;

    if (disabled) {
        styles += `
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        `;
    }

    return styles;
};

export const ActionLink = styled(Link)<ButtonProps>`
    ${defaultBtn};
`;

export const ActionButton = styled.button<ButtonProps>`
    ${defaultBtn};
`;

export const SpinnerIcon = styled(Spinner)`
    width: 50px;
    margin-left: 5px;
    fill: ${LightBluePalette.lightBlue11};
`;
