import type { CallbackInterface } from 'recoil';

import { getValue } from 'src/common/recoil/snapshot';

import { pickFreeBetCredit } from '../../helpers/freeBet';
import { freeBetsAtom } from '../atoms/freeBets';
import { singleBetStakesAtom } from '../atoms/stake';
import { applyFreeBet } from '../helpers/freeBets';
import { setSingleBetStake } from '../helpers/stake/common';
import { availableFreeBetsByBetIdSelectorFamily, freeBetsForMultipleTabSelector } from '../selectors/freeBets';
import { updateCombinationStakeTask } from '../tasks/stake';

export const selectSingleBetFreeBetTask =
    ({ snapshot, set }: CallbackInterface) =>
    (betId: string, creditId: number) => {
        const freeBets = getValue(snapshot, availableFreeBetsByBetIdSelectorFamily(betId));
        const freeBetCredit = pickFreeBetCredit(freeBets, creditId);

        if (freeBetCredit !== null) {
            set(freeBetsAtom, applyFreeBet({ betId, creditId }));
            set(singleBetStakesAtom, setSingleBetStake(betId, freeBetCredit.amount));
        }
    };

export const toggleSingleBetFreeBetTask =
    ({ snapshot, set }: CallbackInterface) =>
    (betId: string) => {
        const { credits, selectedId } = getValue(snapshot, availableFreeBetsByBetIdSelectorFamily(betId));

        if (selectedId !== null) {
            set(freeBetsAtom, applyFreeBet({ betId, creditId: null }));
            set(singleBetStakesAtom, setSingleBetStake(betId, 0));
        } else if (credits.length === 1) {
            const [credit] = credits;

            set(freeBetsAtom, applyFreeBet({ betId, creditId: credit.id }));
            set(singleBetStakesAtom, setSingleBetStake(betId, credit.amount));
        }
    };

export const selectSummaryFreeBetTask =
    ({ snapshot, set }: CallbackInterface) =>
    (creditId: number) => {
        const { betId, multipleFreeBets } = getValue(snapshot, freeBetsForMultipleTabSelector);
        const freeBetCredit = pickFreeBetCredit(multipleFreeBets, creditId);

        if (betId !== null && freeBetCredit !== null) {
            set(freeBetsAtom, applyFreeBet({ betId, creditId }));
            updateCombinationStakeTask({ snapshot, set })(freeBetCredit.amount);
        }
    };

export const toggleSummaryFreeBetTask =
    ({ snapshot, set }: CallbackInterface) =>
    () => {
        const { betId, multipleFreeBets } = getValue(snapshot, freeBetsForMultipleTabSelector);

        if (betId !== null) {
            const { selectedId, credits } = multipleFreeBets;
            const updateCombinationStake = updateCombinationStakeTask({ snapshot, set });

            if (selectedId !== null) {
                set(freeBetsAtom, applyFreeBet({ betId, creditId: null }));
                updateCombinationStake(0);
            } else if (credits.length === 1) {
                const [credit] = credits;

                set(freeBetsAtom, applyFreeBet({ betId, creditId: credit.id }));
                updateCombinationStake(credit.amount);
            }
        }
    };
