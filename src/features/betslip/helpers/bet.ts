import join from 'lodash/join';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import toString from 'lodash/toString';

import { encoder } from 'src/utils/encoder';

import type { BetLeg, Leg, MultiBetLeg } from '../api/types/leg';
import type { ReferredLeg } from '../api/types/referredBet';
import { DASH } from '../configs';
import { isMultiBetType } from '../typeGuards/bet';
import { isMultiBetLegType } from '../typeGuards/leg';

export const getSelectionIdsFromMultiBetLeg = <T extends MultiBetLeg>({ marketsAndSelections }: T): number[] =>
    sortBy(map(marketsAndSelections, ({ selection }) => Number(selection.id)));

export const generateMultiBetId = <T extends MultiBetLeg>(leg: T, withType = true) => {
    const selectionIds = getSelectionIdsFromMultiBetLeg(leg);

    return join(withType ? [...selectionIds, leg.type] : selectionIds, DASH);
};

export const generateBetId = <T extends ReferredLeg>(leg: T): string => {
    if (isMultiBetLegType<MultiBetLeg>(leg)) {
        return generateMultiBetId(leg);
    }

    return String(leg.selection?.id);
};

export const getSelectionIdsFromLeg = <T extends BetLeg>(leg: T): string[] => {
    if (isMultiBetLegType<MultiBetLeg>(leg)) {
        return map(getSelectionIdsFromMultiBetLeg(leg), toString);
    }

    return [String(leg.selection.id)];
};

export const getBetKey = (bet: Leg, index: number): string => {
    if (isMultiBetType(bet)) {
        return encoder(String(bet.event?.id), index);
    }

    return encoder(bet.selectionId, index);
};
