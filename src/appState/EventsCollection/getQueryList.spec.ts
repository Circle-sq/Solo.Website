import { EVENTS_COLLECTIONS } from 'src/utils/constants';
import { BettingEventTime } from 'src/utils/enums';

import { getQueryList } from './getQueryList';

describe('getQueryList fn', () => {
    it('should return expected query params if collection name contains outright', () => {
        const expected = {
            state: 'open',
            display: true,
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

        expect(getQueryList('-outright')).toMatchObject(expected);
    });

    it('should return expected query params if collection name contains in play', () => {
        const expected = {
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

        expect(getQueryList('in-play')).toMatchObject(expected);
    });

    it('should return expected query params if collection name contains highlight-carousel', () => {
        const expected = {
            'tags.solo-events': { from: 1, to: 20 },
            perPage: 20,
            sort: ['timeSettings.startTime'],
            state: 'open',
        };

        expect(getQueryList(EVENTS_COLLECTIONS.highlightCarousel)).toMatchObject(expected);
    });

    it('should return expected query params if collection name contains crossbetting', () => {
        const expected = {
            'market.display': true,
            display: true,
            'tags.outright': 'no',
            perPage: 20,
            sort: ['-competition.displayOrder', 'timeSettings.startTime', '-sport.displayOrder', 'competition.name'],
            state: 'open',
            started: false,
        };

        expect(getQueryList(EVENTS_COLLECTIONS.crossbetting)).toMatchObject(expected);
    });

    it('should return expected query params if collection name contains on-later', () => {
        const expected = {
            display: true,
            'market.display': true,
            'market.main': 'yes',
            'tags.outright': 'no',
            sort: ['timeSettings.startTime', 'name'],
            perPage: 10,
            time: BettingEventTime.Upcoming,
            state: 'open',
            started: false,
        };

        expect(getQueryList(EVENTS_COLLECTIONS.onLater)).toMatchObject(expected);
    });

    it('should return expected query params if collection name contains sport-', () => {
        const expected = {
            display: true,
            'market.main': 'yes',
            perPage: 40,
            'tags.outright': 'no',
            state: 'open',
            sort: ['timeSettings.startTime'],
        };

        expect(getQueryList('sport-')).toMatchObject(expected);
    });

    it('should return default query params for a param that does not match any of previous', () => {
        const expected = {
            display: true,
            'market.main': 'yes',
            perPage: 40,
            'tags.outright': 'no',
            state: 'open',
        };

        expect(getQueryList('anyOtherCollectionName')).toMatchObject(expected);
    });
});
