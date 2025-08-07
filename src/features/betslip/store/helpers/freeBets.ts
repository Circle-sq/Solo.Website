import filter from 'lodash/filter';
import find from 'lodash/find';
import get from 'lodash/get';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import keys from 'lodash/keys';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import omitBy from 'lodash/omitBy';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import some from 'lodash/some';
import startsWith from 'lodash/startsWith';

import type { FreeBetAssignment, FreeBetAssignments, FreeBetCredit } from '../../api/types/freeBet';
import type { PossibleBet } from '../../api/types/possibleBet';
import type { FreeBetsUpdateItem } from '../types';

export const isValidFreeBetId = (credits: FreeBetCredit[], selectedId: number | null): boolean =>
    isNull(selectedId) || some(credits, { id: selectedId });

export const getSelectedId = (freeBet: FreeBetAssignment, credits: FreeBetCredit[]): number | null => {
    const selectedId = get(freeBet, 'selectedId', null);

    return isValidFreeBetId(credits, selectedId) ? selectedId : null;
};

export const getAppliedFreeBets = (freeBets: FreeBetAssignments) =>
    omitBy(freeBets, ({ selectedId }) => isNull(selectedId)) as FreeBetAssignments<number>;

export const hasAppliedFreeBet = (freeBets: FreeBetAssignments, selectionId: string): boolean => {
    const appliedFreeBetKey = find(keys(freeBets), (betId) => betId === selectionId);

    return appliedFreeBetKey !== undefined && !isNull(get(freeBets, [appliedFreeBetKey, 'selectedId'], null));
};

export const applyFreeBet =
    ({ betId, creditId }: { betId: string; creditId: number | null }) =>
    (freeBets: FreeBetAssignments): FreeBetAssignments => {
        if (has(freeBets, betId)) {
            return {
                ...freeBets,
                [betId]: {
                    ...freeBets[betId],
                    selectedId: creditId,
                },
            };
        }

        return freeBets;
    };

export const deselectAllFreeBets = (freeBets: FreeBetAssignments): FreeBetAssignments => {
    return mapValues(freeBets, (freeBet) => ({ ...freeBet, selectedId: null }));
};

export const updateFreeBets =
    (bets: PossibleBet[]) =>
    (freeBets: FreeBetAssignments): FreeBetAssignments => {
        const freebetCredits: FreeBetsUpdateItem[] = map(
            filter(bets, ({ freebetCredits }) => !isEmpty(freebetCredits)),
            ({ id, freebetCredits = [] }) => ({ betId: id, credits: freebetCredits }),
        );

        const updatedFreeBets = reduce(
            freebetCredits,
            (acc: FreeBetAssignments, { betId, credits }) => {
                const selectedId = getSelectedId(freeBets[betId], credits);

                acc[betId] = { selectedId, credits };

                return acc;
            },
            {},
        );

        const oldBetKey = find(keys(freeBets), (key) => startsWith(key, 'all'));
        const newBetKey = find(keys(updatedFreeBets), (key) => startsWith(key, 'all'));

        if (!isUndefined(oldBetKey) && !isUndefined(newBetKey) && oldBetKey !== newBetKey) {
            const prevSelectedId = get(freeBets, `${oldBetKey}.selectedId`);
            set(updatedFreeBets, `${newBetKey}.selectedId`, prevSelectedId);

            return updatedFreeBets;
        }

        return updatedFreeBets;
    };

export const getFreeBetsForMultipleTab = (availableFreeBets: FreeBetAssignments, type?: string) => {
    const betId = type !== undefined ? `all${type}` : '';
    const multipleFreeBets = get(availableFreeBets, betId, null);

    if (betId && !isNull(multipleFreeBets)) {
        return { [betId]: multipleFreeBets };
    }

    return {};
};
