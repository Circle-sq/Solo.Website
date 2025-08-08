import styled from '@emotion/styled';
import { formControlLabelClasses } from '@mui/material/FormControlLabel';

import {
    GreyPalette,
    DarkBluePalette,
    LightBluePalette,
    fontWeight,
    breakpoints,
    GenericColors,
} from '@solo-ui/system';

export const S_MarketFiltersWrapper = styled.div`
    display: flex;
    gap: 8px;
    user-select: none;
    font-size: 14px;
    flex-wrap: wrap;
    text-transform: capitalize;
    margin: 4px 0 12px;

    & > .${formControlLabelClasses.root} {
        margin-left: auto;
    }

    @media screen and (max-width: ${breakpoints.bp500}) {
        margin: 8px 0;
    }
`;

interface ButtonProps {
    isActive: boolean | undefined;
    disabled: boolean;
}

export const S_FilterButton = styled.button<ButtonProps>`
    cursor: pointer;
    border-radius: 20px;
    font-weight: ${fontWeight.medium};
    font-size: 12px;
    line-height: normal;
    padding: 3px 12px;
    background-color: ${DarkBluePalette.darkBlue2};

    color: ${GreyPalette.grey7};
    border: 1px solid ${DarkBluePalette.darkBlue4};

    @media screen and (max-width: ${breakpoints.bp500}) {
        height: 24px;
        display: flex;
        align-items: center;
        font-size: 10px;
        padding: 8px;
    }

    ${({ isActive = false, disabled = false }): string => {
        let styles = `
        `;

        if (isActive) {
            styles = `
                  background-color: ${LightBluePalette.lightBlue3};
                  border-color: ${LightBluePalette.lightBlue3};
                  color: ${GenericColors.white};
              `;
        }

        if (disabled) {
            styles += `
                cursor: default;
                color: ${DarkBluePalette.darkBlue5};
            `;
        }

        return styles;
    }};
`;
