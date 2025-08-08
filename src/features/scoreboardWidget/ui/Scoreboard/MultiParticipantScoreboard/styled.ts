import styled from '@emotion/styled';

import { breakpoints } from '@solo-ui/system';

export const S_EventName = styled.div`
    text-align: center;
    font-size: 20px;
    line-height: 24px;
    font-weight: 800;
    margin-bottom: 4px;

    @media (max-width: ${breakpoints.bp500}) {
        font-size: 14px;
        line-height: 18px;
    }
`;
