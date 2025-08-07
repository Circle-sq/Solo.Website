import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventModel } from 'src/appState/models/models/EventModel';

import PeriodWithOutrightDate from './PeriodWithOutrightDate';
import PeriodWithTimer from './PeriodWithTimer';

interface Props {
    event: EventModel;
    isEventPage?: boolean;
}

const Period = ({ event, isEventPage = false }: Props) => {
    const { mappedPeriod = '', timeSettingsStartTime, isOutright = false } = event;

    const {
        translationsStore: { translateStatisticsPeriodName },
    } = useAppStateContext();

    const periodTitle = useMemo((): string => {
        return translateStatisticsPeriodName(mappedPeriod);
    }, [mappedPeriod, translateStatisticsPeriodName]);

    if (periodTitle) {
        return <PeriodWithTimer event={event} />;
    }

    if (timeSettingsStartTime) {
        return (
            <PeriodWithOutrightDate
                startTime={timeSettingsStartTime}
                isEventPage={isEventPage}
                isOutright={isOutright}
            />
        );
    }

    return null;
};

export default observer(Period);
