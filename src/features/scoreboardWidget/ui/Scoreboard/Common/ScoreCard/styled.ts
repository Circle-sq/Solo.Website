import styled from '@emotion/styled';

import { breakpoints, fontWeight } from '@solo-ui/system';

export const S_ScoreWrapper = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-bottom: 4px;
    gap: 4px;
    font-size: 32px;
    line-height: 43px;
    font-weight: ${fontWeight.bold};

    @media screen and (max-width: ${breakpoints.bp500}) {
        font-size: 18px;
        line-height: 24px;
    }
`;
