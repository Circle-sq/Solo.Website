import styled from '@emotion/styled';

import { GenericColors, LightBluePalette, RedPalette, fontWeight, cssColor } from '@solo-ui/system';

import Link from 'src/utils/Router/Link';

export const S_CounterLink = styled(Link)<{ active: boolean }>`
    display: flex;
    text-decoration: none;
    position: relative;
    margin: 8px 10px 5px 6px;
    padding: 3px 5px 3px 10px;
    font-style: italic;
    text-transform: uppercase;
    font-size: 12px;
    border-radius: 12px;
    color: ${GenericColors.white};
    display: flex;
    align-items: center;

    & > span:first-of-type {
        margin-right: 8px;
        font-family: 'Roboto', sans-serif;
    }

    &:hover {
        background-color: ${cssColor('--tabs-tertiary-hover-bg')};
`;

export const S_BarLink = styled(Link)<{ active: boolean }>`
    display: flex;
    font-size: 13px;
    text-decoration: none;
    position: relative;
    padding: 10px;
    margin-right: 8px;
    font-weight: ${fontWeight.bold};

    ${(props): string => {
        const { active = false } = props;

        let styles = `
            color: ${GenericColors.white};

            &:hover:after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 2px;
                background-color: ${LightBluePalette.lightBlue6};
            }
        `;

        if (active) {
            styles += `
                &:after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 2px;
                    background-color: ${LightBluePalette.lightBlue6};
                }
            `;
        }

        return styles;
    }}
`;

export const S_BetsIndicator = styled.span`
    border-radius: 50%;
    font-size: 11px;
    font-style: normal;
    font-weight: ${fontWeight.semibold};
    margin-right: 8px;
    line-height: 1.5;
    height: 16px;
    width: 16px;
    text-align: center;
    color: ${GenericColors.white};
    background-color: ${RedPalette.red4};
`;

export const S_NavBarItemLabel = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
