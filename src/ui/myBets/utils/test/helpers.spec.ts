import { BetStatus, MyBetsTab, OddsFormat } from 'src/common/enums';
import type { Result } from 'src/common/types/myBet';

import { defineMyBetsTab, getBetLegStatus, getPrice } from '../helpers';

import { liveTabBets, openTabBets, settledTabBets } from './myBetsTabsTestData';

describe('defineMyBetsTab', () => {
    it('should return unselected tab', () => {
        expect(defineMyBetsTab([])).toEqual(MyBetsTab.Settled);
    });

    it('should return Open Tab as one to select', () => {
        expect(defineMyBetsTab(openTabBets)).toEqual(MyBetsTab.CashOut);
    });

    it('should return Live Tab as one to select', () => {
        expect(defineMyBetsTab(liveTabBets)).toEqual(MyBetsTab.Live);
    });

    it('should return Settled Tab as one to select', () => {
        expect(defineMyBetsTab(settledTabBets)).toEqual(MyBetsTab.Settled);
    });
});

describe('getPrice', () => {
    it('should test getPrice function', () => {
        const price = { d: 1.58368, f: '2/2' };

        // the Fractional price should be returned
        expect(getPrice(price, OddsFormat.Fractional)).toBe('2/2');

        // the Decimal formatted price should get returned
        expect(getPrice(price, OddsFormat.Decimal)).toBe('1.58');
    });
});

describe('getBetLegStatus', () => {
    it('should return betStatus if it is Cancelled', () => {
        const betStatus: BetStatus = BetStatus.Cancelled;
        const legResult: Result = { type: BetStatus.Settled };

        const result = getBetLegStatus(betStatus, legResult);

        expect(result).toEqual(BetStatus.Cancelled);
    });

    it('should return betStatus if legResult.type is undefined', () => {
        const betStatus: BetStatus = BetStatus.Settled;
        const legResult = { type: undefined } as unknown as Result;

        const result = getBetLegStatus(betStatus, legResult);

        expect(result).toEqual(betStatus);
    });

    it('should return legResult.type if both betStatus and legResult.type are defined', () => {
        const betStatus: BetStatus = BetStatus.Settled;
        const legResult: Result = { type: BetStatus.Won };

        const result = getBetLegStatus(betStatus, legResult);

        expect(result).toEqual(legResult.type);
    });

    it('should return undefined if both betStatus and legResult are undefined', () => {
        const result = getBetLegStatus(undefined, undefined);

        expect(result).toBeUndefined();
    });
});
