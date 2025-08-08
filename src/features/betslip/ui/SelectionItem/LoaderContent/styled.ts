import styled from '@emotion/styled';

import { fontWeight, DarkBluePalette } from '@solo-ui/system';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px;
    animation: fade-in-and-out 1s;

    @keyframes fade-in-and-out {
        0%,
        100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
`;

export const LoaderText = styled('span')`
    font-size: 14px;
    padding-left: 8px;
    font-weight: ${fontWeight.regular};
    color: ${DarkBluePalette.darkBlue6};
`;
