import { LiveStreamingIcon } from '@solo-ui/icons/svg';
import { RedPalette } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventModel } from 'src/appState/models/models/EventModel';
import { LiveLabelShort } from 'src/ui/common/LiveLabel/LiveLabel';
import EventPeriod from 'src/ui/events/EventPeriod/EventPeriod';

import { S_MarginWrapper, S_PeriodContainer } from './styled';

interface Props {
    event: EventModel;
    isLivePeriod: boolean;
    showLiveIcon?: boolean;
}

const EventTime = ({ event, isLivePeriod, showLiveIcon = false }: Props) => {
    const { scoreSet, timeSettingsStarted = false } = event;
    const showLiveLabel = isLivePeriod || timeSettingsStarted;

    const {
        language: { getTranslation },
    } = useAppStateContext();

    return (
        <>
            {showLiveIcon && (
                <S_MarginWrapper>
                    <LiveStreamingIcon color={RedPalette.red4} fontSize='xsmall' data-testid='liveIcon-testId' />
                </S_MarginWrapper>
            )}

            {scoreSet !== undefined && (
                <>
                    {scoreSet}
                    {getTranslation('events.row.in-play.set.suffix', 'Set')}
                </>
            )}

            {showLiveLabel && <LiveLabelShort testId='liveLabel' />}

            <S_PeriodContainer data-testid='scoreAndTime'>
                <EventPeriod event={event} />
            </S_PeriodContainer>
        </>
    );
};

export default EventTime;
