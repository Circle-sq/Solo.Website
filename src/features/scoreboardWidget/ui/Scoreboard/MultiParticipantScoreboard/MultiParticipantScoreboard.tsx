import Box from '@mui/material/Box';

import { useAppStateContext } from 'src/appState/AppState';
import EventPeriod from 'src/ui/events/EventPeriod/EventPeriod';

import { S_EventName } from './styled';

const MultiParticipantScoreboard = ({ eventId }: { eventId: number }) => {
    const { models } = useAppStateContext();

    const event = models.getEvent(eventId)!;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <S_EventName>{event?.name}</S_EventName>
            <EventPeriod event={event} isEventPage />
        </Box>
    );
};

export default MultiParticipantScoreboard;
