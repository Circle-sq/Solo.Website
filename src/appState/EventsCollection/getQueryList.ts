import { EVENTS_COLLECTIONS } from 'src/utils/constants';
import { BettingEventTime } from 'src/utils/enums';

import type { EventsCollectionQuery } from './types';

export const getQueryList = (collectionId: string): EventsCollectionQuery => {
    if (collectionId.includes('-outright')) {
        return {
            state: 'open',
            display: true,
            marketIndex: true,
            'market.main': 'yes',
            'market.outright': 'yes',
            perPage: 40,
            sort: [
                'timeSettings.startTime',
                '-sport.displayOrder',
                '-competition.displayOrder',
                'competition.name',
                'name',
            ],
            'tags.outright': 'yes',
        };
    }

    if (collectionId === 'in-play' || collectionId.includes('in-play-')) {
        return {
            state: 'open',
            display: true,
            'market.main': 'yes',
            'market.tradedInPlay': true,
            'tags.outright': 'no',
            perPage: 5,
            sort: [
                '-sport.displayOrder',
                '-competition.displayOrder',
                'timeSettings.startTime',
                'competition.name',
                'name',
            ],
            'timeSettings.tradedInPlay': 'true',
            started: true,
            time: BettingEventTime.InPlay,
        };
    }

    if (collectionId.includes(EVENTS_COLLECTIONS.highlightCarousel)) {
        return {
            'tags.solo-events': { from: 1, to: 20 },
            perPage: 20,
            sort: ['timeSettings.startTime'],
            state: 'open',
        };
    }

    if (collectionId.includes(EVENTS_COLLECTIONS.onLater)) {
        return {
            display: true,
            'market.main': 'yes',
            'market.display': true,
            'tags.outright': 'no',
            sort: ['timeSettings.startTime', 'name'],
            perPage: 10,
            time: BettingEventTime.Upcoming,
            state: 'open',
            started: false,
        };
    }

    if (collectionId.includes('sport-')) {
        return {
            display: true,
            marketIndex: true,
            'market.main': 'yes',
            perPage: 40,
            'tags.outright': 'no',
            state: 'open',
            sort: ['timeSettings.startTime'],
        };
    }

    return {
        display: true,
        'market.display': true,
        'market.main': 'yes',
        perPage: 40,
        'tags.outright': 'no',
        state: 'open',
    };
};
