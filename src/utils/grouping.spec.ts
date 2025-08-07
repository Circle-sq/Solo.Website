import type { CompetitionLocationItem } from 'src/modules/sports/types';
import { groupingByProp } from './grouping';

const WORLD = {
    id: '501',
    name: 'Club Friendly Games',
    displayOrder: 0,
    country: 'WRL',
    label: 'World',
    total: 1,
    platformObject: {
        id: '02_sr:tournament:853',
        name: 'Club Friendly Games',
        externalId: {
            instance: 'skycity',
            provider: 'bet-radar',
            feedId: 'sr:tournament:853',
            sportId: 'bet-radar',
        },
    },
};

const GEORGIA = {
    id: '540',
    name: 'Erovnuli Liga',
    displayOrder: 0,
    country: 'GEO',
    label: 'Georgien',
    total: 1,
    platformObject: {
        id: '02_sr:tournament:704',
        name: 'Erovnuli Liga',
        externalId: {
            instance: 'skycity',
            provider: 'bet-radar',
            feedId: 'sr:tournament:704',
            sportId: 'bet-radar',
        },
    },
};
const AUSTRALIA1 = {
    id: '155',
    name: 'NSW NPL 1',
    displayOrder: 0,
    country: 'AUS',
    label: 'Australia',
    total: 1,
    platformObject: {
        id: '02_sr:tournament:1274',
        name: 'NSW NPL 1',
        externalId: {
            instance: 'skycity',
            provider: 'bet-radar',
            feedId: 'sr:tournament:1274',
            sportId: 'bet-radar',
        },
    },
};
const AUSTRALIA2 = {
    id: '407',
    name: 'South Australia NPL, Women',
    displayOrder: 0,
    country: 'AUS',
    label: 'Australia',
    total: 1,
    platformObject: {
        id: '02_sr:tournament:18340',
        name: 'South Australia NPL, Women',
        externalId: {
            instance: 'skycity',
            provider: 'bet-radar',
            feedId: 'sr:tournament:18340',
            sportId: 'bet-radar',
        },
    },
};
const countryList = [WORLD, GEORGIA, AUSTRALIA1, AUSTRALIA2] as CompetitionLocationItem[];

describe('groupingByProp', () => {
    const sportId = 'country';

    it('should group by props', () => {
        const output = groupingByProp(sportId, countryList);

        expect(output).toEqual({
            [WORLD.country]: [WORLD],
            [GEORGIA.country]: [GEORGIA],
            [AUSTRALIA2.country]: [AUSTRALIA1, AUSTRALIA2],
        });
    });

    it('should return empty competitions', () => {
        const output = groupingByProp(sportId, []);

        expect(output).toEqual({});
    });
});
