import { useAtomValue } from 'jotai';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { getMappedPeriod } from 'src/common/helpers/event';
import { isSportWithLiveTimer, isSportWithSimpleTimer } from 'src/common/helpers/sport';
import { eventSportSelectorFamily, eventStatisticsSelectorFamily } from 'src/store/events/selectors/event';

import { translateStatisticsMatchMode } from '../helpers';
import Timer from '../Timer/Timer';

const PeriodWithTimer = ({ eventId }: { eventId: number }) => {
    const sport = useAtomValue(eventSportSelectorFamily(eventId));
    const statistics = useAtomValue(eventStatisticsSelectorFamily(eventId));

    const period = get(statistics, 'period.value', '');
    const mappedPeriod = getMappedPeriod(period, sport);
    const matchMode = get(statistics, 'match-mode.value');

    const {
        language: { getTranslation },
        translationsStore: { translateStatisticsPeriodName },
    } = useAppStateContext();

    const periodTitle = useMemo(() => {
        const matchModeTitle = translateStatisticsMatchMode(getTranslation, matchMode);
        const periodName = translateStatisticsPeriodName(mappedPeriod);

        if (matchModeTitle !== undefined && !isEmpty(matchModeTitle)) {
            return `${matchModeTitle} - ${periodName}`;
        }

        return periodName;
    }, [mappedPeriod, matchMode, getTranslation, translateStatisticsPeriodName]);

    const timer = get(statistics, 'timer');
    const timerValue = get(timer, 'value', '');

    const showLiveTimer = isSportWithLiveTimer(sport, mappedPeriod) && !isEmpty(timerValue);

    if (showLiveTimer) {
        return <Timer eventId={eventId} periodTitle={periodTitle} initialTime={timerValue} />;
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
