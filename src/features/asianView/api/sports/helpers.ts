import { endOfDay, startOfDay } from 'date-fns';
import some from 'lodash/some';

import { SportType } from 'src/common/enums';

import { LHNTimeTab } from '../../enums';
import { getQueryStartTimes } from '../helpers/date';

import { liveSportTerms } from './configs';
import type { AggregatedSport, AggregatedSportTerms } from './types';

export const getAggregatedSportsTerms = (timeTab?: LHNTimeTab): AggregatedSportTerms => {
    if (timeTab === LHNTimeTab.Live) {
        return liveSportTerms;
    }

    const date = new Date();

    if (timeTab === LHNTimeTab.Upcoming) {
        const { startDate, endDate } = getQueryStartTimes(date);

        return {
            'timeSettings.started': {
                type: 'match',
                value: 'false',
            },
            'timeSettings.startTime': {
                type: 'range',
                from: startDate,
                to: endDate,
            },
        };
    }

    return {
        'timeSettings.startTime': {
            type: 'range',
            from: startOfDay(date).toISOString(),
            to: endOfDay(date).toISOString(),
        },
    };
};

export const prepareSports = (sports: AggregatedSport[], t: (key: string, defaultText: string) => string) => {
    const hasESoccer = some(sports, { id: SportType.ESoccer });
    const hasFootball = some(sports, { id: SportType.Football });

    if (hasESoccer && !hasFootball) {
        const footballItem = {
            id: SportType.Football,
            name: t('asianView.sports.football', 'Football'),
            tags: {},
            displayOrder: 1,
            eventCount: 0,
            translations: {},
        };

        return [...sports, footballItem];
    }

    return sports;
};
