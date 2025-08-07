import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import EventPeriod from 'src/ui/events/EventPeriod/EventPeriod';

import { multiParticipantSports } from '../../../constants';
import useEventGeneralInfo from '../../../hooks/useEventGeneralInfo';
import useEventParticipants from '../../../hooks/useEventParticipants';
import { ParticipantType } from '../../../types';

import { phaseDetailsDisplayFormats, scoreDisplayFormats } from './constants';
import ParticipantMini from './ParticipantMini/ParticipantMini';
import { S_EventName, S_PhaseDetails, S_EventPeriodWrapper, S_Score } from './styled';

const ScoreboardMini = ({ eventId }: { eventId: number }) => {
    const {
        language: { getTranslation },
        models,
    } = useAppStateContext();

    const { homeTeamName, awayTeamName, homeUniformUrl, awayUniformUrl, isWithUniform } = useEventParticipants(eventId);
    const { isLive, sport, stats, eventName } = useEventGeneralInfo(eventId);

    const event = models.getEvent(eventId);

    const displayInfo = useMemo(() => {
        if (!isLive || sport === undefined) {
            return {
                score: getTranslation('event.header.versus', 'vs'),
                phaseDetails: null,
            };
        }

        const scoreFormat = scoreDisplayFormats.find((format) => format.sports.includes(sport));
        const phaseDetailsFormat = phaseDetailsDisplayFormats.find((format) => format.sports.includes(sport));

        return {
            score:
                scoreFormat !== undefined
                    ? scoreFormat.render(stats, getTranslation)
                    : getTranslation('event.header.versus', 'vs'),
            phaseDetails: phaseDetailsFormat !== undefined ? phaseDetailsFormat.render(stats, getTranslation) : null,
        };
    }, [isLive, sport, stats, getTranslation]);

    if (sport !== undefined && multiParticipantSports.includes(sport)) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <S_EventName>{eventName}</S_EventName>
                <S_EventPeriodWrapper>
                    {event !== null && <EventPeriod event={event} isEventPage />}
                </S_EventPeriodWrapper>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 2,
                }}
            >
                <ParticipantMini
                    type={ParticipantType.Home}
                    name={homeTeamName}
                    uniformUrl={isWithUniform ? homeUniformUrl : undefined}
                />
            </Box>
            <Box
                data-testid='scoreAndTime'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    textAlign: 'center',
                }}
            >
                <S_Score>{displayInfo.score}</S_Score>
                <S_EventPeriodWrapper>
                    {event !== null && <EventPeriod event={event} isEventPage />}
                    {displayInfo.phaseDetails !== null && <S_PhaseDetails>{displayInfo.phaseDetails}</S_PhaseDetails>}
                </S_EventPeriodWrapper>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 2,
                }}
            >
                <ParticipantMini
                    type={ParticipantType.Away}
                    name={awayTeamName}
                    uniformUrl={isWithUniform ? awayUniformUrl : undefined}
                />
            </Box>
        </Box>
    );
};

export default observer(ScoreboardMini);
