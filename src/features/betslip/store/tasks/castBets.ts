import type { CallbackInterface } from 'recoil';

import { userDataAtom } from '@sc-account/store/atoms';
import { store } from '@sc-utils/jotai';

import { BetslipTab } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';

import type { CastBet } from '../../api/types/castBet';
import {
    formatCastMultipleBet,
    formatCastSingleBets,
    formatCastSystemBet,
    rejectSinglesIncludedInMultiBets,
} from '../../helpers/castBets';
import { betReceiptAtom } from '../atoms/betReceipt';
import { singleBetsAtom } from '../atoms/betslipBets';
import { betslipActiveTabAtom } from '../atoms/betslipTab';
import { multipleCombinationAtom, systemCombinationAtom } from '../atoms/combinations';
import { freeBetsAtom } from '../atoms/freeBets';
import { multipleBetStakesAtom, singleBetStakesAtom } from '../atoms/stake';
import { setBetReceiptTypeName } from '../helpers/betReceipt';
import { getAppliedFreeBets } from '../helpers/freeBets';

export const syncCastBetsTask =
    ({ set, snapshot }: CallbackInterface) =>
    (): CastBet[] | undefined => {
        const betslipTab = getValue(snapshot, betslipActiveTabAtom);
        const multipleBetStakes = getValue(snapshot, multipleBetStakesAtom);
        const userData = store.get(userDataAtom);

        if (userData?.wallet?.currency == null) {
            return;
        }

        if (betslipTab === BetslipTab.System) {
            const systemCombination = getValue(snapshot, systemCombinationAtom);

            if (systemCombination === undefined) {
                return;
            }

            set(betReceiptAtom, setBetReceiptTypeName(systemCombination));

            const stakePerLine = multipleBetStakes[BetslipTab.System];
            const castSystemBet = formatCastSystemBet(systemCombination, userData, stakePerLine);

            if (castSystemBet === undefined) {
                return;
            }

            return [castSystemBet];
        }

        const freeBets = getValue(snapshot, freeBetsAtom);
        const appliedFreeBets = getAppliedFreeBets(freeBets);

        if (betslipTab === BetslipTab.Multi) {
            const multipleCombination = getValue(snapshot, multipleCombinationAtom);

            if (multipleCombination === undefined) {
                return;
            }

            set(betReceiptAtom, setBetReceiptTypeName(multipleCombination));

            const stakePerLine = multipleBetStakes[BetslipTab.Multi];
            const castMultipleBet = formatCastMultipleBet(multipleCombination, appliedFreeBets, userData, stakePerLine);

            if (castMultipleBet === undefined) {
                return;
            }

            return [castMultipleBet];
        }

        const singleBets = rejectSinglesIncludedInMultiBets(getValue(snapshot, singleBetsAtom));
        const singleBetStakes = getValue(snapshot, singleBetStakesAtom);

        return formatCastSingleBets(singleBets, appliedFreeBets, userData, singleBetStakes);
    };
