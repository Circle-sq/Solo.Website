import find from 'lodash/find';
import get from 'lodash/get';
import keys from 'lodash/keys';
import reject from 'lodash/reject';
import size from 'lodash/size';
import { useRecoilCallback } from 'recoil';

import { MarketType } from 'src/common/enums/market';
import { getValue } from 'src/common/recoil/snapshot';

import { usePossibleBets } from '../../api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '../../enums';
import { splitIds } from '../../helpers/multiBet';
import { isCrossBetType } from '../../typeGuards/bet';
import { animationRecordsAtom, animationSubstitutionTagAtom } from '../atoms/animation';
import { betsAtom } from '../atoms/betslipBets';
import { betslipSelectionsAtom } from '../atoms/selections';
import { addAnimationRecord } from '../helpers/betslipBet/animation';
import { getBetsFromSameEvent } from '../helpers/betslipBets';
import {
    getSelectionsFromEventWithoutBuildABet,
    hasReachedMaximumSelections,
    hasSelectionFromSameMarketType,
    isNonCrossBetCombinableMarketType,
    normalizeSelection,
} from '../helpers/selection/common';
import { isSelectedSelectorFamily, lastSelectionFromEventsSelector } from '../selectors/selections';
import { addCrossSelectionTask } from '../tasks/selection/add';
import { syncCrossPageRelationsTask } from '../tasks/selection/relation';
import { removeCrossSelectionTask } from '../tasks/selection/remove';
import {
    replaceSelectionByMarketTypeTask,
    replaceSelectionFromSameMarketTask,
    replaceOrphanSelectionsTask,
} from '../tasks/selection/replace';
import {
    substituteCrossBetLegFromDifferentMarketTypeTask,
    substituteCrossBetLegFromSameMarketTypeTask,
} from '../tasks/selection/substitute';
import { resetBetReceiptTransaction } from '../transactions/betReceipt';
import { defineBetslipTabAfterRemoveLegTransaction } from '../transactions/betslipTab';
import type { SelectionPayload } from '../types';

export const useToggleCrossSelection = () => {
    const { getPossibleBets } = usePossibleBets();

    const addSelection = useRecoilCallback(addCrossSelectionTask, []);
    const removeSelection = useRecoilCallback(removeCrossSelectionTask, []);
    const replaceOrphanSelections = useRecoilCallback(replaceOrphanSelectionsTask, []);
    const replaceFromSameMarket = useRecoilCallback(replaceSelectionFromSameMarketTask, []);
    const replaceByMarketType = useRecoilCallback(replaceSelectionByMarketTypeTask, []);
    const substituteFromSameMarketType = useRecoilCallback(substituteCrossBetLegFromSameMarketTypeTask, []);
    const substituteFromDifferentMarketType = useRecoilCallback(substituteCrossBetLegFromDifferentMarketTypeTask, []);
    const syncCrossPageRelations = useRecoilCallback(syncCrossPageRelationsTask, []);

    return useRecoilCallback(
        ({ set, snapshot, transact_UNSTABLE: transact }) =>
            (partialSelection: SelectionPayload) => {
                const { selectionId, marketId, eventId, marketType } = partialSelection;
                const selections = getValue(snapshot, betslipSelectionsAtom);
                const isSelected = getValue(snapshot, isSelectedSelectorFamily(selectionId));
                const bets = getValue(snapshot, betsAtom);
                const crossBet = find(getBetsFromSameEvent(bets, eventId), isCrossBetType);
                const hasCrossBet = crossBet !== undefined;

                // Case 1: Remove selected selection
                if (isSelected) {
                    if (hasCrossBet) {
                        set(animationRecordsAtom, addAnimationRecord(crossBet.id as string));
                    }

                    removeSelection(String(selectionId));
                    transact(defineBetslipTabAfterRemoveLegTransaction);
                    getPossibleBets({
                        triggeredBy: PossibleBetsTriggeredBy.RemoveCrossSelection,
                        animationKey: crossBet?.id,
                    });

                    set(animationSubstitutionTagAtom, eventId);

                    return;
                }

                const selection = normalizeSelection({ ...partialSelection, isCrossPageRelated: true });
                const selectionFromSameMarketType = find(selections, { eventId, marketType });
                const totalSelection = find(selections, { eventId, marketType: MarketType.Total });

                syncCrossPageRelations(eventId);

                // Case 2: Perform CrossBet leg substitution
                if (hasCrossBet) {
                    // Case 2.1: Substitute from the same market type
                    if (selectionFromSameMarketType !== undefined) {
                        const [animationKey] = reject(
                            splitIds(crossBet.id),
                            (id) => id === selectionFromSameMarketType.selectionId,
                        );

                        set(animationRecordsAtom, addAnimationRecord(animationKey));

                        substituteFromSameMarketType(crossBet, selection, selectionFromSameMarketType.selectionId);
                        getPossibleBets({
                            triggeredBy: PossibleBetsTriggeredBy.SubstituteFromSameMarketType,
                            animationKey,
                        });

                        set(animationSubstitutionTagAtom, eventId);

                        return;
                    }

                    // Case 2.2: Substitute from the different market type
                    if (totalSelection !== undefined) {
                        set(animationRecordsAtom, addAnimationRecord(totalSelection.selectionId));

                        substituteFromDifferentMarketType(crossBet, selection, totalSelection.selectionId);
                        getPossibleBets({
                            triggeredBy: PossibleBetsTriggeredBy.SubstituteFromDifferentMarketType,
                            animationKey: totalSelection.selectionId,
                        });

                        set(animationSubstitutionTagAtom, eventId);
                    }

                    return;
                }

                const selectionFromSameMarket = find(selections, { marketId });

                // Case 3: Replace selected selection with another one from the same market & not included in CrossBet
                if (selectionFromSameMarket !== undefined) {
                    replaceFromSameMarket(selection, selectionFromSameMarket.selectionId);
                    getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.ReplaceCrossSelection });

                    return;
                }

                const selectionsFromEvent = getSelectionsFromEventWithoutBuildABet(selections, eventId);

                // Case 4: Replace selected selection with another one from the same marketType & not included in CrossBet
                if (
                    marketType !== MarketType.Total &&
                    totalSelection !== undefined &&
                    selectionFromSameMarketType !== undefined
                ) {
                    replaceByMarketType(selection, selectionFromSameMarketType.selectionId);
                    getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.ReplaceCrossSelection });

                    return;
                }

                const lastSelection = get(getValue(snapshot, lastSelectionFromEventsSelector), eventId);

                // Case 5: Replace nonCrossBetCombinable selection
                if (
                    lastSelection !== undefined &&
                    totalSelection !== undefined &&
                    isNonCrossBetCombinableMarketType(selectionsFromEvent, marketType)
                ) {
                    replaceByMarketType(selection, lastSelection.selectionId);
                    getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.ReplaceCrossSelection });

                    return;
                }

                // Case 6: Replace all orphan selections
                if (
                    lastSelection !== undefined &&
                    lastSelection.marketType !== marketType &&
                    size(selectionsFromEvent) > 1 &&
                    !isNonCrossBetCombinableMarketType(selectionsFromEvent, marketType) &&
                    !hasSelectionFromSameMarketType(selectionsFromEvent, marketType)
                ) {
                    set(animationRecordsAtom, addAnimationRecord(lastSelection.selectionId));

                    replaceOrphanSelections(selection, lastSelection);
                    transact(defineBetslipTabAfterRemoveLegTransaction);
                    getPossibleBets({
                        triggeredBy: PossibleBetsTriggeredBy.ReplaceOrphanSelections,
                        animationKey: lastSelection.selectionId,
                    });

                    set(animationSubstitutionTagAtom, selection.eventId);

                    return;
                }

                if (hasReachedMaximumSelections(selections)) {
                    window.$appState.messageBox.maximumBetsLimit();

                    return;
                }

                transact(resetBetReceiptTransaction);

                // Case 7: Add new selection
                const [animationKey] = keys(selectionsFromEvent);
                addSelection(selection, animationKey);
                getPossibleBets({
                    triggeredBy: PossibleBetsTriggeredBy.AddCrossSelection,
                    animationKey,
                });
            },
        [
            addSelection,
            getPossibleBets,
            removeSelection,
            replaceByMarketType,
            replaceFromSameMarket,
            replaceOrphanSelections,
            substituteFromDifferentMarketType,
            substituteFromSameMarketType,
            syncCrossPageRelations,
        ],
    );
};
