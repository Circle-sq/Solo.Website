import type { BetStatus } from 'src/common/enums';

export interface BetSelectionStatusParams {
    betStatus: BetStatus;
    resultType?: BetStatus;
    payout: number | null;
    totalStake: number;
    isCashedOut: boolean;
    isSingleBet: boolean;
}
