import { DarkBluePalette, GenericColors, GreenPalette, GreyPalette } from '@sc-ui/system';

import type { ButtonSizes, Color } from './types';

export const getButtonSize = (size: ButtonSizes): string => {
    switch (size) {
        case 'large':
            return `
                font-size: 18px;
                padding: 15px;
            `;

        case 'medium':
            return `
                font-size: 16px;
                padding: 12px 24px;
            `;

        case 'small':
            return `
                font-size: 14px;
                padding: 9px 12px;
            `;

        case 'xs':
            return `
                font-size: 10px;
                padding: 7px 12px;
            `;

        default:
            return `
                font-size: initial;
                padding: 12px;
            `;
    }
};

export const getButtonColors = (color?: Color): string => {
    switch (color) {
        case 'green':
            return `
                color: ${GenericColors.white};
                background-color: ${GreenPalette.green2};
                &:hover {
                    background-color: ${GreenPalette.green1};
                }
            `;

        case 'greenLight':
            return `
                color: ${GenericColors.white};
                background-color: ${GreenPalette.green2};
                &:hover {
                    background-color: ${GreenPalette.green1};
                }
            `;

        case 'grey':
            return `
                color: ${GenericColors.black};
                background-color: ${GenericColors.white};
                &:hover {
                    background-color: ${GreyPalette.grey6};
                }
            `;

        case 'greyLight':
            return `
                color: ${GreyPalette.grey7};
                background-color: ${GreyPalette.grey9};
                &:hover {
                    background-color: ${GreyPalette.grey6};
                }
            `;

        default:
            return `
                color: ${GreyPalette.grey7};
                background-color: ${DarkBluePalette.darkBlue4};
                &:hover {
                    background-color: ${DarkBluePalette.darkBlue7};
                }
            `;
    }
};
