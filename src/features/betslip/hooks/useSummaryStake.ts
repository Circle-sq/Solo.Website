import get from 'lodash/get';
import omitBy from 'lodash/omitBy';
import reduce from 'lodash/reduce';
import { useRecoilCallback } from 'recoil';
import { decimalSeparator } from '@sc-betslip/ui/StakeNumpad/config';

import { playableBalanceSelector } from '@sc-account/store/selectors';
import { store } from '@sc-utils/jotai';

import { BetslipTab } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';

import { usePossibleBets } from '../api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '../enums';
import { betslipActiveTabAtom } from '../store/atoms/betslipTab';
import { systemCombinationAtom } from '../store/atoms/combinations';
import { multipleBetStakesAtom, singleBetStakesAtom } from '../store/atoms/stake';
import { emptyFreeBetAssignment } from '../store/configs';
import { calcBalancedStakes } from '../store/helpers/stake/calc';
import { activeBetsSelector } from '../store/selectors/betslipBets';
import { availableFreeBetsSelector } from '../store/selectors/freeBets';
import { maxStakeSelector } from '../store/selectors/stake';
import { updateCombinationStakeTask, updateSingleBetStakesTask } from '../store/tasks/stake';
import { resetBetslipErrorsTransaction } from '../store/transactions/betslip';

export const useSummaryStake = () => {
    const { getPossibleBets, getPossibleBetsWithCombination } = usePossibleBets();

    const updateSingleBetStakes = useRecoilCallback(updateSingleBetStakesTask, []);
    const updateCombinationStake = useRecoilCallback(updateCombinationStakeTask, []);

    const changeSummaryStake = useRecoilCallback(
        ({ snapshot, transact_UNSTABLE: transact }) =>
            (value: Record<string, number> | number | string) => {
                const betslipTab = getValue(snapshot, betslipActiveTabAtom);

                if (betslipTab === BetslipTab.Single) {
                    const freeBets = getValue(snapshot, availableFreeBetsSelector);

                    updateSingleBetStakes(value as unknown as number, freeBets);
                    transact(resetBetslipErrorsTransaction);

                    getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.UpdateSingleBetStakes });
                } else {
                    updateCombinationStake(value as unknown as number);
                    getPossibleBetsWithCombination({
                        triggeredBy: PossibleBetsTriggeredBy.UpdateCombinationStake,
                    });
                }
            },
        [getPossibleBets, getPossibleBetsWithCombination, updateCombinationStake, updateSingleBetStakes],
    );

    const applyMaxBet = useRecoilCallback(
        ({ snapshot }) =>
            () => {
                const betslipTab = getValue(snapshot, betslipActiveTabAtom);
                const maxStake = getValue(snapshot, maxStakeSelector);
                const playableBalance = store.get(playableBalanceSelector);

                switch (betslipTab) {
                    case BetslipTab.Multi: {
                        changeSummaryStake(maxStake <= playableBalance ? maxStake : playableBalance);

                        break;
                    }

                    case BetslipTab.System: {
                        const systemCombination = getValue(snapshot, systemCombinationAtom);
                        const totalBets = get(systemCombination, 'numLines', 0);

                        changeSummaryStake(
                            maxStake * totalBets <= playableBalance
                                ? maxStake
                                : Math.floor(playableBalance / totalBets),
                        );

                        break;
                    }

                    default: {
                        const availableFreeBets = getValue(snapshot, availableFreeBetsSelector);
                        const activeBets = getValue(snapshot, activeBetsSelector);

                        changeSummaryStake(
                            omitBy(
                                calcBalancedStakes(activeBets, playableBalance),
                                (_, betId) => get(availableFreeBets, betId, emptyFreeBetAssignment).selectedId !== null,
                            ),
                        );
                    }
                }
            },
        [changeSummaryStake],
    );

    const applyPreset = useRecoilCallback(
        ({ snapshot }) =>
            (preset: number) => {
                const betslipTab = getValue(snapshot, betslipActiveTabAtom);
                const multipleBetStakes = getValue(snapshot, multipleBetStakesAtom);

                switch (betslipTab) {
                    case BetslipTab.Multi: {
                        changeSummaryStake(multipleBetStakes[BetslipTab.Multi] + preset);

                        break;
                    }

                    case BetslipTab.System: {
                        changeSummaryStake(multipleBetStakes[BetslipTab.System] + preset);

                        break;
                    }

                    default: {
                        const activeBets = getValue(snapshot, activeBetsSelector);
                        const singleBetStakes = getValue(snapshot, singleBetStakesAtom);
                        const updatedStakes = reduce(
                            activeBets,
                            (acc, bet) => {
                                const betId = bet.selectionId ?? bet.id;
                                const stakePerLine = get(singleBetStakes, betId, 0);

                                return { ...acc, [betId]: stakePerLine + preset };
                            },
                            {},
                        );

                        changeSummaryStake(updatedStakes);
                    }
                }
            },
        [changeSummaryStake],
    );

    const addNumpadDigit = useRecoilCallback(
        ({ snapshot }) =>
            (digit: string) => {
                const betslipTab = getValue(snapshot, betslipActiveTabAtom);
                const multipleBetStakes = getValue(snapshot, multipleBetStakesAtom);

                const appendDigit = (value: string | number, newDigit: string) => {
                    const currentValue = value.toString();

                    if (newDigit === decimalSeparator) {
                        return currentValue.includes(decimalSeparator) ? currentValue : `${currentValue}${newDigit}`;
                    }
                    return `${currentValue}${newDigit}`;
                };

                const isValidNumber = (value: string) => {
                    return value !== '.' && !isNaN(parseFloat(value));
                };

                switch (betslipTab) {
                    case BetslipTab.Multi: {
                        const newValue = appendDigit(multipleBetStakes[BetslipTab.Multi], digit);
                        if (isValidNumber(newValue)) {
                            changeSummaryStake(newValue);
                        }
                        break;
                    }

                    case BetslipTab.System: {
                        const newValue = appendDigit(multipleBetStakes[BetslipTab.System], digit);
                        if (isValidNumber(newValue)) {
                            changeSummaryStake(newValue);
                        }
                        break;
                    }

                    default: {
                        const activeBets = getValue(snapshot, activeBetsSelector);
                        const singleBetStakes = getValue(snapshot, singleBetStakesAtom);
                        const updatedStakes = reduce(
                            activeBets,
                            (acc, bet) => {
                                const betId = bet.selectionId ?? bet.id;
                                const stakePerLine = get(singleBetStakes, betId, '0');
                                const newValue = appendDigit(stakePerLine, digit);

                                return { ...acc, [betId]: isValidNumber(newValue) ? newValue : stakePerLine };
                            },
                            {},
                        );

                        changeSummaryStake(updatedStakes);
                    }
                }
            },
        [changeSummaryStake],
    );

    const numpadBackspace = useRecoilCallback(
        ({ snapshot }) =>
            () => {
                const betslipTab = getValue(snapshot, betslipActiveTabAtom);
                const multipleBetStakes = getValue(snapshot, multipleBetStakesAtom);

                switch (betslipTab) {
                    case BetslipTab.Multi: {
                        changeSummaryStake(Number(String(multipleBetStakes[BetslipTab.Multi]).slice(0, -1)));

                        break;
                    }

                    case BetslipTab.System: {
                        changeSummaryStake(Number(String(multipleBetStakes[BetslipTab.System]).slice(0, -1)));

                        break;
                    }

                    default: {
                        const activeBets = getValue(snapshot, activeBetsSelector);
                        const singleBetStakes = getValue(snapshot, singleBetStakesAtom);
                        const updatedStakes = reduce(
                            activeBets,
                            (acc, bet) => {
                                const betId = bet.selectionId ?? bet.id;
                                const stakePerLine = get(singleBetStakes, betId, 0);

                                return { ...acc, [betId]: Number(String(stakePerLine).slice(0, -1)) };
                            },
                            {},
                        );

                        changeSummaryStake(updatedStakes);
                    }
                }
            },
        [changeSummaryStake],
    );

    const resetStakes = useRecoilCallback(
        ({ snapshot }) =>
            () => {
                const betslipTab = getValue(snapshot, betslipActiveTabAtom);

                switch (betslipTab) {
                    case BetslipTab.Multi: {
                        changeSummaryStake(0);

                        break;
                    }

                    case BetslipTab.System: {
                        changeSummaryStake(0);

                        break;
                    }

                    default: {
                        const activeBets = getValue(snapshot, activeBetsSelector);
                        const updatedStakes = reduce(
                            activeBets,
                            (acc, bet) => {
                                const betId = bet.selectionId ?? bet.id;

                                return { ...acc, [betId]: 0 };
                            },
                            {},
                        );

                        changeSummaryStake(updatedStakes);
                    }
                }
            },
        [changeSummaryStake],
    );

    const changeStakeInput = useRecoilCallback(
        ({ snapshot }) =>
            (value: number | string) => {
                const betslipTab = getValue(snapshot, betslipActiveTabAtom);
                const isMultiOrSystem = betslipTab === BetslipTab.Multi || betslipTab === BetslipTab.System;

                if (isMultiOrSystem) {
                    changeSummaryStake(Number(value));
                } else {
                    const activeBets = getValue(snapshot, activeBetsSelector);
                    const updatedStakes = reduce(
                        activeBets,
                        (acc, bet) => {
                            const betId = bet.selectionId ?? bet.id;

                            return { ...acc, [betId]: value };
                        },
                        {},
                    );

                    changeSummaryStake(updatedStakes);
                }
            },
        [changeSummaryStake],
    );

    return {
        addNumpadDigit,
        applyMaxBet,
        applyPreset,
        changeSummaryStake,
        changeStakeInput,
        numpadBackspace,
        resetStakes,
    };
};
