import styled from '@emotion/styled';

import { GenericColors, DarkBluePalette, GreenPalette, Opacities, RedPalette } from '@solo-ui/system';

export const S_StakeInput = styled.div`
    width: 130px;
    margin: 0 auto;
    position: relative;
`;

export const S_Input = styled.input<{ hasErrors: boolean }>`
    border: 1px solid ${DarkBluePalette.darkBlue4};
    font-size: 14px;
    color: ${GenericColors.white};
    height: 31px;
    width: 100%;
    border-radius: 3px;
    background-color: ${GenericColors.white + Opacities.opacity10};
    text-align: right;
    padding: 0 3px 0 24px;

    &:hover {
        border-color: ${DarkBluePalette.darkBlue6};
    }

    &:focus {
        border-color: ${GreenPalette.green1};
    }

    ${({ hasErrors = false }: { hasErrors?: boolean }) => {
        let styles = '';

        if (hasErrors) {
            styles += `
                border: 1px solid ${RedPalette.red4};

                &:hover {
                    border: 1px solid ${RedPalette.red4};
                }
                &:focus {
                    border: 1px solid ${RedPalette.red4};
                }
        `;
        }

        return styles;
    }}
`;

export const S_ResetStakeButton = styled.button`
    outline: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 0;
    left: 4px;
    height: 31px;
    display: flex;
    align-items: center;
    max-width: 16px;
`;
