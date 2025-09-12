import get from 'lodash/get';
import has from 'lodash/has';
import keyBy from 'lodash/keyBy';
import pickBy from 'lodash/pickBy';
import reduce from 'lodash/reduce';
import size from 'lodash/size';

import { MarketType } from 'src/common/enums/market';

import { MAXIMUM_SELECTIONS_IN_BETSLIP_LIMIT } from '../../configs';
import type { BetslipSelection, BetslipSelections, SelectionPayload } from '../../types';

import { disableCombinationsIn } from './disableCombinationsIn';

export const normalizeSelection = ({
    eventId,
    eventRevision,
    marketId,
    marketRevision,
    selectionId,
    isBuildABetRelated = false,
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
        disableCombinationsIn: disableCombinationsIn(isBuildABetRelated),
        timestamp: Date.now(),
        eachWay: false,
        gtmSelection,
    };
};

export const getTimestamp = (selections: BetslipSelections, selectionId?: number | string): number =>
    selectionId !== undefined ? get(selections, [selectionId, 'timestamp'], 0) : 0;

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

export const getSelectionsFromEvent = (selections: BetslipSelections, eventId: number): BetslipSelections =>
    pickBy(selections, (selection) => selection.eventId === eventId);

export const hasReachedMaximumSelections = (selections: BetslipSelections) =>
    size(selections) >= MAXIMUM_SELECTIONS_IN_BETSLIP_LIMIT;
