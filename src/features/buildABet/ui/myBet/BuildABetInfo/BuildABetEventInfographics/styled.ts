import styled from '@emotion/styled';

import { EventRowSeparator, NumberRow, S_EventInfoBase, S_EventScore } from 'src/ui/common/EventInfographics/styled';
import { S_MyBetEventTime, S_MyBetParticipants } from 'src/ui/myBets/MyBetEventInfographics/styled';
import { breakpoints } from '@solo-ui/system';

export const S_BuildABetEventInfographics = styled(S_EventInfoBase)`
    margin-top: 14px;

    ${S_EventScore} > span > ${NumberRow} {
        margin: 0;
    }

    & > ${S_MyBetParticipants} {
        max-width: 255px;
        margin: 0;
        padding: 0;
    }

    ${S_MyBetEventTime} {
        margin-top: 8px;
    }

    ${EventRowSeparator} {
        height: 50%;
    }

    @media (max-width: ${breakpoints.bp500}) {
        padding: 0;

        ${S_MyBetEventTime} {
            padding: 0;
        }
    }
`;
