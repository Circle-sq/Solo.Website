import { MODAL_ROUTE_NAME } from 'src/utils/constants';
import { BettingEventTime } from 'src/utils/enums';

import type { EventsCollectionQuery } from './types';

export const getQueryList = (collectionId: string): EventsCollectionQuery => {
    if (collectionId === 'home-count-live-highlights' || collectionId === MODAL_ROUTE_NAME.liveGroupedSports) {
        return {
            'market.main': 'yes',
            'market.tradedInPlay': true,
            state: 'open',
            display: true,
            'tags.outright': 'no',
            'timeSettings.tradedInPlay': 'true',
            started: true,
            time: BettingEventTime.InPlay,
            aggregations: ['sportWithCountries'],
            'aggregations-only': true,
        };
    }

    if (collectionId.includes('in-play-count-')) {
        return {
            'market.main': 'yes',
            'market.tradedInPlay': true,
            state: 'open',
            display: true,
            started: true,
            'tags.outright': 'no',
            'timeSettings.tradedInPlay': 'true',
            time: BettingEventTime.InPlay,
            'aggregations-only': true,
        };
    }

    if (collectionId.includes('on-later-')) {
        return {
            'market.display': true,
            'market.main': 'yes',
            state: 'open',
            display: true,
            started: false,
            'tags.outright': 'no',
            time: BettingEventTime.CurrentDay,
        };
    }

    if (collectionId === 'all-count') {
        return {
            'market.display': true,
            'market.main': 'yes',
            display: true,
            state: 'open',
            aggregations: ['sport'],
            'aggregations-only': true,
        };
    }

    if (collectionId === 'home-count-on-later') {
        return {
            'market.display': true,
            'market.main': 'yes',
            state: 'open',
            display: true,
            started: false,
            'tags.outright': 'no',
            time: BettingEventTime.Upcoming,
            aggregations: ['sport'],
            'aggregations-only': true,
        };
    }

    if (collectionId === 'in-play-streams-count') {
        return {
            'market.main': 'yes',
            'market.tradedInPlay': true,
            state: 'open',
            display: true,
            'tags.outright': 'no',
            'timeSettings.tradedInPlay': 'true',
            time: BettingEventTime.InPlay,
            aggregations: ['sport'],
            'aggregations-only': true,
            availableStreams: true,
            started: true,
        };
    }

    if (collectionId.includes('count-matches')) {
        return {
            'market.display': true,
            'market.main': 'yes',
            state: 'open',
            display: true,
            'tags.outright': 'no',
            'aggregations-only': true,
        };
    }

    if (collectionId.includes('count-outright')) {
        return {
            state: 'open',
            display: true,
            'market.display': true,
            'market.main': 'yes',
            'market.outright': 'yes',
            'tags.outright': 'yes',
            'aggregations-only': true,
        };
    }

    if (collectionId === 'crossbet-country-competition-count') {
        return {
            'aggregations-only': true,
        };
    }

    if (collectionId.includes('crossbet-competition-country')) {
        return {
            'market.display': true,
            state: 'open',
            started: false,
            display: true,
            'tags.outright': 'no',
            aggregations: ['competition.country', 'tags.country'],
            'aggregations-only': true,
        };
    }

    if (collectionId === 'crossbet-count') {
        return {
            'market.display': true,
            state: 'open',
            started: false,
            display: true,
            'tags.outright': 'no',
            aggregations: ['sport'],
            'aggregations-only': true,
        };
    }

    return {};
};
