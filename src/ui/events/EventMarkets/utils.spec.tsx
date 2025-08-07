import map from 'lodash/map';
import reject from 'lodash/reject';

import type { MarketModel } from 'src/appState/models/models/MarketModel';
import { SportType } from 'src/common/enums';
import { MARKET_TEMPLATE_GROUP } from 'src/utils/constants';

import rawData from './__test__/event.json';
import { generateMarketsGroups, getGameLineMarkets } from './utils';

const MONEY_INDEX = 0;
const SPREAD_INDEX = 1;
const TOTALS_INDEX = 2;

const FIRST_MARKET_INDEX = 0;

const SPREADS_MARKET_ID_WE_SUSPEND = 17432229;
const MONEY_MARKET_ID_WE_SUSPEND = 16248910;
const TOTALS_MARKET_ID_WE_SUSPEND = 18328245;

const NEW_BESTLINE_SPREADS_MARKET_ID = 18258164;
const NEW_BESTLINE_MONEY_MARKET_ID = 16248910;
const NEW_BESTLINE_TOTALS_MARKET_ID = 18258165;

const SPREADS_TEMPLATE_ID = 'bet-radar-223';
const TOTALS_TEMPLATE_ID = 'bet-radar-225';

const SPREADS_GROUP = 'Spreads';
const TOTALS_GROUP = 'Totals';

const GAME_LINES = 'Game Lines';

const rawMarkets = () => {
    return rawData.markets as unknown as MarketModel[];
};

const sanitizeRawMarkets = (market: MarketModel) => {
    const modifiedMarket = { ...market };
    let mainGroup = null;

    if (market.template.id === TOTALS_TEMPLATE_ID) {
        mainGroup = TOTALS_GROUP;
    } else if (market.template.id === SPREADS_TEMPLATE_ID) {
        mainGroup = SPREADS_GROUP;
    }

    if (market.template.customName === null) {
        return {
            ...modifiedMarket,
            data: {
                value: {
                    template: {
                        customName: MARKET_TEMPLATE_GROUP.gameLines,
                        mainGroup: mainGroup,
                    },
                },
            },
        };
    }

    return modifiedMarket;
};

const suspendMarket = (marketId: number) => {
    // We simulate the suspend action on market
    return map(rawMarkets(), (market) => {
        let modifiedMarket = sanitizeRawMarkets(market);

        if (market.id === marketId) {
            modifiedMarket = {
                ...modifiedMarket,
                isSuspended: true,
                active: false,
            };
        }

        return modifiedMarket;
    });
};

const removeTemplateMarketType = () => {
    return map(rawMarkets(), (market) => {
        let modifiedMarket = { ...market };
        modifiedMarket = {
            ...modifiedMarket,
            template: {
                mainGroup: null,
                marketTypeGeneric: null,
            },
        };

        return modifiedMarket;
    });
};

const hideMarket = (marketId: number) => {
    return reject(rawMarkets(), (market) => market.id === marketId).map((market) => sanitizeRawMarkets(market));
};

describe('EventMarkets utils', () => {
    it('Should replace SPREADS line with next principal line', () => {
        const markets = suspendMarket(SPREADS_MARKET_ID_WE_SUSPEND);
        const data = getGameLineMarkets(markets as MarketModel[]);
        //Replaced suspended market 17432229 with next principal active line 18258164
        expect(data[SPREAD_INDEX]).toMatchObject({ id: NEW_BESTLINE_SPREADS_MARKET_ID, active: true, line: 4.5 });
    });

    it('Should replace MONEY line with default SUSPENDED line', () => {
        const markets = suspendMarket(MONEY_MARKET_ID_WE_SUSPEND);
        const data = getGameLineMarkets(markets as MarketModel[]);
        //Replaced suspended line 16248910 with the same suspended line 16248910 as there is no other principal available
        expect(data[MONEY_INDEX]).toMatchObject({ id: NEW_BESTLINE_MONEY_MARKET_ID, active: false });
    });

    it('Should replace TOTAL line with next principal line', () => {
        const markets = suspendMarket(TOTALS_MARKET_ID_WE_SUSPEND);
        const data = getGameLineMarkets(markets as MarketModel[]);
        //Replaced suspended line 18328245 with next principal active line 18258165
        expect(data[TOTALS_INDEX]).toMatchObject({ id: NEW_BESTLINE_TOTALS_MARKET_ID, active: true, line: 54.5 });
    });

    it('Should return bestMarkets with hidden market as undefined', () => {
        const markets = hideMarket(MONEY_MARKET_ID_WE_SUSPEND);
        const data = getGameLineMarkets(markets as MarketModel[]);

        expect(data[0]).toBeUndefined();
        expect(data.length).toBe(3);
    });

    it('Should return empty as there is no game lines market', () => {
        const data = getGameLineMarkets(rawMarkets());

        expect(data.length).toBe(0);
    });

    it('should not display game lines if one of the markets is hidden', () => {
        const data = generateMarketsGroups(
            rawMarkets().map((market, index) => {
                if (index === 0) {
                    return { ...market, display: false } as MarketModel;
                }

                return market;
            }),
            SportType.Baseball,
        );

        const allElementsDoNotMatch = data.every((item) => item.customName !== MARKET_TEMPLATE_GROUP.gameLines);
        expect(allElementsDoNotMatch).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });

    it('should group markets if mainGroup available for game lines', () => {
        const markets = suspendMarket(TOTALS_MARKET_ID_WE_SUSPEND);
        const data = generateMarketsGroups(markets as MarketModel[], SportType.AmericanFootball);

        expect(data[FIRST_MARKET_INDEX].customName).toBe(MARKET_TEMPLATE_GROUP.gameLines);
        expect(data[FIRST_MARKET_INDEX].markets.length).toBeGreaterThan(0);
        expect(data.length).toBeGreaterThan(1);
    });

    it('Should Group Markets if no mainGroup available', () => {
        const data = generateMarketsGroups(rawMarkets(), SportType.AmericanFootball);

        expect(data[FIRST_MARKET_INDEX].groupName).not.toBe(GAME_LINES);
        expect(data[FIRST_MARKET_INDEX].customName).toBeUndefined();
        expect(data[FIRST_MARKET_INDEX].markets.length).toBeGreaterThan(0);
        expect(data.length).toBeGreaterThan(1);
    });

    it('Should Group Markets if no marketTypeGeneric and mainGroup available', () => {
        const markets = removeTemplateMarketType();
        const data = generateMarketsGroups(markets as MarketModel[], SportType.AmericanFootball);

        expect(data[FIRST_MARKET_INDEX].groupName).not.toBe(GAME_LINES);
        expect(data[FIRST_MARKET_INDEX].customName).toBeUndefined();
        expect(data[FIRST_MARKET_INDEX].markets.length).toBeGreaterThan(0);
        expect(data.length).toBeGreaterThan(1);
    });
});
