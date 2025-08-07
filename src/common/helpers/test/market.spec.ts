import { isHandicapMarket, isOverUnderMarket } from 'src/common/helpers/market';

describe('market helpers', () => {
    const market1 = { marketTypeGeneric: 'overunder and something else' };
    const market2 = { marketTypeGeneric: 'handicap and something else' };

    it('should test isOverUnderMarket function', () => {
        expect(isOverUnderMarket(market1)).toBeTruthy();
        expect(isOverUnderMarket(market2)).toBeFalsy();
    });

    it('should test isHandicapMarket function', () => {
        expect(isHandicapMarket(market2)).toBeTruthy();
        expect(isHandicapMarket(market1)).toBeFalsy();
    });
});
