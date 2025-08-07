import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import has from 'lodash/has';
import includes from 'lodash/includes';
import keyBy from 'lodash/keyBy';
import omitBy from 'lodash/omitBy';
import pickBy from 'lodash/pickBy';
import reduce from 'lodash/reduce';
import size from 'lodash/size';
import some from 'lodash/some';

import { MarketType } from 'src/common/enums/market';

import {
    crossPageMarketTypes,
    MAXIMUM_SELECTIONS_IN_BETSLIP_LIMIT,
    MIN_MULTI_BET_SELECTIONS_COUNT,
    nonCrossBetCombinableMarketTypes,
} from '../../configs';
import type { BetslipSelection, BetslipSelections, SelectionPayload } from '../../types';

import { disableCombinationsIn } from './disableCombinationsIn';
import { isBuildABetPageRelated, isCrossPageRelated } from './relation';

export const normalizeSelection = ({
    eventId,
    eventRevision,
    marketId,
    marketRevision,
    selectionId,
    isBuildABetRelated = false,
    isCrossPageRelated = false,
    gtmSelection,
    ...rest
}: SelectionPayload): BetslipSelection => {
    return {
        ...rest,
        eventId: Number(eventId),
        eventRevision,
        marketRevision,
        marketId: Number(marketId),
        selectionId: String(selectionId),
        disableCombinationsIn: disableCombinationsIn(isBuildABetRelated, isCrossPageRelated),
        timestamp: Date.now(),
        eachWay: false,
        gtmSelection,
    };
};

export const getTimestamp = (selections: BetslipSelections, selectionId?: number | string): number =>
    selectionId !== undefined ? get(selections, [selectionId, 'timestamp'], 0) : 0;

export const hasSelectionFromSameMarketType = (selections: BetslipSelections, marketType: MarketType | null) =>
    some(selections, { marketType });

export const isNonCrossBetCombinableMarketType = (
    selections: BetslipSelections,
    marketType: MarketType | null,
): boolean => {
    return (
        includes(nonCrossBetCombinableMarketTypes, marketType) &&
        some(selections, (selection) => includes(nonCrossBetCombinableMarketTypes, selection.marketType))
    );
};

export const isCrossFormativeMarketType = <
    T extends {
        marketType: MarketType | null;
    },
>(
    selection: T,
): selection is T & { marketType: MarketType } => includes(crossPageMarketTypes, selection.marketType);

export const isTotalMarketType = <
    T extends {
        marketType: MarketType | null;
    },
>(
    selection: T,
): selection is T & { marketType: MarketType.Total } => selection.marketType === MarketType.Total;

export const getLastSelectionFromMarketTypes = (selections: BetslipSelection[]): Record<string, BetslipSelection> => {
    return reduce(
        selections,
        (acc: Record<string, BetslipSelection>, selection: BetslipSelection) => {
            const marketType = String(selection.marketType);

            if (!has(acc, marketType) || selection.timestamp > acc[marketType].timestamp) {
                return { ...acc, [marketType]: selection };
            }

            return acc;
        },
        {},
    );
};

export const getSelectionsWithMandatoryTotalMarketType = (selections: BetslipSelections): BetslipSelections => {
    return keyBy(
        reduce(
            selections,
            (acc: Record<string, BetslipSelection>, selection) => {
                if (isTotalMarketType(selection)) {
                    return { ...acc, [MarketType.Total]: selection };
                }

                const selectionKey = 'winnerOrHandicap';

                if (!has(acc, selectionKey) || selection.timestamp > acc[selectionKey].timestamp) {
                    return { ...acc, [selectionKey]: selection };
                }

                return acc;
            },
            {},
        ),
        'selectionId',
    );
};

export const getLastSelectionsFromMarkets = (selections: BetslipSelections): BetslipSelections => {
    const crossFormativeSelections = pickBy(selections, isCrossFormativeMarketType);
    const restSelections = omitBy(selections, isCrossFormativeMarketType);

    const parsedCrossSelections = reduce(
        groupBy(crossFormativeSelections, 'eventId'),
        (acc: BetslipSelections, selectionsFromEvent) => {
            const lastSelectionFromMarketTypes = getLastSelectionFromMarketTypes(selectionsFromEvent);

            if (size(lastSelectionFromMarketTypes) <= MIN_MULTI_BET_SELECTIONS_COUNT) {
                return { ...acc, ...keyBy(lastSelectionFromMarketTypes, 'selectionId') };
            }

            if (some(lastSelectionFromMarketTypes, isTotalMarketType)) {
                return { ...acc, ...getSelectionsWithMandatoryTotalMarketType(lastSelectionFromMarketTypes) };
            }

            return acc;
        },
        {},
    );

    return { ...parsedCrossSelections, ...restSelections };
};

export const getCrossSelectionsFromEvent = (selections: BetslipSelections, eventId: number): BetslipSelections =>
    pickBy(selections, (selection) => selection.eventId === eventId && isCrossPageRelated(selection));

export const getSelectionsFromEventWithoutBuildABet = (
    selections: BetslipSelections,
    eventId: number,
): BetslipSelections =>
    pickBy(selections, (selection) => selection.eventId === eventId && !isBuildABetPageRelated(selection));

export const getSelectionsFromEventWithoutCrossBet = (
    selections: BetslipSelections,
    eventId: number,
): BetslipSelections =>
    pickBy(selections, (selection) => selection.eventId === eventId && !isCrossPageRelated(selection));

export const hasReachedMaximumSelections = (selections: BetslipSelections) =>
    size(selections) >= MAXIMUM_SELECTIONS_IN_BETSLIP_LIMIT;
