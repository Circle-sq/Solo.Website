import compact from 'lodash/compact';
import flatMap from 'lodash/flatMap';
import get from 'lodash/get';
import has from 'lodash/has';
import map from 'lodash/map';
import omit from 'lodash/omit';
import reduce from 'lodash/reduce';

import { BetslipTab, BetType, LegType } from 'src/common/enums';

import type { Leg, Legs, MarketAndSelection } from '../api/types/leg';
import type {
    ReferredBet,
    ReferredLeg,
    ReferredMarketAndSelection,
    ReferredMultiBetLeg,
    ReferredStandardLeg,
} from '../api/types/referredBet';
import { normalizeSelection } from '../store/helpers/selection/common';
import type { BetslipSelection, BetslipSelections } from '../store/types';
import { isMultiBetLegType, isStandardBetLegType } from '../typeGuards/leg';

import { generateBetId } from './bet';
import { isMultipleBetType } from './combinations';

export const getOfferLegSelection = (selectionItem: ReferredMarketAndSelection, leg: Leg, betslipLeg: Leg): Leg => {
    return {
        stakePerLine: 0,
        ...(betslipLeg
            ? {
                  ...betslipLeg,
                  selectionId: String(betslipLeg.selectionId),
                  marketId: Number(betslipLeg.marketId),
                  eventId: Number(betslipLeg.eventId),
                  priceType: betslipLeg.priceType,
              }
            : ({
                  selectionId: String(selectionItem.selection.id),
                  marketId: Number(selectionItem.market.id),
                  eventId: Number(leg.event?.id),
                  price: leg.price,
                  priceType: leg.priceType,
              } as Leg)),
    };
};

// TODO Improve types
export const parseLeg = (leg: ReferredLeg): Leg => {
    if (isMultiBetLegType<ReferredMultiBetLeg>(leg)) {
        const { marketsAndSelections, ...restLeg } = leg;

        return {
            ...omit(restLeg, ['market', 'selection', 'termsWithBet']),
            event: { id: Number(leg.event.id) },
            competition: { id: leg.competition.id, name: leg.competition.name },
            sport: { id: leg.sport.id, name: leg.sport.name },
            legs: [
                {
                    event: { id: Number(leg.event.id) },
                    marketsAndSelections: map(
                        marketsAndSelections,
                        (item) =>
                            ({
                                ...item,
                                price: leg.price,
                                market: { id: Number(item.market.id) },
                                selection: { id: Number(item.selection.id) },
                                legFeedProperties: item.feedProperties,
                            }) as unknown as MarketAndSelection,
                    ),
                    price: leg.price,
                    priceType: leg.priceType,
                    type: leg.type,
                },
            ],
        } as unknown as Leg;
    }

    return {
        ...omit(leg, ['marketsAndSelections', 'termsWithBet']),
        selectionId: String(leg.selection.id),
        marketId: Number(leg.market.id),
        eventId: Number(leg.event.id),
    } as unknown as Leg;
};

export const parseOfferBets = (referredBets: ReferredBet[], bets: Legs): Legs => {
    return reduce(
        referredBets,
        (acc: Legs, { eachWay, legs = [], potentialReturns, stakePerLine, type }) => {
            if (type === BetType.Single && legs.length === 1) {
                const [leg] = legs;
                let betId = generateBetId(leg);
                const parsedLeg = parseLeg(leg);

                if (has(acc, betId)) {
                    betId = `${betId}0`;
                }

                const maxStake = bets[betId]?.maxStake;

                if (isMultiBetLegType<ReferredMultiBetLeg>(leg)) {
                    const offerLegSelections = reduce(
                        leg.marketsAndSelections,
                        (acc: Legs, item) => {
                            const bet = get(bets, item.selection.id);

                            return {
                                ...acc,
                                [item.selection.id]: getOfferLegSelection(item, parsedLeg, bet),
                            };
                        },
                        {},
                    );

                    return {
                        ...acc,
                        [betId]: {
                            ...parsedLeg,
                            maxStake,
                            id: betId,
                            eachWay,
                            stakePerLine,
                            potentialReturns,
                            type,
                        },
                        ...offerLegSelections,
                    };
                }

                return {
                    ...acc,
                    [betId]: {
                        ...parsedLeg,
                        maxStake,
                        eachWay,
                        stakePerLine,
                        potentialReturns,
                    },
                };
            }

            const reducedLegs = reduce(
                legs,
                (acc: Legs, leg) => {
                    const betId = generateBetId(leg);
                    const parsedLeg = parseLeg(leg);
                    const type = get(bets, `${betId}.legs.0.type`, LegType.Standard) as LegType;

                    if (isMultiBetLegType<ReferredMultiBetLeg>(leg)) {
                        const offerLegSelections = reduce(
                            leg.marketsAndSelections,
                            (acc: Legs, item) => {
                                const bet = get(bets, item.selection.id);

                                return {
                                    ...acc,
                                    [item.selection.id]: getOfferLegSelection(item, parsedLeg, bet),
                                };
                            },
                            {},
                        );

                        return {
                            ...acc,
                            ...offerLegSelections,
                            [betId]: {
                                ...parsedLeg,
                                id: betId,
                                eachWay: false,
                                stakePerLine: 0,
                                type,
                            },
                        };
                    }

                    return {
                        ...acc,
                        [betId]: {
                            ...parsedLeg,
                            eachWay: false,
                            stakePerLine: 0,
                            type,
                        },
                    };
                },
                {},
            );

            return { ...acc, ...reducedLegs };
        },
        {},
    );
};
const S_MISSING_REVISION = -17;
const MISSING_REVISION = -16;

export const convertRefBetsToSelections = (bets: ReferredBet[]): BetslipSelections => {
    const refLegs = compact(flatMap(bets, ({ legs }) => legs));
    const refSelections = reduce(
        refLegs,
        (selections: Record<string, BetslipSelection>, leg, index) => {
            if (isStandardBetLegType<ReferredStandardLeg>(leg)) {
                const selectionId = leg.selection.id;
                const payload = {
                    eventId: Number(leg.event.id),
                    marketId: Number(leg.market.id),
                    marketType: null,
                    eventRevision: S_MISSING_REVISION,
                    marketRevision: S_MISSING_REVISION,
                    selectionId: Number(leg.selection.id),
                    priceType: leg.priceType,
                    price: leg.price,
                };
                const selection = { ...normalizeSelection(payload), timestamp: Date.now() + index };

                return { ...selections, [selectionId]: selection };
            }

            if (isMultiBetLegType<ReferredMultiBetLeg>(leg)) {
                const isBuildABetRelated = leg.type === LegType.BuildABet;
                const multiBetSelections = reduce(
                    leg.marketsAndSelections,
                    (acc, item) => {
                        const selectionId = item.selection.id;
                        const payload = {
                            eventId: Number(leg.event.id),
                            eventRevision: MISSING_REVISION,
                            marketRevision: MISSING_REVISION,
                            marketId: Number(item.market.id),
                            marketType: null,
                            selectionId: Number(item.selection.id),
                            price: leg.price,
                            priceType: leg.priceType,
                            isBuildABetRelated,
                        };
                        const selection = { ...normalizeSelection(payload), timestamp: Date.now() + index };

                        return { ...acc, [selectionId]: selection };
                    },
                    {},
                );

                return { ...selections, ...multiBetSelections };
            }

            return selections;
        },
        {},
    );

    return refSelections;
};

export const defineOfferActiveTab = (combinationType: string) => {
    if (combinationType === BetType.Single) {
        return BetslipTab.Single;
    }

    if (isMultipleBetType(combinationType)) {
        return BetslipTab.Multi;
    }

    return BetslipTab.System;
};

export const getSingleBetStakes = (bets: ReferredBet[]): Record<string, number> =>
    reduce(
        bets,
        (acc, bet) => {
            if (isStandardBetLegType<ReferredStandardLeg>(bet?.legs?.[0])) {
                const id = String(bet.legs?.[0].selection.id);
                const value = bet.stakePerLine;

                return { ...acc, [id]: value };
            }

            if (isMultiBetLegType<ReferredMultiBetLeg>(bet?.legs?.[0])) {
                const id = generateBetId(bet.legs?.[0] as ReferredLeg);
                const value = bet.stakePerLine;

                return { ...acc, [id]: value };
            }

            return acc;
        },
        {},
    );
