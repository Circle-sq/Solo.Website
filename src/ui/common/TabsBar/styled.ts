import styled from '@emotion/styled';

import { GenericColors, GreyPalette } from '@sc-ui/system';

import Link from 'src/utils/Router/Link';

export const Container = styled.div`
    display: flex;
    background-color: ${GreyPalette.grey8};
`;

export const BarLink = styled(Link)<{ active?: boolean }>`
    display: flex;
    font-size: 16px;
    text-decoration: none;
    position: relative;
    padding: 10px;
    margin-right: 10px;
    color: ${GenericColors.white};
    background-color: ${GreyPalette.grey8};

    ${(props): string => {
        const { active = false } = props;

        let styles = '';

        if (active) {
            styles += `
                background-color: ${GreyPalette.grey2};
            `;
        }

        return styles;
    }}
`;
