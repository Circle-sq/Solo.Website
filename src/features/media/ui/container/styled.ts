import styled from '@emotion/styled';

import {
    fontWeight,
    breakpoints,
    radius,
    DarkBluePalette,
    GenericColors,
    GreyPalette,
    LightBluePalette,
    cssColor,
} from '@sc-ui/system';

interface TabButtonProps {
    active: boolean;
    disabled?: boolean;
}

export const S_MediaWrapper = styled.div`
    margin-bottom: 16px;
    background-color: ${cssColor('--box-media-header-bg')};
    color: ${cssColor('--box-media-header-text')};
    border-radius: ${radius.main};

    @media (max-width: ${breakpoints.bp960}) {
        display: none;
    }
`;

export const S_Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    line-height: 1;
    font-weight: ${fontWeight.bold};
`;

export const S_HeaderControls = styled.div`
    align-self: flex-end;
`;

export const S_ToggleButton = styled.button`
    border: none;
    cursor: pointer;
    padding: 5px 0 5px 8px;
    margin-top: 6px;
    vertical-align: top;
    border-left: 2px solid ${DarkBluePalette.darkBlue5};
    background-color: ${GenericColors.transparent};
`;

export const S_TabButton = styled.button<TabButtonProps>`
    position: relative;
    padding: 0.7rem;
    border: none;
    cursor: pointer;
    background-color: ${GenericColors.transparent};

    &:hover svg path {
        fill: ${GenericColors.white};
    }

    &::after {
        margin: 0 auto;
        display: none;
        height: 2px;
        width: 90%;
        content: '';
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: ${LightBluePalette.lightBlue9};
    }

    ${(props): string => {
        const { active = false, disabled = false } = props;

        let styles = ``;

        if (active) {
            styles = `
                path {
                    fill: ${GenericColors.white};
                }

                &::after {
                    display: block;
                }
            `;
        }

        if (disabled) {
            styles += `
                cursor: default;

                 &:hover::after {
                    display: none;
                 }

                &:hover svg path {
                    fill: ${GreyPalette.grey4};
                }
            `;
        }

        return styles;
    }};
`;
