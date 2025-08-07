import difference from 'lodash/difference';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import omitBy from 'lodash/omitBy';
import pickBy from 'lodash/pickBy';
import some from 'lodash/some';
import type { CallbackInterface } from 'recoil';

import { getValue } from 'src/common/recoil/snapshot';

import { getMultiBetsSelectionIds, isBuildABetId, isCrossBetId } from '../../../helpers/multiBet';
import { betsAtom } from '../../atoms/betslipBets';
import { betslipSelectionsAtom } from '../../atoms/selections';
import {
    isBuildABetPageRelated,
    isCrossPageRelated,
    resetCrossPageOrphanSelectionsRelation,
    syncCrossPageRelationForSelections,
} from '../../helpers/selection/relation';

export const resetCrossPageRelationForOrphanSelectionsTask =
    ({ set, snapshot }: CallbackInterface) =>
    () => {
        const selections = getValue(snapshot, betslipSelectionsAtom);
        const crossRelatedSelections = pickBy(selections, isCrossPageRelated);

        if (isEmpty(crossRelatedSelections)) {
            return;
        }

        const bets = getValue(snapshot, betsAtom);
        const crossBetSelectionIds = getMultiBetsSelectionIds(bets, isCrossBetId);
        const orphanSelections = difference(keys(crossRelatedSelections), crossBetSelectionIds);

        set(betslipSelectionsAtom, resetCrossPageOrphanSelectionsRelation(orphanSelections));
    };

export const syncCrossPageRelationsTask =
    ({ set, snapshot }: CallbackInterface) =>
    (eventId: number) => {
        const selections = getValue(snapshot, betslipSelectionsAtom);
        const crossRelatedSelections = omitBy(selections, isBuildABetPageRelated);
        const hasSelectionFromSameEvent = some(crossRelatedSelections, { eventId });

        if (!hasSelectionFromSameEvent) {
            return;
        }

        const bets = getValue(snapshot, betsAtom);
        const buildABetSelectionIds = getMultiBetsSelectionIds(bets, isBuildABetId);

        set(betslipSelectionsAtom, syncCrossPageRelationForSelections(buildABetSelectionIds));
    };
