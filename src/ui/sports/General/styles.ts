import styled from '@emotion/styled';

import { fontWeight, DarkBluePalette, GenericColors, cssColor } from '@sc-ui/system';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    section {
        margin-bottom: 0;
    }
`;

export const Content = styled.div``;

export const S_HeaderControls = styled.div<{ hasMarginBottom: boolean }>`
    position: relative;
    border-bottom: 1px solid ${cssColor('--tab-border')};
    left: 0;

    ${({ hasMarginBottom }) =>
        hasMarginBottom &&
        `
            margin-bottom: 8px;
        `}
`;

export const S_TabButton = styled.button<{ active: boolean }>`
    position: relative;
    height: 38px;
    width: 110px;
    border: none;
    cursor: pointer;
    align-items: center;
    font-size: 14px;
    z-index: 1;
    background-color: ${cssColor('--tab-bg')};
    color: ${cssColor('--body-text')};
    font-weight: ${fontWeight.semibold};

    &:after {
        margin: 0 auto;
        height: 2px;
        width: 100%;
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: ${GenericColors.transparent};
    }

    &:hover {
        background: ${cssColor('--tab-bg-hover')};
    }

    ${(props): string => {
        const { active = false } = props;

        let styles = ``;

        if (active) {
            styles = `
                background: ${cssColor('--tab-bg-active')};

                &:after {
                    height: 2px;
                    background-color: ${cssColor('--tab-active-border')};
                }

                &:hover:after {
                    height: 2px;
                    display: block;
                    background-color: ${cssColor('--tab-active-border')};
                }
            `;
        }

        return styles;
    }};
`;

export const S_CountEvents = styled.span`
    position: relative;
    top: 0;
    left: 8px;
    font-size: 10px;
    color: ${DarkBluePalette.darkBlue6};
    font-weight: ${fontWeight.medium};
`;
