import styled from '@emotion/styled';

import { breakpoints, fontWeight } from '@solo-ui/system';

export const S_PenaltyScore = styled.div`
    font-size: 12px;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    font-weight: ${fontWeight.bold};
`;
export const S_PenaltyScoreSeparator = styled.div`
    font-size: 12px;
    line-height: 16px;
    font-weight: ${fontWeight.bold};
`;

export const S_PenaltyScoreWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    overflow: hidden;
    margin-bottom: 5px;

    @media screen and (max-width: ${breakpoints.bp500}) {
        margin: 0;
    }
`;
