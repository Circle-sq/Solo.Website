import styled from '@emotion/styled';

import { breakpoints, fontWeight, GenericColors } from '@solo-ui/system';

export const S_Period = styled.span`
    font-size: 14px;
    min-width: 40px;
    font-weight: ${fontWeight.medium};

    @media (max-width: ${breakpoints.bp500}) {
        font-size: 12px;
        line-height: 16px;
    }
`;

export const S_PeriodWithIcon = styled.span`
    display: inline-flex;
    align-items: center;
    vertical-align: top;

    svg {
        margin-right: 8px;

        &:hover path {
            fill: ${GenericColors.white};
        }
    }

    @media (max-width: ${breakpoints.bp500}) {
        font-size: 10px;
        margin-right: 0;
    }

    @media (min-width: ${breakpoints.bp500}) {
        vertical-align: text-top;
    }
`;
