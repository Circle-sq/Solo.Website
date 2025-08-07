import every from 'lodash/every';
import isEmpty from 'lodash/isEmpty';
import { selector, selectorFamily } from 'recoil';

import { BetType, PlacedBetType, type OddsFormatLong } from 'src/common/enums';
import { getShortOddsFormat } from 'src/utils/common';

import { identifyBetType } from '../../helpers/combinations';
import { calcTotalOdds } from '../../helpers/price';
import { betReceiptAtom } from '../atoms/betReceipt';

import { betslipBetsSelector } from './betslipBets';
import { isSingleTabSelector } from './betslipTab';

export const betTypeNameSelector = selector({
    key: 'betTypeNameSelector',
    get: ({ get }) => {
        const { betName = '' } = get(betReceiptAtom);

        return betName;
    },
});

export const betReceiptTotalOddsSelector = selectorFamily<string, { oddsFormat: OddsFormatLong }>({
    key: 'betReceiptTotalOddsSelector',
    get:
        ({ oddsFormat }) =>
        ({ get }) => {
            const { legs } = get(betReceiptAtom);

            return calcTotalOdds(legs, getShortOddsFormat(oddsFormat));
        },
});

export const identifiedBetTypeSelector = selector({
    key: 'identifiedBetTypeSelector',
    get: ({ get }) => {
        const { betType = BetType.Single } = get(betReceiptAtom);

        return identifyBetType(betType);
    },
});

export const hasBetReceiptFreeBetSelector = selector({
    key: 'hasBetReceiptFreeBetSelector',
    get: ({ get }) => {
        const { isFreeBet = false } = get(betReceiptAtom);

        return isFreeBet;
    },
});

export const showBetReceiptSelector = selector({
    key: 'showBetReceiptSelector',
    get: ({ get }) => !isEmpty(get(betReceiptAtom).legs),
});

export const showBetReceiptTotalOddsSelector = selector({
    key: 'showBetReceiptTotalOddsSelector',
    get: ({ get }) => {
        const { legs } = get(betReceiptAtom);
        const betType = get(identifiedBetTypeSelector);

        return legs.length > 1 && betType === PlacedBetType.Multi;
    },
});

export const showBetReferralSelector = selector({
    key: 'showBetReferralSelector',
    get: ({ get }) => {
        const isSingleTab = get(isSingleTabSelector);

        return every(get(betslipBetsSelector), 'betReferralEnabled') && !isSingleTab;
    },
});
