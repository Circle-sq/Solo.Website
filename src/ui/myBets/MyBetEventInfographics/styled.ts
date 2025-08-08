import styled from '@emotion/styled';

import { breakpoints, cssColor, fontWeight } from '@solo-ui/system';

import {
    BasicEventScore,
    NumberRow,
    S_EventInfoBase,
    S_EventInfoParticipants,
    S_EventScore,
    S_EventTimeBase,
    S_PeriodContainer,
} from 'src/ui/common/EventInfographics/styled';
import { S_Participant, S_ParticipantName } from 'src/ui/common/Participants/styled';

export const S_MyBetEventTime = styled(S_EventTimeBase)`
    margin-top: 16px;
    color: ${cssColor('--text-secondary')};
    font-size: 14px;

    @media (max-width: ${breakpoints.bp500}) {
        padding-left: 0;
    }

    ${S_PeriodContainer} span:first-of-type {
        color: ${cssColor('--text-muted')};
        font-size: 14px;
        font-weight: ${fontWeight.medium};
    }
`;

export const S_MyBetEventWrapper = styled.div`
    position: absolute;
    right: -30px;

    //TODO: Temporary fix for the issue with the event score spacing

    ${S_EventScore} {
        ${BasicEventScore} {
            ${NumberRow} {
                &:nth-of-type(2) {
                    margin-top: 8px;

                    @media (max-width: ${breakpoints.bp500}) {
                        margin-top: 4px;
                    }
                }
            }
        }
    }
`;

export const S_MyBetParticipants = styled(S_EventInfoParticipants)`
    font-size: 14px;
    position: relative;

    ${S_MyBetEventTime} {
        font-size: 12px;
    }

    ${S_ParticipantName} {
        max-width: 260px;

        @media (max-width: ${breakpoints.bp500}) {
            max-width: 210px;
        }
    }
`;

export const S_MyBetEventInfo = styled(S_EventInfoBase)<{ indented?: boolean }>`
    ${S_Participant} {
        font-size: 14px;
        line-height: 20px;
        font-weight: ${fontWeight.regular};
    }

    & > ${S_MyBetParticipants} {
        max-width: fit-content;
        margin: 0;
    }

    &&& > ${S_EventScore} {
        margin-top: 1px;

        ${BasicEventScore} {
            ${NumberRow} {
                &:nth-of-type(2) {
                    margin-top: 8px;
                }
            }
        }
    }

    @media (max-width: ${breakpoints.bp500}) {
        padding-left: 0;
    }

    ${({ indented = false }) => {
        let styles = '';

        if (indented) {
            styles += `
                padding-left: 32px;
                margin-top: 16px;
            `;
        }

        return styles;
    }}
`;
