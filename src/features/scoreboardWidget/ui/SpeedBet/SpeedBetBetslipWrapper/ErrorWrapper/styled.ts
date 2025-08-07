import styled from '@emotion/styled';

import { GreyPalette } from '@sc-ui/system';

export const S_ErrorWrapper = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 230px;
`;

export const S_AnimatedIcon = styled.div`
    height: 34px;
    width: 34px;
    position: relative;
    margin-bottom: 8px;

    svg:nth-of-type(1) {
        font-size: 34px;

        @keyframes rotate {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        animation: rotate 2s linear infinite;
    }

    svg:nth-of-type(2) {
        font-size: 12px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -6px;
        margin-left: -6px;

        path {
            fill: ${GreyPalette.grey7};
        }
    }
`;
