import filter from 'lodash/filter';
import flatMap from 'lodash/flatMap';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import omit from 'lodash/omit';
import some from 'lodash/some';
import type { CallbackInterface } from 'recoil';

import { BetStatus } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';
import {
    isActivatedSelectorFamily,
    isDisplayedSelectionSelectorFamily,
    isSuspendedSelectionSelectorFamily,
    selectionStateSelectorFamily,
} from 'src/ui/events/store/selectors/selection';

import { isMultiBetId, splitIds } from '../../../helpers/multiBet';
import { isCrossBetType, isMultiBetType } from '../../../typeGuards/bet';
import { betsAtom, changedPriceBetIdsAtom, uncheckedBetIdsAtom } from '../../atoms/betslipBets';
import { betslipSelectionsAtom } from '../../atoms/selections';
import { uncheckBetslipBetIds } from '../../helpers/betslipBet/toggle';
import { getBetslipBets, isBetChecked } from '../../helpers/betslipBets';
import { betsSelector } from '../../selectors/betslipBets';
import { algoSportErrorsSelector } from '../../selectors/errors';
import { hasOfferSelector } from '../../selectors/offer';
import { betslipSelectionParamIdsSelectorFamily } from '../../selectors/selections';

export const removeBetslipBetTask =
    ({ reset, set }: CallbackInterface) =>
    (betId: string) => {
        if (isMultiBetId(betId)) {
            const multiBetSelectionIds = splitIds(betId);

            set(betslipSelectionsAtom, (selections) => omit(selections, multiBetSelectionIds));
            set(betsAtom, (legs) => omit(legs, [...multiBetSelectionIds, betId]));
        } else {
            set(betslipSelectionsAtom, (selections) => omit(selections, betId));
            set(betsAtom, (bets) => omit(bets, betId));
        }

        reset(changedPriceBetIdsAtom);
    };

export const removeBetslipBetsTask =
    ({ set }: CallbackInterface) =>
    (betIds: string[]) => {
        const betSelectionIds = flatMap(betIds, splitIds);
        const multiBetSelectionIds = filter(betIds, isMultiBetId);

        set(betslipSelectionsAtom, (selections) => omit(selections, betSelectionIds));
        set(betsAtom, (legs) => omit(legs, [...betSelectionIds, ...multiBetSelectionIds]));
    };

export const defineChangedBetsTask =
    ({ snapshot }: CallbackInterface) =>
    () => {
        const bets = getValue(snapshot, betsSelector);
        const uncheckedBetIds = getValue(snapshot, uncheckedBetIdsAtom);
        const hasOffer = getValue(snapshot, hasOfferSelector);

        const betIdsToRemove: string[] = [];
        const betIdsToUncheck: string[] = [];

        forEach(getBetslipBets(bets), (bet, betId) => {
            if (isCrossBetType(bet) && !hasOffer) {
                const algoSportErrors = getValue(snapshot, algoSportErrorsSelector);

                const eventId = get(bet, 'legs.0.event.id');
                const isAlgoSportError = some(algoSportErrors, ({ leg }) => leg?.event.id === eventId);

                if (isAlgoSportError) {
                    betIdsToRemove.push(betId);
                }
            }

            if (isBetChecked(uncheckedBetIds, bet)) {
                const parseSelectionChanges = (selectionId: string) => {
                    const paramIds = getValue(snapshot, betslipSelectionParamIdsSelectorFamily(Number(selectionId)));
                    const state = getValue(snapshot, selectionStateSelectorFamily(paramIds));
                    const isActivated = getValue(snapshot, isActivatedSelectorFamily(paramIds));
                    const isDisplayed = getValue(snapshot, isDisplayedSelectionSelectorFamily(paramIds));
                    const isSuspended = getValue(snapshot, isSuspendedSelectionSelectorFamily(paramIds));

                    if (isSuspended || !isActivated || !isDisplayed) {
                        betIdsToUncheck.push(betId);
                    }

                    if (!hasOffer && (state === BetStatus.Resulted || state === BetStatus.Settled)) {
                        betIdsToRemove.push(betId);
                    }
                };

                if (isMultiBetType(bet)) {
                    forEach(splitIds(betId), parseSelectionChanges);
                } else {
                    parseSelectionChanges(bet.selectionId);
                }
            }
        });

        return { betIdsToRemove, betIdsToUncheck };
    };

export const updateUncheckedBetIdsTask =
    ({ set }: CallbackInterface) =>
    (betIdsToUncheck: string[]) =>
        set(uncheckedBetIdsAtom, uncheckBetslipBetIds(betIdsToUncheck));
