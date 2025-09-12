import { BetslipTab } from 'src/common/enums';
import { BetslipErrorCode, MinMaxErrorCode, PriceErrorCode } from 'src/common/enums/error';

import type { BetStake } from '../api/types/bet';
import type { Combination } from '../api/types/combination';
import type { FreeBetAssignment } from '../api/types/freeBet';

export const emptyFreeBetAssignment: FreeBetAssignment = {
    credits: [],
    selectedId: null,
};

export const baseCombinationKeys: (keyof Combination)[] = [
    'type',
    'name',
    'ewOffered',
    'freebetCredits',
    'freebetRemarks',
    'potentialReturns',
    'potentialReturnsEw',
    'stakePerLine',
    'maxStake',
    'numLines',
    'problems',
    'price',
    'legs',
];

export const betStakeKeys: (keyof BetStake)[] = ['stakePerLine', 'potentialReturns', 'totalStake'];

export const ANIMATION_DURATION = 800;

export const MAXIMUM_SELECTIONS_IN_BETSLIP_LIMIT = 25;

export const MIN_MULTI_BET_SELECTIONS_COUNT = 2;

export const MIN_ACTIVE_BETS = 1;

export const EMPTY_STAKE = 0;

export const STAKE_INPUT_MAX_COMMAS_LENGTH = 2;

export const STAKE_INPUT_MAX_VALUE_LENGTH = 9;

export const STAKE_INPUT_MAX_LENGTH = STAKE_INPUT_MAX_VALUE_LENGTH + STAKE_INPUT_MAX_COMMAS_LENGTH;

export const validationCodesWithLegsPointer = [
    BetslipErrorCode.Related,
    BetslipErrorCode.SinglesOnly,
    BetslipErrorCode.Suspended,
];

export const betsLimitByTab: Readonly<Record<BetslipTab, number>> = {
    [BetslipTab.Single]: 1,
    [BetslipTab.Multi]: 2,
    [BetslipTab.System]: 3,
};

// possible-bets codes
export const skipErrors = [
    BetslipErrorCode.Related,
    BetslipErrorCode.Suspended,
    BetslipErrorCode.SinglesOnly,
    `Bet:${MinMaxErrorCode.BelowMinimum}`,
    `Bet:${MinMaxErrorCode.MaxPayout}`,
    `Bet:${MinMaxErrorCode.TooHigh}`,
    'started',
    'minimum',
    PriceErrorCode.Increased,
    PriceErrorCode.Decreased,
    'resulted',
    'settled',
    'price-missing',
    'Bet exceeds max payout',
    MinMaxErrorCode.BelowMinimum,
    MinMaxErrorCode.TooHigh,
    MinMaxErrorCode.MaxPayout,
    'buildABet-inPlay-not-allowed',
];

// possible-bets codes
export const skipErrorsSingles = [BetslipErrorCode.SinglesOnly];

// place-bet codes
export const skipPlaceBetErrors = [
    BetslipErrorCode.PanicModeEnabled,
    'event',
    'market',
    'selection',
    'price',
    'tradedInPlay',
    'selection-lost',
    'market-resulted',
    'error',
];
