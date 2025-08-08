import styled from '@emotion/styled';

import { breakpoints, fontWeight, GenericColors, GreyPalette, LightBluePalette, Opacities } from '@solo-ui/system';

export const S_Tabs = styled.ul`
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    height: 40px;
`;

export const S_Tab = styled.li<{ active: boolean }>`
    flex: 1;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: ${fontWeight.regular};
    color: ${GenericColors.white};
    position: relative;

    @media (max-width: ${breakpoints.bp960}) {
        font-weight: ${fontWeight.bold};
    }

    ${(props): string => {
        const { active } = props;

        if (active) {
            return `
                padding-top: 1px;
                border-bottom: 2px solid ${LightBluePalette.lightBlue6};
                background-color: ${GreyPalette.grey1 + Opacities.opacity40};
            `;
        }

        return `
            border-bottom: 1px solid ${GenericColors.white + Opacities.opacity15};
            background-color: ${GreyPalette.grey1 + Opacities.opacity25};
        `;
    }}
`;
