import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';

import { useBlacklistQuery } from '@solo-api/streams/blacklist/queries';

import type { EventModel } from 'src/appState/models/models/EventModel';
import { isLiveEventPeriod } from 'src/common/helpers/event';
import Participants from 'src/ui/common/Participants/Participants';
import SpeedBetLabel from 'src/features/scoreboardWidget/ui/SpeedBet/SpeedBetLabel/SpeedBetLabel';

import EventScore from './EventScore';
import EventTime from './EventTime';
import { S_EventInfo, S_EventInfoColumn, S_EventInfoParticipants, S_EventScore, S_EventTime } from './styled';

const EventInfographics = ({ event, isAmericanSports = false }: { event: EventModel; isAmericanSports?: boolean }) => {
    const { blacklist } = useBlacklistQuery();
    const { sport, stats, score, timeMatchInPlay } = event;

    const stream = event.media?.streams[0];
    const isProviderBlacklisted = blacklist.some(
        (provider) => provider.providerName.toLowerCase() === stream?.provider,
    );
    const isStreamAvailable = stream !== undefined && !isProviderBlacklisted;
    const isLivePeriod = isLiveEventPeriod(stats);
    const isSpeedBet = event.isSpeedBet;

    return (
        <S_EventInfoColumn>
            <S_EventInfo isAmericanSports={isAmericanSports}>
                <S_EventInfoParticipants>
                    <div>
                        <Participants event={event} />
                        <Box sx={{ display: 'flex', mt: '6px' }}>
                            <S_EventTime data-testid='timemetaid'>
                                <EventTime event={event} isLivePeriod={isLivePeriod} showLiveIcon={isStreamAvailable} />
                            </S_EventTime>
                            {isSpeedBet && <SpeedBetLabel />}
                        </Box>
                    </div>
                </S_EventInfoParticipants>

                {isLivePeriod && (
                    <S_EventScore>
                        <EventScore sport={sport} score={score} stats={stats} timeMatchInPlay={timeMatchInPlay} />
                    </S_EventScore>
                )}
            </S_EventInfo>
        </S_EventInfoColumn>
    );
};

export default observer(EventInfographics);
