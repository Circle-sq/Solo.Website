import { selectorFamily } from 'recoil';

import { BetslipTab } from 'src/common/enums';

import { betslipActiveTabAtom } from '../atoms/betslipTab';

import { showBetReceiptSelector } from './betReceipt';
import { hasCheckedMultiBetSelector, hasMultipleBetsCountSelector } from './betslipBets';
import { combinationsEligibilitySelector } from './combinations';
import { hasOfferSelector } from './offer';

export const tabStatusSelectorFamily = selectorFamily<boolean, BetslipTab>({
    key: 'tabStatusSelectorFamily',
    get:
        (tab) =>
        ({ get }) => {
            const hasCheckedMultiBet = get(hasCheckedMultiBetSelector);
            const hasMultipleBetsCount = get(hasMultipleBetsCountSelector);
            const hasOffer = get(hasOfferSelector);
            const { isEligibleForMultiples, isEligibleForSystem } = get(combinationsEligibilitySelector);

            switch (tab) {
                case BetslipTab.Multi:
                    return !(isEligibleForMultiples && hasMultipleBetsCount) || hasOffer;

                case BetslipTab.System:
                    return !(isEligibleForSystem && hasMultipleBetsCount && !hasCheckedMultiBet) || hasOffer;

                default:
                    return hasOffer;
            }
        },
});

export const isDisabledTabSelectorFamily = selectorFamily<boolean, BetslipTab>({
    key: 'isDisabledTabSelectorFamily',
    get:
        (tab) =>
        ({ get }) => {
            const activeTab = get(betslipActiveTabAtom);
            const tabStatus = get(tabStatusSelectorFamily(tab));
            const showBetReceipt = get(showBetReceiptSelector);

            return (activeTab !== tab && tabStatus) || showBetReceipt;
        },
});
