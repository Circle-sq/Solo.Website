import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import orderBy from 'lodash/orderBy';
import reduce from 'lodash/reduce';
import size from 'lodash/size';
import { selector, selectorFamily } from 'recoil';

import { equalSelectorFamily } from 'src/common/recoil/equalSelectorFamily';
import { PriceType } from 'src/common/types/selectionPrice';
import type { ParamIds } from 'src/ui/events/store/types';

import { betslipSelectionsAtom } from '../atoms/selections';
import { isBuildABetPageRelated } from '../helpers/selection/relation';
import type { BetslipSelection, BetslipSelections } from '../types';

import { showBetReceiptSelector } from './betReceipt';
import { isSingleTabSelector } from './betslipTab';
import { hasSinglesOnlyMarketProblemSelector } from './problems';
import { uncheckedBetIdsAtom } from '../atoms/betslipBets';

export const betslipSelectionsCountSelector = selector<number>({
    key: 'betslipSelectionsCountSelector',
    get: ({ get }) => size(get(betslipSelectionsAtom)),
});

export const betslipSelectionSelectorFamily = selectorFamily<BetslipSelection | undefined, number>({
    key: 'betslipSelectionSelectorFamily',
    get:
        (selectionId) =>
        ({ get }) => {
            const selections = get(betslipSelectionsAtom);

            if (isEmpty(selections) || !has(selections, selectionId)) {
                return;
            }

            return selections[selectionId];
        },
});

export const betslipSelectionParamIdsSelectorFamily = equalSelectorFamily<ParamIds, number>({
    key: 'betslipSelectionParamIdsSelectorFamily',
    cachePolicy_UNSTABLE: { eviction: 'most-recent' },
    get:
        (selectionId) =>
        ({ get }) => {
            const selection = get(betslipSelectionSelectorFamily(selectionId));

            return {
                eventId: selection?.eventId,
                marketId: selection?.marketId,
                selectionId: Number(selection?.selectionId),
            };
        },
    propsAreEqual: (newParamIds, oldParamIds) => newParamIds?.eventId === oldParamIds?.eventId,
});

export const isSelectionSpSelectorFamily = selectorFamily<boolean, number>({
    key: 'isSelectionSpSelectorFamily',
    cachePolicy_UNSTABLE: { eviction: 'most-recent' },
    get:
        (selectionId) =>
        ({ get }) => {
            const selection = get(betslipSelectionSelectorFamily(selectionId));

            return selection?.priceType === PriceType.SP;
        },
});

export const lastSelectionFromEventsSelector = selector<Record<number, BetslipSelection>>({
    key: 'lastSelectionFromEventsSelector',
    get: ({ get }) =>
        reduce(
            get(betslipSelectionsAtom),
            (acc: Record<number, BetslipSelection>, selection) => {
                const { eventId, timestamp } = selection;

                if (!has(acc, eventId) || timestamp > acc[eventId].timestamp) {
                    return { ...acc, [eventId]: selection };
                }

                return acc;
            },
            {},
        ),
});

export const lastSelectionSelector = selector<BetslipSelection | undefined>({
    key: 'lastSelectionSelector',
    get: ({ get }) => {
        const [lastSelection] = orderBy(get(betslipSelectionsAtom), 'timestamp', 'desc');

        return lastSelection;
    },
});

export const isSelectedSelectorFamily = selectorFamily<boolean, number>({
    key: 'isSelectedSelectorFamily',
    get:
        (selectionId) =>
        ({ get }) => {
            const selection = get(betslipSelectionSelectorFamily(selectionId));
            const showBetReceipt = get(showBetReceiptSelector);

            return selection !== undefined && !showBetReceipt;
        },
});

export const hasNonCombinableSelectionSelector = selector<boolean>({
    key: 'hasNonCombinableSelectionSelector',
    get: ({ get }) => {
        const hasSinglesOnlyMarketProblem = get(hasSinglesOnlyMarketProblemSelector);
        const isSingleTab = get(isSingleTabSelector);

        return hasSinglesOnlyMarketProblem && !isSingleTab;
    },
});

export const isBuildABetPageRelatedSelectionSelector = selectorFamily<boolean, number>({
    key: 'isBuildABetPageRelatedSelectionSelector',
    get:
        (selectionId) =>
        ({ get }) => {
            const selection = get(betslipSelectionSelectorFamily(selectionId));

            if (isUndefined(selection)) {
                return false;
            }

            return isBuildABetPageRelated(selection);
        },
});

export const checkedSelectionsSelector = selector({
    key: 'checkedSelectionsSelector',
    get: ({ get }) => {
        const selections = get(betslipSelectionsAtom);
        const uncheckedBetIds = get(uncheckedBetIdsAtom);

        return Object.values(selections).reduce((result, selection) => {
            if (!uncheckedBetIds.includes(selection.selectionId)) {
                result[selection.selectionId] = selection;
            }

            return result;
        }, {} as BetslipSelections);
    },
});
