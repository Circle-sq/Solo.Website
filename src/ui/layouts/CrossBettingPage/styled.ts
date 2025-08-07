import styled from '@emotion/styled';

import { breakpoints } from '@sc-ui/system';

import { S_ScrolledContent } from 'src/layouts/MainWrapper/styled';

export const S_CrossBettingPage = styled.div`
    display: flex;
    position: relative;
    flex: 1;
    height: 100%;
    padding-top: 16px;

    @media (max-width: ${breakpoints.bp1279max}) {
        padding-top: 0px;
    }

    @media (max-width: ${breakpoints.bp500}) {
        height: 100%;
    }
`;

export const S_CrossBettingCustomScrollbar = styled(S_ScrolledContent)`
    overflow: hidden;
    border-radius: 6px;
    margin-bottom: 16px;
    padding: 0;
`;
