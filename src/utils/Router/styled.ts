import styled from '@emotion/styled';
import { getButtonSize } from 'src/ui/common/Button/helpers';
import type { ButtonUniversalType } from './types';
import { DarkBluePalette, fontWeight, GreyPalette } from '@solo-ui/system';

export const NewLinkWrapper = styled.a<ButtonUniversalType>`
    ${({ size, isButton = false }): string => {
        if (isButton) {
            let styles = `
                display: inline-block;
                background-color: ${DarkBluePalette.darkBlue4};
                color: ${GreyPalette.grey7};
                font-weight: ${fontWeight.bold};
                line-height: 1;
                text-align: center;
                text-decoration: none;
                text-transform: uppercase;
                transition: .2s ease background-color;
                cursor: pointer;
                border: 0;
                margin: 0;

                &:active,
                &:focus {
                    outline: none;
                }

                &:hover {
                    background-color: ${DarkBluePalette.darkBlue7};
                }
            `;

            if (size !== undefined) {
                styles += `${getButtonSize(size)}`;
            }

            return styles;
        }

        return ``;
    }};
`;
