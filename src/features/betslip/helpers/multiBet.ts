import filter from 'lodash/filter';
import flatMap from 'lodash/flatMap';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import join from 'lodash/join';
import keys from 'lodash/keys';
import reject from 'lodash/reject';
import size from 'lodash/size';
import split from 'lodash/split';

import { LegType } from 'src/common/enums';

import type { Legs } from '../api/types/leg';
import { DASH } from '../configs';
import { MIN_MULTI_BET_SELECTIONS_COUNT } from '../store/configs';
import { isLegType } from '../typeGuards/leg';

export const splitIds = (betId?: string): string[] => reject(split(betId, DASH), (id) => isEmpty(id) || isLegType(id));

export const isBuildABetId = (betId: string): boolean => includes(betId, LegType.BuildABet);

export const isMultiBetId = (betId: string): boolean => isBuildABetId(betId);

export const isMultiBetWithTwoSelections = (betId?: string) => size(splitIds(betId)) === MIN_MULTI_BET_SELECTIONS_COUNT;

export const getMultiBetSelectionIds = (betId: string | undefined): string[] => {
    const selectionIds = splitIds(betId);

    return selectionIds.length > 1 ? selectionIds : [];
};

export const getMultiBetsSelectionIds = (bets: Legs, predicate = isMultiBetId): string[] => {
    const idsByType = filter(keys(bets), predicate);

    return flatMap(idsByType, splitIds);
};

export const isSelectionIncludedInMultiBet = (multiBetSelectionIds: string[], selectionId: string): boolean => {
    return includes(multiBetSelectionIds, selectionId);
};

export const omitSelectionIdFromMultiBetId = (betId: string, selectionId: string): string => {
    return join(
        reject(split(betId, DASH), (id) => id === selectionId),
        DASH,
    );
};
