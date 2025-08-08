import find from 'lodash/find';
import keys from 'lodash/keys';
import { useRecoilCallback } from 'recoil';

import { hasBuildABetMaximumSelectionsAtomFamily } from '@solo-buildABet/store/atoms';
import { isEnabledBuildABetFeatureSelectorFamily } from '@solo-buildABet/store/selectors';
import {
    findBuildABetByEventId,
    findBuildABetBySelectionId,
    hasBuildABetReachedMaxSelections,
    isBuildABetReachedMaxLegsCount,
} from '@solo-buildABet/utils/helpers';
import { store } from '@solo-utils/jotai';

import { RouteName } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';
import { routeNameAtom } from 'src/store/common/atoms';

import { usePossibleBets } from '../../api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '../../enums';
import { animationRecordsAtom } from '../atoms/animation';
import { betsAtom } from '../atoms/betslipBets';
import { betslipSelectionsAtom } from '../atoms/selections';
import {
    getSelectionsFromEventWithoutCrossBet,
    hasReachedMaximumSelections,
    normalizeSelection,
} from '../helpers/selection/common';
import { isSelectedSelectorFamily } from '../selectors/selections';
import { addBuildABetSelectionTask, addStandardSelectionTask } from '../tasks/selection/add';
import { removeBuildABetSelectionTask, removeStandardSelectionTask } from '../tasks/selection/remove';
import { resetBetReceiptTransaction } from '../transactions/betReceipt';
import { defineBetslipTabAfterRemoveLegTransaction } from '../transactions/betslipTab';
import type { SelectionPayload } from '../types';

export const useToggleStandardSelection = () => {
    const { getPossibleBets } = usePossibleBets();

    const addSelection = useRecoilCallback(addStandardSelectionTask, []);
    const addBuildABetSelection = useRecoilCallback(addBuildABetSelectionTask, []);
    const removeStandardSelection = useRecoilCallback(removeStandardSelectionTask, []);
    const removeBuildABetSelection = useRecoilCallback(removeBuildABetSelectionTask, []);

    return useRecoilCallback(
        ({ set, reset, snapshot, transact_UNSTABLE: transact }) =>
            (partialSelection: SelectionPayload) => {
                const { eventId, selectionId } = partialSelection;
                const isSelected = getValue(snapshot, isSelectedSelectorFamily(selectionId));

                reset(hasBuildABetMaximumSelectionsAtomFamily(eventId));

                if (isSelected) {
                    const buildABet = find(getValue(snapshot, betsAtom), findBuildABetBySelectionId(selectionId));

                    // Remove Standard selection
                    if (buildABet === undefined) {
                        removeStandardSelection(String(selectionId));
                        transact(defineBetslipTabAfterRemoveLegTransaction);
                        getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.RemoveSelection });

                        return;
                    }

                    // Remove BuildABet selection
                    removeBuildABetSelection(buildABet, String(selectionId));
                    transact(defineBetslipTabAfterRemoveLegTransaction);
                    getPossibleBets({
                        triggeredBy: PossibleBetsTriggeredBy.RemoveBuildABetSelection,
                        animationKey: buildABet.id,
                    });
                } else {
                    const routeName = store.get(routeNameAtom);
                    const isEnabledBuildABet = getValue(snapshot, isEnabledBuildABetFeatureSelectorFamily(eventId));
                    const isBuildABetRelated = isEnabledBuildABet && routeName === RouteName.Event;
                    const buildABet = find(getValue(snapshot, betsAtom), findBuildABetByEventId(eventId));

                    if (isBuildABetRelated && isBuildABetReachedMaxLegsCount(buildABet?.id)) {
                        reset(animationRecordsAtom);
                        set(hasBuildABetMaximumSelectionsAtomFamily(eventId), true);

                        return;
                    }

                    if (hasReachedMaximumSelections(getValue(snapshot, betslipSelectionsAtom))) {
                        window.$appState.messageBox.maximumBetsLimit();

                        return;
                    }

                    transact(resetBetReceiptTransaction);

                    const selection = normalizeSelection({ ...partialSelection, isBuildABetRelated });

                    // Add BuildABet selection
                    if (isBuildABetRelated) {
                        const selections = getValue(snapshot, betslipSelectionsAtom);
                        const selectionsFromEvent = getSelectionsFromEventWithoutCrossBet(selections, eventId);
                        const [animationKey] = keys(selectionsFromEvent);

                        if (hasBuildABetReachedMaxSelections(selectionsFromEvent)) {
                            return;
                        }

                        addBuildABetSelection(selection, animationKey);
                        getPossibleBets({
                            triggeredBy: PossibleBetsTriggeredBy.AddBuildABetSelection,
                            animationKey,
                            prevBuildABetId: buildABet?.id,
                        });

                        return;
                    }

                    // Add Standard selection
                    addSelection(selection);
                    getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.AddSelection });
                }
            },
        [getPossibleBets, addBuildABetSelection, addSelection, removeBuildABetSelection, removeStandardSelection],
    );
};
