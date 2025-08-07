import get from 'lodash/get';
import isNumber from 'lodash/isNumber';
import mapValues from 'lodash/mapValues';
import values from 'lodash/values';
import type { CallbackInterface } from 'recoil';

import { BetslipTab } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';

import type { FreeBetAssignments } from '../../api/types/freeBet';
import { betsAtom } from '../atoms/betslipBets';
import { betslipActiveTabAtom } from '../atoms/betslipTab';
import {
    combinationsAtom,
    multipleCombinationAtom,
    systemBetTypeAtom,
    systemCombinationAtom,
} from '../atoms/combinations';
import { multipleBetStakesAtom, singleBetStakesAtom } from '../atoms/stake';
import { getBetslipBets } from '../helpers/betslipBets';
import { updateCombinationsStakePerLine, updateCombinationStakePerLine } from '../helpers/combinations';
import { hasAppliedFreeBet } from '../helpers/freeBets';
import { hasExceededStakeValueLength, setMultipleBetStake, setSingleBetStake } from '../helpers/stake/common';

export const setBetStakeTask =
    ({ set }: CallbackInterface) =>
    (betId: string, stakePerLine: number) => {
        set(singleBetStakesAtom, (singleBetStakes) => {
            if (hasExceededStakeValueLength(stakePerLine)) {
                return setSingleBetStake(betId, get(singleBetStakes, betId, 0))(singleBetStakes);
            }

            return setSingleBetStake(betId, stakePerLine)(singleBetStakes);
        });
    };

export const updateSingleBetStakesTask =
    ({ set, snapshot }: CallbackInterface) =>
    (value: Record<string, number> | number, freeBets: FreeBetAssignments) => {
        const bets = getBetslipBets(getValue(snapshot, betsAtom));

        set(singleBetStakesAtom, (singleBetStakes) => {
            if (isNumber(value)) {
                const [bet] = values(bets);
                const betId = bet.selectionId ?? bet.id;

                if (!hasAppliedFreeBet(freeBets, betId) && !hasExceededStakeValueLength(value)) {
                    return { [betId]: value };
                }

                return { [betId]: get(singleBetStakes, betId, 0) };
            }

            return mapValues(value, (stake, betId) => {
                if (!hasAppliedFreeBet(freeBets, betId) && !hasExceededStakeValueLength(stake)) {
                    return stake;
                }

                return get(singleBetStakes, betId, 0);
            });
        });
    };

export const updateCombinationStakeTask =
    ({ set, snapshot }: Pick<CallbackInterface, 'set' | 'snapshot'>) =>
    (stakePerLine: number) => {
        const betslipTab = getValue(snapshot, betslipActiveTabAtom);

        if (hasExceededStakeValueLength(stakePerLine)) {
            return;
        }

        if (betslipTab === BetslipTab.Multi) {
            const multipleCombination = getValue(snapshot, multipleCombinationAtom);

            set(multipleBetStakesAtom, setMultipleBetStake(BetslipTab.Multi, stakePerLine));
            set(multipleCombinationAtom, updateCombinationStakePerLine(stakePerLine, multipleCombination));
            set(combinationsAtom, updateCombinationsStakePerLine(stakePerLine, multipleCombination?.type));
        }

        if (betslipTab === BetslipTab.System) {
            const systemBetType = getValue(snapshot, systemBetTypeAtom);
            const systemCombination = getValue(snapshot, systemCombinationAtom);

            set(multipleBetStakesAtom, setMultipleBetStake(BetslipTab.System, stakePerLine));
            set(systemCombinationAtom, updateCombinationStakePerLine(stakePerLine, systemCombination));
            set(combinationsAtom, updateCombinationsStakePerLine(stakePerLine, systemBetType));
        }
    };
