import { addDays, format, isSameDay } from 'date-fns';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';

import { RouteName, SportType } from 'src/common/enums';
import type { Statistics } from 'src/common/types/statistics';
import { DATE_FORMAT, MATCH_PERIOD, NON_LIVE_PERIODS } from 'src/utils/constants';
import type { ReadonlyRoute } from 'src/utils/Router/types';

export const hasNonLivePeriod = (period: string) => {
    return includes(NON_LIVE_PERIODS, period);
};

export const isLiveEventPeriod = (statistics: Statistics | null) => {
    const period: string = get(statistics, 'period.value', '');

    return !isEmpty(period) && !hasNonLivePeriod(period);
};

export const getEventIdFromRoute = ({ name: routeName, params }: ReadonlyRoute) => {
    const isEventPage = routeName === RouteName.Event;

    if (isEventPage && params.id) {
        return Number(params.id);
    }

    return;
};

export const formatStartTime = (value: string) =>
    format(new Date(value), DATE_FORMAT.NUMERIC_FULL_DATE_TIME_W_SEPARATOR);

export const getMappedPeriod = (period: string, sport?: SportType): string => {
    switch (sport) {
        case SportType.Football:
            switch (true) {
                case /^First Half.*Extra Time/gi.exec(period) !== null:
                    return '1H ET';

                case /^Second.*Extra Time/gi.exec(period) !== null:
                    return '2H ET';

                case /^First Half/gi.exec(period) !== null:
                    return '1H';

                case /^Second Half/gi.exec(period) !== null:
                    return '2H';

                default:
                    return period;
            }

        case SportType.Basketball:
            switch (period) {
                case MATCH_PERIOD.firstBreak:
                    return 'End of 1st quarter';

                case MATCH_PERIOD.secondBreak:
                    return 'Halftime';

                case MATCH_PERIOD.thirdBreak:
                    return 'End of 3rd quarter';

                default:
                    return period;
            }

        case SportType.TableTennis:
            return period.replace('set', 'game');

        default:
            return period;
    }
};

export const isTodayEvent = (date: string) => isSameDay(new Date(), new Date(date));

export const isTomorrowEvent = (date: string) => isSameDay(addDays(new Date(), 1), new Date(date));
