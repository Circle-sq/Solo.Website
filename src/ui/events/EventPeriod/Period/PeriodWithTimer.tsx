import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventModel } from 'src/appState/models/models/EventModel';

import { isSportWithLiveTimer, isSportWithSimpleTimer, translateStatisticsMatchMode } from '../helpers';
import FrameTimer from '../Timer/FrameTimer';

const PeriodWithTimer = ({ event }: { event: EventModel }) => {
    const { sport, matchMode = '', mappedPeriod = '', stats = {} } = event;

    const {
        language: { getTranslation },
        translationsStore: { translateStatisticsPeriodName },
    } = useAppStateContext();

    const periodTitle = useMemo(() => {
        const matchModeTitle = translateStatisticsMatchMode(getTranslation, matchMode);
        const periodName = translateStatisticsPeriodName(mappedPeriod);

        if (!isUndefined(matchModeTitle) && !isEmpty(matchModeTitle)) {
            return `${matchModeTitle} - ${periodName}`;
        }

        return periodName;
    }, [mappedPeriod, matchMode, getTranslation, translateStatisticsPeriodName]);

    const timer = get(stats, 'timer');
    const timerValue = get(timer, 'value', '');

    const showLiveTimer = isSportWithLiveTimer(sport, mappedPeriod) && !isEmpty(timerValue);

    if (showLiveTimer) {
        return (
            <>
                {periodTitle} <FrameTimer eventId={event.id} initialTime={timerValue} />
            </>
        );
    }

    const simpleTimer = timerValue ?? get(timer, 'timer');
    const isZeroTimer = !simpleTimer || simpleTimer === '0:00' || simpleTimer === '00:00';
    const showSimpleTimer = isSportWithSimpleTimer(sport) && !isEmpty(timerValue) && !isZeroTimer;

    if (showSimpleTimer) {
        return <>{`${periodTitle} < ${simpleTimer}`}</>;
    }

    return <>{periodTitle}</>;
};

export default PeriodWithTimer;
