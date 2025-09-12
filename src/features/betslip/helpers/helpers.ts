import get from 'lodash/get';
import has from 'lodash/has';
import isUndefined from 'lodash/isUndefined';
import size from 'lodash/size';
import startsWith from 'lodash/startsWith';

import { BreakPoints } from '@solo-ui/system';

import { BetType, LegType } from 'src/common/enums';
import { isMobile } from 'src/common/helpers/device';
import type { SelectionItem } from 'src/common/types/selection';

import type { Leg, Legs } from '../api/types/leg';
import type { PossibleBet } from '../api/types/possibleBet';
import { Channel } from '../enums';
import type { BetslipSelections } from '../store/types';

export const getChannel = (): Channel => {
    return isMobile(BreakPoints.desktop) ? Channel.Mobile : Channel.Desktop;
};

export const getEventIdPath = (isMultiBet = false): string => {
    return isMultiBet ? 'legs.0.event.id' : 'eventId';
};

const MISSING_REVISION = -7;

export const convertBetsToLegs = (bets: PossibleBet[], selections: BetslipSelections): Legs => {
    const legs: Legs = {};

    for (const bet of bets) {
        if (startsWith(bet.id, 'all')) {
            continue;
        }

        const betLeg = get(bet, 'legs.0');
        const isBuildABet = betLeg.type === LegType.BuildABet;
        const selectionId = `${isBuildABet ? bet.id : betLeg.selection?.id}`;

        if (isBuildABet) {
            legs[selectionId] = {
                ...(bet as unknown as Leg),
                eventId: get(bet, 'legs.0.event.id'),
            };
        } else if (!isUndefined(selections[selectionId])) {
            const {
                eventId,
                marketId,
                priceType,
                disableCombinationsIn,
                eventRevision = MISSING_REVISION,
                marketRevision = MISSING_REVISION,
            } = selections[selectionId];
            const price = bet.type === BetType.Single && size(bet.legs) === 1 ? betLeg.price : bet.price;

            legs[selectionId] = {
                selectionId,
                ...(eventId !== undefined && marketId !== undefined ? { eventId, marketId } : null),
                eventRevision,
                marketRevision,
                stakePerLine: bet.stakePerLine,
                betReferralEnabled: bet.betReferralEnabled,
                eachWay: bet.eachWay,
                potentialReturns: bet.potentialReturns,
                potentialReturnsAt: bet.stakePerLine,
                freebetCredits: bet.freebetCredits,
                freebetRemarks: bet.freebetRemarks,
                maxStake: bet.maxStake,
                price,
                competition: bet.competition,
                sport: bet.sport,
                priceType,
                disableCombinationsIn,
            } as unknown as Leg;
        }
    }

    return legs;
};

export const isSelectionPriceUpdated = (betslipSelections: BetslipSelections, selection: SelectionItem): boolean => {
    if (!has(betslipSelections, selection.id)) {
        return false;
    }

    const newPrice = get(selection, ['price', 'd'], 0);
    const oldPrice = get(betslipSelections, [selection.id, 'price', 'd'], 0);

    return newPrice < oldPrice || newPrice > oldPrice;
};
