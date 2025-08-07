import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';
import { v4 as uuidv4 } from 'uuid';

import { BetType } from 'src/common/enums';
import { hasStartingPriceType } from 'src/common/helpers/price';

import type { PlacedBet, PlacedBetLeg } from '../../api/types/placedBet';
import type { BetReceipt } from '../types';

export const getBetReceipt = (bets: PlacedBet[], isFreeBet: boolean): BetReceipt => {
    let betsCount = 0;
    let totalStake = 0;
    let totalPotentialReturns = 0;

    const legs = bets.reduce((acc: PlacedBetLeg[], bet) => {
        betsCount += bet.numLines ?? bet.legs.length;
        totalStake += bet.totalStake;
        totalPotentialReturns += bet.potentialReturns;

        const isFreeBet = !isEmpty(bet.transaction?.tags?.freebetCredits) || get(bet, 'freebet', false);

        return acc.concat(
            bet.legs.map((leg: PlacedBetLeg) => ({
                ...leg,
                uuid: leg.uuid ?? uuidv4(),
                stakePerLine: bet.stakePerLine,
                potentialReturns: bet.potentialReturns,
                isFreeBet,
            })),
        );
    }, []);

    const hasBetWithSP = some(bets, ({ legs }) => hasStartingPriceType(legs));

    return {
        legs,
        betsCount,
        totalStake,
        totalPotentialReturns: hasBetWithSP ? 0 : totalPotentialReturns,
        isFreeBet: isFreeBet || some(bets, 'freebet'),
    };
};

export const setBetReceipt =
    (bets: PlacedBet[], hasAppliedFreeBets: boolean) =>
    (betReceipt: BetReceipt): BetReceipt => {
        const updatedBetReceipt = getBetReceipt(bets, hasAppliedFreeBets);

        return { ...betReceipt, ...updatedBetReceipt };
    };

export const setBetReceiptTypeName =
    <T extends { name: string; type: string }>(combination: T) =>
    (betReceipt: BetReceipt): BetReceipt => {
        return {
            ...betReceipt,
            betName: get(combination, 'name', ''),
            betType: get(combination, 'type', BetType.Single),
        };
    };
