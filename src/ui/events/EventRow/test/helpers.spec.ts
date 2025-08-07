import { updatedMarketIds } from '../helpers';
import type { TemplateMarketsIds } from 'src/ui/events/store/types';

describe('should update Event Row correctly when templateIdMainLine is found', () => {
    it('should update marketIds correctly when templateIdMainLine is found', () => {
        const eventMainLineObj = { template1: 100, template2: 200 };
        const templateMarketIds: TemplateMarketsIds[] = [{ template1: 101 }, { template2: 201 }];
        let marketIds = [101, 201];

        marketIds = updatedMarketIds(eventMainLineObj, templateMarketIds);

        expect(marketIds).toEqual([100, 200]);
    });

    it('should not update marketIds when templateIdMainLine is not found', () => {
        const eventMainLineObj = { template1: 100, template2: 200 };
        const templateMarketIds: TemplateMarketsIds[] = [{ template3: 301 }, { template4: 401 }];
        let marketIds = [301, 401];

        marketIds = updatedMarketIds(eventMainLineObj, templateMarketIds);

        expect(marketIds).toEqual([301, 401]);
    });
});
