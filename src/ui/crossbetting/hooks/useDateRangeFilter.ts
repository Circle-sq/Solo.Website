import { addDays, addHours, startOfToday } from 'date-fns';
import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';

interface DateRangeFilter {
    'startTime[from]': string;
    'startTime[to]': string;
}

const DATE_RANGE = 6;

export const useDateRangeFilter = (): DateRangeFilter => {
    const { router } = useAppStateContext();
    const {
        params: { day = 0 },
    } = router.route;

    return useMemo(() => {
        const today = startOfToday();
        const hoursInDay = 24;

        return {
            'startTime[from]': addHours(today, Number(day) * hoursInDay).toISOString(),
            'startTime[to]': addHours(addDays(today, DATE_RANGE), hoursInDay).toISOString(),
        };
    }, [day]);
};
