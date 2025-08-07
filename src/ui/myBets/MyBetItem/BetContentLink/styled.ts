import styled from '@emotion/styled';

import { breakpoints, cssColor } from '@sc-ui/system';

import { InactiveIcon } from 'src/ui/common/ActiveSportIcon/styled';
import { S_EventInfoColumn, EventRowActiveIcon, NumberRow } from 'src/ui/common/EventInfographics/styled';
import { S_Participant } from 'src/ui/common/Participants/styled';
import Link from 'src/utils/Router/NewLink';

import { S_BetTime } from '../BetId/styled';

export const S_BetContent = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const S_BetContentInfo = styled.div`
    width: 100%;

    ${S_BetTime} {
        padding-top: 8px;
        color: ${cssColor('--text-muted')};
    }

    ${S_EventInfoColumn} {
        ${S_Participant} {
            margin-top: 8px;

            &:first-of-type {
                margin-top: 0;
            }
        }

        ${NumberRow} {
            margin-top: 8px;

            &:first-of-type {
                margin-top: 0;
            }

            @media (max-width: ${breakpoints.bp500}) {
                margin-top: 0;
            }

            ${EventRowActiveIcon} {
                margin-top: 0.5px;
                line-height: 19px;
            }

            ${InactiveIcon} {
                margin-top: 0;
                line-height: 19px;
            }
        }
    }
`;

export const S_ContentLink = styled(Link)`
    flex: 1;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: ${cssColor('--body-text')};
`;
