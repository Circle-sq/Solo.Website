import { atom } from 'jotai';
import { atomFamily, atomWithDefault } from 'jotai/utils';

import { MarketTypeGeneric } from '@solo-asianView/constants';

import { SelectionIdentifier } from 'src/common/enums';
import {
    marketDisplaySelectorFamily,
    marketSelectionIdsSelectorFamily,
    marketTypeGenericSelectorFamily,
} from 'src/store/events/selectors/market';
import {
    selectionDisplaySelectorFamily,
    selectionIdentifierSelectorFamily,
} from 'src/store/events/selectors/selection';

export interface MainLineMarketIds {
    primaryGroup: number[];
    secondaryGroup: number[];
}

export const mainLineMarketIdsAtomFamily = atomFamily((_eventId: number) =>
    atomWithDefault<MainLineMarketIds>(() => ({ primaryGroup: [], secondaryGroup: [] })),
);

export const primaryMainLineMarketIdsAtomFamily = atomFamily((eventId: number) =>
    atom((get) => {
        const { primaryGroup } = get(mainLineMarketIdsAtomFamily(eventId));

        return primaryGroup;
    }),
);

export const secondaryMainLineMarketIdsAtomFamily = atomFamily((eventId: number) =>
    atom((get) => {
        const { secondaryGroup } = get(mainLineMarketIdsAtomFamily(eventId));

        return secondaryGroup;
    }),
);

export const hasDrawSelectionAtomFamily = atomFamily((eventId: number) =>
    atom((get) => {
        const primaryMainLineMarketIds = get(primaryMainLineMarketIdsAtomFamily(eventId));

        return primaryMainLineMarketIds.some((marketId) => {
            const marketTypeGeneric = get(marketTypeGenericSelectorFamily(marketId));

            if (marketTypeGeneric !== MarketTypeGeneric.ThreeWayWinner) {
                return false;
            }

            const selectionIds = get(marketSelectionIdsSelectorFamily(marketId));

            return selectionIds.some((selectionId) => {
                const identifier = get(selectionIdentifierSelectorFamily(selectionId));

                if (identifier !== SelectionIdentifier.Draw) {
                    return false;
                }

                const marketDisplay = get(marketDisplaySelectorFamily(marketId));
                const selectionDisplay = get(selectionDisplaySelectorFamily(selectionId));

                return marketDisplay && selectionDisplay;
            });
        });
    }),
);
