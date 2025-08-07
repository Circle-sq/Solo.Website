import styled from '@emotion/styled';

import { GreyPalette, LightBluePalette } from '@sc-ui/system';

export const Switch = styled.label`
    position: relative;
    pointer-events: auto;
    display: block;
    width: 40px;
    height: 20px;
`;

export const Input = styled.input`
    display: none;
`;

export const Slider = styled.span<{ checked: boolean }>`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0.2s;
    border-radius: 24px;

    &:before {
        position: absolute;
        content: '';
        height: 12px;
        width: 12px;
        left: 4px;
        bottom: 4px;
        transition: 0.2s;
        border-radius: 50%;
    }

    ${(props): string => {
        const { checked } = props;

        let style = `
            background-color: ${GreyPalette.grey2};
            &::before {
                box-shadow: 0px 1px 4px ${GreyPalette.grey2};
                background-color: ${LightBluePalette.lightBlue6};
            }
        `;
        style +=
            checked &&
            `
            &::before {
                transform: translateX(21px);
            }`;

        return style;
    }}
`;
