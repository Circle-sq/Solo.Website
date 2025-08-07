import get from 'lodash/get';
import pick from 'lodash/pick';

import type { BetslipTab } from 'src/common/enums';

import type { BetStake } from '../../../api/types/bet';
import type { ReferredBet } from '../../../api/types/referredBet';
import { betStakeKeys, EMPTY_STAKE, STAKE_INPUT_MAX_VALUE_LENGTH } from '../../configs';
import type { MultipleBetStakes } from '../../types';

export const getStakePerLine = (singleBetStakes: Record<string, number>, selectionId?: number | string): number =>
    selectionId !== undefined ? get(singleBetStakes, selectionId, EMPTY_STAKE) : EMPTY_STAKE;

export const setSingleBetStake =
    (betId: string, stakePerLine: number) =>
    (state: Record<string, number>): Record<string, number> => ({
        ...state,
        [betId]: stakePerLine,
    });

export const setMultipleBetStake =
    (tab: BetslipTab.Multi | BetslipTab.System, stakePerLine: number) =>
    (state: MultipleBetStakes): MultipleBetStakes => ({
        ...state,
        [tab]: stakePerLine,
    });

export const getMultipleBetStakes = (bets: ReferredBet[]): BetStake => {
    const [multiBet] = bets;

    return pick(multiBet, betStakeKeys);
};

export const hasExceededStakeValueLength = (stake: number): boolean => {
    return stake.toString().length > STAKE_INPUT_MAX_VALUE_LENGTH;
};
