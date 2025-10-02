import styled from '@emotion/styled';

const fontSizes = {
    xsmall: '12px',
    small: '16px',
    medium: '20px',
    large: '24px',
};

export const SvgIcon = styled.svg`
    width: 1em;
    height: 1em;

    font-size: ${(props) => fontSizes[props.fontSize as keyof typeof fontSizes] ?? props.fontSize ?? fontSizes.medium};

    & path {
        fill: ${(props) => props.color ?? null};
        stroke: ${(props) => props.stroke ?? null};
    }
`;
