/* eslint-disable @typescript-eslint/naming-convention */
import { Lines, SortBy, TimePeriod } from '@solo-asianView/enums';
import ClockIcon from '@solo-asianView/icons/ClockIcon';
import TrophyIcon from '@solo-asianView/icons/TrophyIcon';
import { getDateRange } from '@solo-asianView/ui/filters/helpers';

import { DATE_FORMAT } from 'src/utils/constants';

export const lineOptions = {
    [Lines.One]: {
        langKey: 'asianView.filters.lines.1',
        defaultText: '1 Line',
    },
    [Lines.Three]: {
        langKey: 'asianView.filters.lines.3',
        defaultText: '3 Lines',
    },
    [Lines.Five]: {
        langKey: 'asianView.filters.lines.5',
        defaultText: '5 Lines',
    },
};

export const sortOptions = {
    [SortBy.Competitions]: {
        langKey: 'asianView.filters.sort.sortbycompetitions',
        defaultText: 'League',
        icon: <TrophyIcon />,
    },
    [SortBy.Time]: {
        langKey: 'asianView.filters.sort.sortbytime',
        defaultText: 'Time',
        icon: <ClockIcon />,
    },
};

const FIVE_DAYS_RANGE = 5;

export const getTimePeriodOptions = () => {
    const [day1, day2, day3, day4, day5] = getDateRange(FIVE_DAYS_RANGE, {
        dateFormat: DATE_FORMAT.NUMERIC_FULL_DATE,
        dayShift: 1,
    });

    return {
        [TimePeriod.AllTimes]: {
            langKey: 'asianView.filters.day.0',
            defaultText: 'All Times',
        },
        [TimePeriod.Day1]: {
            defaultText: day1,
        },
        [TimePeriod.Day2]: {
            defaultText: day2,
        },
        [TimePeriod.Day3]: {
            defaultText: day3,
        },
        [TimePeriod.Day4]: {
            defaultText: day4,
        },
        [TimePeriod.Day5]: {
            defaultText: day5,
        },
        [TimePeriod.Onwards]: {
            langKey: 'asianView.filters.day.6',
            defaultText: 'Onwards',
        },
    };
};
