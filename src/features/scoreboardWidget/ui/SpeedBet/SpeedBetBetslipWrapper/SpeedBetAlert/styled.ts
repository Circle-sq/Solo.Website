import styled from '@emotion/styled';

import { DarkBluePalette, GreenPalette, LightBluePalette, RedPalette } from '@solo-ui/system';

import { type AlertVariant } from '../../../../enums';

export const S_SpeedBetAlert = styled.div<{ variant: AlertVariant }>`
    max-width: 324px;
    width: 100%;
    min-height: 70px;
    margin: 0 auto 12px;
    border-radius: 4px;
    padding: 10px 25px 10px 40px;
    position: relative;

    ${({ variant }) => {
        if (variant === 'success') {
            return `background: linear-gradient(90.01deg, ${GreenPalette.green2} -63.71%, ${DarkBluePalette.darkBlue2} 20.38%);`;
        }

        if (variant === 'error') {
            return `background: linear-gradient(90.01deg, ${RedPalette.red4} -63.71%, ${DarkBluePalette.darkBlue2} 20.38%);`;
        }

        if (variant === 'info' || variant === 'default') {
            return `background: linear-gradient(90.01deg, ${LightBluePalette.lightBlue6} -63.71%, ${DarkBluePalette.darkBlue2} 20.38%);`;
        }
    }}
`;

export const S_CloseButton = styled.button`
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
    position: absolute;
    padding: 0;
    top: 12px;
    right: 10px;
    display: flex;

    svg {
        font-size: 10px;
    }
`;

export const S_Icon = styled.div`
    position: absolute;
    top: 10px;
    left: 8px;
    display: flex;

    svg {
        font-size: 24px;
    }
`;
