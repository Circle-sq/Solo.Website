import some from 'lodash/some';

import { PriceType } from 'src/common/types/selectionPrice';

export const hasStartingPriceType = <T extends { priceType: PriceType }>(legs: T[]) =>
    some(legs, { priceType: PriceType.SP });
