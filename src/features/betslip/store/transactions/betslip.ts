import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';
import type { TransactionInterface_UNSTABLE as TransactionInterface } from 'recoil';

import type { MarketHandler } from 'src/appState/lib/types';
import type { SelectionItem, Selections } from 'src/common/types/selection';
import { priceDirectionAtomFamily } from 'src/ui/events/store/atoms';
import { definePriceChangeDirection } from 'src/ui/events/store/helpers';
import { selectionDecimalPriceSelectorFamily } from 'src/ui/events/store/selectors/selection';

import { isSelectionPriceUpdated } from '../../helpers/helpers';
import { animationRecordsAtom } from '../atoms/animation';
import { betslipErrorsAtom, betslipProblemsAtom, possibleBetsTriggersAtom } from '../atoms/betslip';
import { betsAtom, changedPriceBetIdsAtom, singleBetsAtom, uncheckedBetIdsAtom } from '../atoms/betslipBets';
import { betslipActiveTabAtom, isTabSelectedByUserAtom } from '../atoms/betslipTab';
import {
    combinationsAtom,
    multipleCombinationAtom,
    systemBetTypeAtom,
    systemCombinationAtom,
} from '../atoms/combinations';
import { freeBetsAtom } from '../atoms/freeBets';
import { offerAtom } from '../atoms/offer';
import { betslipSelectionsAtom } from '../atoms/selections';
import { multipleBetStakesAtom, singleBetStakesAtom } from '../atoms/stake';
import { syncCombinationPrice, updateCombinationsPrice } from '../helpers/combinations';
import { syncBetslipSelectionsPrice } from '../helpers/selection/sync';
import { syncSingleBetsPrice } from '../helpers/singleBets';

export const resetBetslipErrorsTransaction = ({ reset }: Pick<TransactionInterface, 'reset'>) => {
    reset(betslipErrorsAtom);
    reset(betslipProblemsAtom);
};

export const resetBetslipStateTransaction = ({ get, reset }: Pick<TransactionInterface, 'get' | 'reset'>) => {
    forEach(get(possibleBetsTriggersAtom), ({ controller }) => {
        if (!controller.signal.aborted) {
            controller.abort('RESET_BETSLIP_STATE');
        }
    });

    reset(possibleBetsTriggersAtom);

    reset(singleBetStakesAtom);
    reset(multipleBetStakesAtom);

    resetBetslipErrorsTransaction({ reset });

    reset(betsAtom);
    reset(betslipSelectionsAtom);
    reset(multipleCombinationAtom);
    reset(systemCombinationAtom);
    reset(combinationsAtom);
    reset(freeBetsAtom);
    reset(systemBetTypeAtom);
    reset(isTabSelectedByUserAtom);
    reset(offerAtom);
    reset(betslipActiveTabAtom);
    reset(animationRecordsAtom);
    reset(uncheckedBetIdsAtom);
    reset(changedPriceBetIdsAtom);
};

export const syncPriceChangeTransaction =
    (selections: Record<number, SelectionItem>) =>
    ({ get, set }: Pick<TransactionInterface, 'get' | 'set'>) => {
        const betslipSelections = get(betslipSelectionsAtom);
        const updatedSelections = pickBy(selections, (selection) =>
            isSelectionPriceUpdated(betslipSelections, selection),
        );

        if (!isEmpty(updatedSelections)) {
            set(betslipSelectionsAtom, syncBetslipSelectionsPrice(updatedSelections));
            set(singleBetsAtom, syncSingleBetsPrice(updatedSelections));
            set(multipleCombinationAtom, syncCombinationPrice(updatedSelections));
            set(systemCombinationAtom, syncCombinationPrice(updatedSelections));
            set(combinationsAtom, updateCombinationsPrice(updatedSelections));

            set(changedPriceBetIdsAtom, (state) => [...state, ...keys(updatedSelections)]);
        }
    };

export const syncPriceDirectionTransaction =
    (selections: Record<number, SelectionItem>, { eventId, marketId }: MarketHandler) =>
    ({ get, set }: Pick<TransactionInterface, 'get' | 'set'>) => {
        forEach(selections, ({ id, price }) => {
            const decimalPrice = get(
                selectionDecimalPriceSelectorFamily({
                    eventId,
                    marketId,
                    selectionId: id,
                }),
            );

            if (decimalPrice === null) {
                return;
            }

            set(priceDirectionAtomFamily(id), definePriceChangeDirection(price?.d, decimalPrice));
        });
    };

export const syncBetslipPricesTransaction =
    ({ set }: TransactionInterface) =>
    (selections: Selections) => {
        set(betslipSelectionsAtom, syncBetslipSelectionsPrice(selections));
        set(singleBetsAtom, syncSingleBetsPrice(selections));
        set(multipleCombinationAtom, syncCombinationPrice(selections));
        set(systemCombinationAtom, syncCombinationPrice(selections));
        set(combinationsAtom, updateCombinationsPrice(selections));
    };
