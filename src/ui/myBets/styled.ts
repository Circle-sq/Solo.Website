import styled from '@emotion/styled';

import { breakpoints, cssColor } from '@solo-ui/system';

export const S_MyBets = styled.div`
    padding: 0;
    background: ${cssColor('--box-default-bg')};
`;

export const S_MyBetsStatusContainer = styled.div`
    height: 60vh;
    background-color: ${cssColor('--body-bg')};

    @media (max-width: ${breakpoints.bp1279}) {
        background-color: transparent;
    }
`;

export const S_MyBetsContainer = styled.div`
    padding-bottom: 70px;

    &.navigationStandalone {
        padding-bottom: 0;

        @media (max-width: ${breakpoints.bp500}) {
            margin-bottom: -50px;
        }
    }
`;

export const S_AlertMessage = styled.div`
    min-height: 100px;
    font-size: 12px;
    text-align: center;
    animation: 0.4s fadeInReceipt 1;
`;
