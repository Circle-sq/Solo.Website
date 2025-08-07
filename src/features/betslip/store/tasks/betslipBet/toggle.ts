import keys from 'lodash/keys';
import type { CallbackInterface } from 'recoil';

import { getValue } from 'src/common/recoil/snapshot';

import { betsAtom, changedPriceBetIdsAtom, uncheckedBetIdsAtom } from '../../atoms/betslipBets';
import { freeBetsAtom } from '../../atoms/freeBets';
import { singleBetStakesAtom } from '../../atoms/stake';
import { toggleBetslipBet } from '../../helpers/betslipBet/toggle';
import { getBetslipBets } from '../../helpers/betslipBets';
import { applyFreeBet, deselectAllFreeBets } from '../../helpers/freeBets';
import { setSingleBetStake } from '../../helpers/stake/common';
import { hasUncheckedBetSelector, isCheckedBetslipBetSelectorFamily } from '../../selectors/betslipBets';
import { availableFreeBetsByBetIdSelectorFamily } from '../../selectors/freeBets';

export const toggleBetslipBetTask =
    ({ reset, set, snapshot }: CallbackInterface) =>
    (betId: string) => {
        const { selectedId: selectedFreeBetId } = getValue(snapshot, availableFreeBetsByBetIdSelectorFamily(betId));
        const isChecked = getValue(snapshot, isCheckedBetslipBetSelectorFamily(betId));

        if (isChecked) {
            reset(changedPriceBetIdsAtom);
        }

        set(uncheckedBetIdsAtom, toggleBetslipBet(betId));

        if (selectedFreeBetId !== null && isChecked) {
            set(freeBetsAtom, applyFreeBet({ betId, creditId: null }));
            set(singleBetStakesAtom, setSingleBetStake(betId, 0));
        }
    };

export const toggleAllBetslipBetsTask =
    ({ reset, set, snapshot }: CallbackInterface) =>
    () => {
        const hasUncheckedBet = getValue(snapshot, hasUncheckedBetSelector);

        if (hasUncheckedBet) {
            reset(uncheckedBetIdsAtom);
        } else {
            reset(changedPriceBetIdsAtom);
            set(freeBetsAtom, deselectAllFreeBets);

            const betslipBets = getBetslipBets(getValue(snapshot, betsAtom));
            set(uncheckedBetIdsAtom, keys(betslipBets));
        }
    };
