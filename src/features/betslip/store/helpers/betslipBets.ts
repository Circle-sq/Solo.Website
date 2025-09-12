import every from 'lodash/every';
import includes from 'lodash/includes';
import mapValues from 'lodash/mapValues';
import omitBy from 'lodash/omitBy';
import pickBy from 'lodash/pickBy';
import some from 'lodash/some';

import type { DisableCombinationsIn, Leg, Legs } from '../../api/types/leg';
import type { Problem } from '../../api/types/problem';
import { getMultiBetsSelectionIds, isSelectionIncludedInMultiBet } from '../../helpers/multiBet';
import { isMultiBetType } from '../../typeGuards/bet';

import { disableCombinationsIn as disableBetCombinationsIn } from './selection/disableCombinationsIn';

export const getBetsWithProblems = (bets: Legs, problems: Problem[]): Legs => {
    return pickBy(bets, (bet) =>
        some(problems, ({ selectionIds = [] }) =>
            some(selectionIds, (selectionId) => includes(bet.selectionId ?? bet.id, selectionId)),
        ),
    );
};

export const isChecked = (uncheckedBetIds: string[], betId?: string): boolean =>
    betId !== undefined && !includes(uncheckedBetIds, betId);

export const isBetChecked = (uncheckedBetIds: string[], bet: Leg): boolean => {
    if (isMultiBetType(bet)) {
        return isChecked(uncheckedBetIds, bet.id);
    }

    return isChecked(uncheckedBetIds, bet.selectionId);
};

export const getCheckedBets = (bets: Legs, uncheckedBetIds: string[]): Legs => {
    return pickBy(bets, (bet) => isBetChecked(uncheckedBetIds, bet));
};

export const getUncheckedBets = (bets: Legs, uncheckedBetIds: string[]): Legs => {
    return omitBy(bets, (bet) => isBetChecked(uncheckedBetIds, bet));
};

export const rejectMultiBets =
    (disableCombinationsIn: DisableCombinationsIn) =>
    (legs: Legs): Legs => {
        const filteredLegs = pickBy(
            legs,
            (leg) => !isMultiBetType(leg) || every(disableCombinationsIn, (legType) => !includes(leg.id, legType)),
        );

        return mapValues(filteredLegs, (leg) => {
            if (isMultiBetType(leg)) {
                return leg;
            }

            return { ...leg, disableCombinationsIn };
        });
    };

export const rejectBuildABetFromOtherEvent =
    (eventId: number) =>
    (legs: Legs): Legs => {
        const filteredLegs = pickBy(legs, (leg) => {
            if (!isMultiBetType(leg)) {
                return true;
            }

            const disableCombinationsIn = disableBetCombinationsIn(leg.eventId === eventId);

            return every(disableCombinationsIn, (legType) => !includes(leg.id, legType));
        });

        return mapValues(filteredLegs, (leg) => {
            if (isMultiBetType(leg)) {
                return leg;
            }

            const disableCombinationsIn = disableBetCombinationsIn(leg.eventId === eventId);

            return { ...leg, disableCombinationsIn };
        });
    };

export const getBetsFromSameEvent = (bets: Legs, id: number | null): Legs =>
    pickBy(bets, ({ eventId }) => eventId === id);

export const getBetslipBets = (bets: Legs): Legs => {
    const multiBetsSelectionIds = getMultiBetsSelectionIds(bets);

    return omitBy(bets, (bet) => isSelectionIncludedInMultiBet(multiBetsSelectionIds, bet.selectionId));
};
