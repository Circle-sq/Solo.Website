import get from 'lodash/get';
import isNumber from 'lodash/isNumber';
import { useCallback } from 'react';
import { type Snapshot, useRecoilCallback } from 'recoil';

import { getValue } from 'src/common/recoil/snapshot';

import { usePossibleBets } from '../api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '../enums';
import { singleBetStakesAtom } from '../store/atoms/stake';
import { betslipBetsSelector } from '../store/selectors/betslipBets';
import { setBetStakeTask } from '../store/tasks/stake';

export const useSelectionStake = (betId: string) => {
    const { getPossibleBets } = usePossibleBets();

    const getStakePerLine = useCallback(
        (snapshot: Snapshot) => {
            const singleBetStakes = getValue(snapshot, singleBetStakesAtom);

            return get(singleBetStakes, betId, 0);
        },
        [betId],
    );

    const setSingleBetStake = useRecoilCallback(setBetStakeTask, []);

    const changeBetStake = useCallback(
        (stakePerLine: number | Record<string, number>) => {
            if (isNumber(stakePerLine)) {
                setSingleBetStake(betId, stakePerLine);
                getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.UpdateSingleBetStake });
            }
        },
        [betId, setSingleBetStake, getPossibleBets],
    );

    const applyMaxBet = useRecoilCallback(
        ({ snapshot }) =>
            () => {
                const betslipBets = getValue(snapshot, betslipBetsSelector);

                changeBetStake(betslipBets[betId].maxStake ?? 0);
            },
        [betId, changeBetStake],
    );

    const applyPreset = useRecoilCallback(
        ({ snapshot }) =>
            (preset: number) => {
                changeBetStake(getStakePerLine(snapshot) + preset);
            },
        [betId, changeBetStake, getStakePerLine],
    );

    const addNumpadDigit = useRecoilCallback(
        ({ snapshot }) =>
            (digit: string) => {
                changeBetStake(Number(getStakePerLine(snapshot) + digit));
            },
        [betId, changeBetStake, getStakePerLine],
    );

    const numpadBackspace = useRecoilCallback(
        ({ snapshot }) =>
            () => {
                changeBetStake(Number(String(getStakePerLine(snapshot)).slice(0, -1)));
            },
        [betId, changeBetStake, getStakePerLine],
    );

    const resetStake = () => changeBetStake(0);

    return { addNumpadDigit, applyMaxBet, applyPreset, changeStakeInput: changeBetStake, numpadBackspace, resetStake };
};
