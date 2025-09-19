import flatMap from 'lodash/flatMap';
import has from 'lodash/has';
import map from 'lodash/map';
import pick from 'lodash/pick';
import reject from 'lodash/reject';

import type { UserData } from '@solo-account/types';

import { Currency } from 'src/common/enums';

import type { CastBet, CastBetLeg, CastMultiBetLeg, CastStandardBetLeg } from '../api/types/castBet';
import type { Combination, CombinationStandardLeg } from '../api/types/combination';
import type { BaseFreeBetCredit, FreeBetAssignments } from '../api/types/freeBet';
import type { BetLeg, MultiBetLeg, StandardBetLeg } from '../api/types/leg';
import type { SelectedBet } from '../api/types/possibleBet';
import { getStakePerLine } from '../store/helpers/stake/common';
import { isMultiBetType } from '../typeGuards/bet';
import { isMultiBetLegType } from '../typeGuards/leg';

import { pickFreeBetCredit } from './freeBet';
import { getMultiBetSelectionIds, isSelectionIncludedInMultiBet } from './multiBet';

const getCastMultiBetLeg = (leg: MultiBetLeg): CastMultiBetLeg =>
    pick(leg, ['type', 'price', 'priceType', 'event', 'marketsAndSelections']);

const getCastStandardBetLeg = (leg: StandardBetLeg): CastStandardBetLeg =>
    pick(leg, ['type', 'price', 'priceType', 'event', 'market', 'selection', 'disableCombinationsIn']);

const getCastBetLeg = (leg: BetLeg): CastBetLeg =>
    isMultiBetLegType<MultiBetLeg>(leg) ? getCastMultiBetLeg(leg) : getCastStandardBetLeg(leg);

const getFreebetCredits = (
    betId: string,
    appliedFreeBets: FreeBetAssignments,
): { freebetCredits?: [BaseFreeBetCredit] } => {
    if (has(appliedFreeBets, betId)) {
        const freeBetCredit = pickFreeBetCredit(appliedFreeBets[betId]);

        if (freeBetCredit !== null) {
            const { id, amount, promotionId } = freeBetCredit;

            return { freebetCredits: [{ id, amount, promotionId }] };
        }
    }

    return {};
};

export const formatCastMultipleBet = (
    { eachWay = false, legs, type }: Combination,
    appliedFreeBets: FreeBetAssignments,
    { country, wallet }: UserData,
    stakePerLine: number,
): CastBet | undefined => {
    if (wallet.currency == null) {
        return;
    }

    const betId = `all${type}`;

    return {
        id: betId,
        country: { value: country ?? '' },
        currency: { value: wallet.currency ?? Currency.GBP },
        eachWay,
        legs: map(legs, getCastBetLeg),
        stakePerLine,
        type,
        ...getFreebetCredits(betId, appliedFreeBets),
    };
};

export const formatCastSingleBets = (
    selectedBets: SelectedBet[],
    appliedFreeBets: FreeBetAssignments,
    { country, wallet }: UserData,
    singleBetStakes: Record<string, number>,
): CastBet[] | undefined => {
    if (wallet.currency == null) {
        return;
    }

    return map(selectedBets, ({ id, eachWay = false, legs, type }) => {
        const [leg] = legs;
        const castBetLeg = getCastBetLeg(leg);

        return {
            id,
            country: { value: country },
            currency: { value: wallet.currency },
            eachWay,
            legs: [castBetLeg],
            stakePerLine: getStakePerLine(singleBetStakes, id),
            type,
            ...getFreebetCredits(id, appliedFreeBets),
        };
    });
};

export const formatCastSystemBet = (
    { eachWay = false, legs, type }: Combination<CombinationStandardLeg>,
    { country, wallet }: UserData,
    stakePerLine: number,
): CastBet<CastStandardBetLeg> | undefined => {
    if (wallet.currency == null) {
        return;
    }

    return {
        country: { value: country },
        currency: { value: wallet.currency },
        eachWay,
        legs: map(legs, getCastStandardBetLeg),
        stakePerLine,
        type,
    };
};

export const rejectSinglesIncludedInMultiBets = (bets: SelectedBet[]): SelectedBet[] => {
    const multiBetSelectionIds = flatMap(bets, (bet) => getMultiBetSelectionIds(bet.id));

    return reject(bets, (bet) => {
        if (isMultiBetType<MultiBetLeg>(bet)) {
            return false;
        }

        return isSelectionIncludedInMultiBet(multiBetSelectionIds, bet.id);
    });
};
