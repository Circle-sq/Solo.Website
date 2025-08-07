import { useMutation } from '@tanstack/react-query';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import times from 'lodash/times';
import { useEffect } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { getBackToParentParam } from 'src/utils/standalone/utils';

import { getEventsCountByDateRange } from '../services/events';

const WEEK_RANGE = 7;

const useEventsCountByWeekRange = () => {
    const { router } = useAppStateContext();

    const { mutate: mutateEventsCountByWeekRange, isPending } = useMutation({
        mutationFn: async () => getEventsCountByDateRange({ weekRange: times(WEEK_RANGE) }),
        onSettled: (dayList) => {
            if (!isEmpty(dayList)) {
                const dayIndex = findIndex(dayList, (day) => day > 0);
                const day = dayIndex > 0 ? dayIndex : 0;

                router.redirect(null, { day, ...getBackToParentParam(router) });
            }
        },
    });

    useEffect(() => {
        const { day } = router.route.params;

        if (day) {
            router.redirect(null, { day, ...getBackToParentParam(router) });
        } else {
            mutateEventsCountByWeekRange();
        }
    }, [mutateEventsCountByWeekRange]);

    return { isPending };
};

export default useEventsCountByWeekRange;
