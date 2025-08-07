import { addDays, format } from 'date-fns';
import includes from 'lodash/includes';
import sortBy from 'lodash/sortBy';
import times from 'lodash/times';

import { push, removeId } from 'src/common/recoil/updaters';

export const getDateRange = <T extends string | undefined = undefined, R = T extends string ? string[] : Date[]>(
    range: number,
    { dateFormat, dayShift = 0 }: { dateFormat?: T; dayShift?: number } = {},
): R => {
    const date = new Date();
    const addDay = (dayIndex: number) => addDays(date, dayIndex + dayShift);

    if (dateFormat === undefined) {
        return times(range, addDay) as R;
    }

    return times(range, (dayIndex) => format(addDay(dayIndex), dateFormat)) as R;
};

export const toggleCompetitionId = (id: number) => (state: number[]) => {
    if (includes(state, id)) {
        return removeId(id)(state);
    }

    return sortBy(push(id)(state));
};
