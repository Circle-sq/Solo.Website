import { LegType, OddsFormat } from 'src/common/enums';
import { PriceType } from 'src/common/types/selectionPrice';

import type { BaseLeg } from '../../api/types/leg';
import { calcTotalOdds } from '../price';

describe('test common functions', () => {
    it('should calculated total odds', () => {
        const legs: BaseLeg[] = [
            { type: LegType.Standard, priceType: PriceType.FP, price: { d: 1.75, f: '3/4' } },
            { type: LegType.Standard, priceType: PriceType.FP, price: { d: 1.98, f: '49/50' } },
        ];

        expect(calcTotalOdds(legs, OddsFormat.Decimal)).toBe('3.46');
        expect(calcTotalOdds(legs, OddsFormat.Fractional)).toBe('493/200');
    });
});
