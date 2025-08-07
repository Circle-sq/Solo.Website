import filter from 'lodash/filter';
import get from 'lodash/get';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import keys from 'lodash/keys';
import map from 'lodash/map';
import values from 'lodash/values';
import { selector, selectorFamily } from 'recoil';

import type { OddsFormatLong } from 'src/common/enums';
import { BetslipErrorCode, MinMaxErrorCode } from 'src/common/enums/error';
import { getShortOddsFormat } from 'src/utils/common';

import type { CombinationStandardLeg } from '../../api/types/combination';
import {
    checkCombinationsEligibility,
    getCombinationsWithoutCast,
    isValidCombination,
} from '../../helpers/combinations';
import { calcTotalOdds } from '../../helpers/price';
import type { CombinationsEligibility } from '../../helpers/types';
import { isStandardBetLegType } from '../../typeGuards/leg';
import { combinationsAtom, multipleCombinationAtom } from '../atoms/combinations';
import { standardBetPriceWhileOfferAtomFamily } from '../atoms/offer';

import { isOfferedSelector } from './offer';

export const combinationsEligibilitySelector = selector<CombinationsEligibility>({
    key: 'combinationsEligibilitySelector',
    get: ({ get }) => checkCombinationsEligibility(get(combinationsAtom)),
});

export const multipleCombinationTypeSelector = selector<string | undefined>({
    key: 'multipleCombinationTypeSelector',
    get: ({ get }) => {
        const multipleCombination = get(multipleCombinationAtom);

        return multipleCombination?.type;
    },
});

export const systemCombinationTypesSelector = selector<string[]>({
    key: 'systemCombinationTypesSelector',
    get: ({ get }) => keys(getCombinationsWithoutCast(get(combinationsAtom))),
});

export const hasSystemCombinationSelector = selector<boolean>({
    key: 'hasSystemCombinationSelector',
    get: ({ get }) => !isEmpty(get(systemCombinationTypesSelector)),
});

export const totalOddsSelector = selectorFamily<string, { oddsFormat: OddsFormatLong }>({
    key: 'totalOddsSelector',
    get:
        ({ oddsFormat }) =>
        ({ get: getRecoilValue }) => {
            const isOffered = getRecoilValue(isOfferedSelector);
            const combinations = getRecoilValue(combinationsAtom);
            const oddsFormatShort = getShortOddsFormat(oddsFormat);
            const combinationLegs = get(head(values(combinations)), 'legs');

            if (!isOffered) {
                const errorCodes = [
                    ...Object.values(MinMaxErrorCode),
                    BetslipErrorCode.Related,
                    BetslipErrorCode.SinglesOnly,
                ];
                const validCombinations = filter(combinations, ({ problems }) =>
                    isValidCombination(problems, errorCodes),
                );

                const validCombinationLegs = get(head(values(validCombinations)), 'legs');

                return calcTotalOdds(validCombinationLegs, oddsFormatShort);
            }

            const combinationLegsWhileOffer = map(combinationLegs, (leg) => {
                if (!isStandardBetLegType<CombinationStandardLeg>(leg)) {
                    return leg;
                }

                const standardBetPriceWhileOffer = getRecoilValue(
                    standardBetPriceWhileOfferAtomFamily(String(leg.selection.id)),
                );

                if (isNil(standardBetPriceWhileOffer)) {
                    return leg;
                }

                return { ...leg, price: standardBetPriceWhileOffer };
            });

            return calcTotalOdds(combinationLegsWhileOffer, oddsFormatShort);
        },
});
