import styled from '@emotion/styled';

import { GreenPalette } from '@sc-ui/system';

export const S_StatisticsContainer = styled.div`
    background-color: ${GreenPalette.green2};
`;

export const S_PositionBox = styled.div<{ rowView?: boolean }>`
    display: flex;
    cursor: pointer;

    ${({ rowView }) => {
        if (!rowView) {
            return `
                position: absolute;
                right: 16px;
            `;
        }
    }};
`;
