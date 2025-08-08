import styled from '@emotion/styled';

import { breakpoints } from '@solo-ui/system';

import { S_ScrolledContent } from 'src/layouts/MainWrapper/styled';
import { S_GroupName } from 'src/ui/events/EventGroupHeader/styled';

import { S_CompetitionItem } from './Competitions/styled';

export const S_CrossBettingWrapper = styled(S_ScrolledContent)`
    overflow: hidden;
    border-radius: 6px;
    margin-bottom: 16px;
    padding: 0;
    @media (max-width: ${breakpoints.bp500}) {
        border-radius: 0;
        margin-bottom: 0;
    }
`;

export const S_CrossBettingContent = styled.div`
    ${S_CompetitionItem} {
        ${S_GroupName} {
            & > img:first-of-type {
                margin-right: 0;
            }
        }
    }
`;
