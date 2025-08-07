import { observer } from 'mobx-react-lite';

import { LiveStreamingIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import type { EventModel } from 'src/appState/models/models/EventModel';

import { hasStream } from './helpers';
import Period from './Period/Period';
import { S_Period, S_PeriodWithIcon } from './styled';

interface Props {
    event: EventModel;
    isEventPage?: boolean;
    isCarousel?: boolean;
}

const EventPeriod = ({ event, isEventPage = false, isCarousel = false }: Props) => {
    if (isEventPage) {
        return (
            <S_Period data-testid='EventPeriod'>
                <Period event={event} isEventPage />
            </S_Period>
        );
    }

    const showLiveIcon = isCarousel && !event.timeSettingsStarted && hasStream(event);

    return (
        <S_PeriodWithIcon data-testid='EventPeriodWithIcon'>
            {showLiveIcon && (
                <LiveStreamingIcon fontSize='small' color={cssColor('--icon-default-color')} data-testid='live-icon' />
            )}

            <Period event={event} />
        </S_PeriodWithIcon>
    );
};

export default observer(EventPeriod);
