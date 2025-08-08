import styled from '@emotion/styled';

import { breakpoints, fontWeight, GenericColors, Opacities } from '@solo-ui/system';

import BaseballBat from 'src/assets/icons/baseballBat.svg';

const S_Icon = styled.span`
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    align-self: center;
`;

export const S_ScoreboardDetailsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 15px);
    grid-auto-rows: minmax(15px, auto);
`;

export const S_ScoreboardDetailsPeriod = styled.div<{ isCurrentPeriod: boolean }>`
    font-size: 12px;
    line-height: 16px;
    font-weight: ${fontWeight.regular};
    color: ${({ isCurrentPeriod }) =>
        isCurrentPeriod ? GenericColors.white : `${GenericColors.white + Opacities.opacity60}`};
    border-bottom: 1px solid ${GenericColors.white + Opacities.opacity60};

    @media (max-width: ${breakpoints.bp500}) {
        font-size: 10px;
        line-height: 14px;
    }
`;

export const S_HomeAway = styled.div<{ isCurrentPeriod: boolean }>`
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    font-weight: ${fontWeight.bold};
    color: ${({ isCurrentPeriod }) =>
        isCurrentPeriod ? GenericColors.white : `${GenericColors.white + Opacities.opacity60}`};

    @media (max-width: ${breakpoints.bp500}) {
        font-size: 12px;
        line-height: 16px;
    }
`;

export const S_ServeHomeAway = styled(S_Icon)<{ isServe: boolean }>`
    width: 8.5px;
    min-width: 8.5px;
    height: 9px;
    bottom: 1px;

    ${(props): string => {
        const { isServe } = props;

        let styles = ``;

        if (isServe) {
            styles += `
                background-image: url('${BaseballBat}');
            `;
        }

        return styles;
    }}
`;

export const S_IconWrapper = styled.div`
    display: flex;
    height: 19px;
    justify-content: center;
    align-items: center;

    @media (max-width: ${breakpoints.bp500}) {
        height: 16px;
    }
`;
