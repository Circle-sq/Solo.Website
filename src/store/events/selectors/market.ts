import { selectorFamily } from '@sc-utils/jotai';
import includes from 'lodash/includes';
import size from 'lodash/size';

import { moveIndex } from 'src/common/updaters/array';

import { marketItemAtomFamily } from '../entities';
import type { MarketTemplate } from '../types';

import { eventMarketIdsSelectorFamily } from './event';
import { selectionDisplaySelectorFamily } from './selection';

export const marketNameSelectorFamily = selectorFamily<string, number>({
    key: 'marketNameSelectorFamily',
    get:
        (marketId) =>
        ({ get }) => {
            const market = get(marketItemAtomFamily(marketId));

            return market?.name ?? '';
        },
});

const MISSING_REVISION = -6;
export const marketRevisionSelectorFamily = selectorFamily<number, number>({
    key: 'marketRevisionSelectorFamily',
    get:
        (marketId) =>
        ({ get }) => {
            const market = get(marketItemAtomFamily(marketId));

            return market?.revision ?? MISSING_REVISION;
        },
});

export const marketActiveSelectorFamily = selectorFamily<boolean, number>({
    key: 'marketActiveSelectorFamily',
    get:
        (marketId) =>
        ({ get }) => {
            const market = get(marketItemAtomFamily(marketId));

            return market?.active === true;
        },
});

export const marketDisplaySelectorFamily = selectorFamily<boolean, number>({
    key: 'marketDisplaySelectorFamily',
    get:
        (marketId) =>
        ({ get }) => {
            const market = get(marketItemAtomFamily(marketId));

            return market?.display === true;
        },
});

export const marketSelectionIdsSelectorFamily = selectorFamily<number[], number>({
    key: 'marketSelectionIdsSelectorFamily',
    get:
        (marketId) =>
        ({ get }) => {
            const market = get(marketItemAtomFamily(marketId));

            if (includes(market?.template.name, '1x2')) {
                const lastIndex = size(market?.selections) - 1;

                return moveIndex(market?.selections, lastIndex, lastIndex - 1) ?? [];
            }

            return market?.selections ?? [];
        },
});

export const marketDisplayedSelectorFamily = selectorFamily<boolean, number>({
    key: 'marketDisplayedSelectorFamily',
    get:
        (marketId) =>
        ({ get }) => {
            const display = get(marketDisplaySelectorFamily(marketId));
            const selectionIds = get(marketSelectionIdsSelectorFamily(marketId));

            return display && selectionIds.some((selectionId) => get(selectionDisplaySelectorFamily(selectionId)));
        },
});

export const marketTemplateSelectorFamily = selectorFamily<MarketTemplate | undefined, number>({
    key: 'marketTemplateSelectorFamily',
    get:
        (marketId) =>
        ({ get }) => {
            const market = get(marketItemAtomFamily(marketId));

            return market?.template;
        },
});

export const marketTemplateIdSelectorFamily = selectorFamily<string | undefined, number>({
    key: 'marketTemplateIdSelectorFamily',
    get:
        (marketId) =>
        ({ get }) => {
            const template = get(marketTemplateSelectorFamily(marketId));

            return template?.id;
        },
});

export const marketTypeGenericSelectorFamily = selectorFamily<string | undefined, number>({
    key: 'marketTypeGenericSelectorFamily',
    get:
        (marketId) =>
        ({ get }) => {
            const template = get(marketTemplateSelectorFamily(marketId));

            return template?.marketTypeGeneric;
        },
});

export const visibleMarketIdsSelectorFamily = selectorFamily<number[], number>({
    key: 'visibleMarketIdsSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const eventMarketIds = get(eventMarketIdsSelectorFamily(eventId));
            const visibleMarketIds: number[] = [];

            eventMarketIds.forEach((id) => {
                const display = get(marketDisplaySelectorFamily(id));

                if (display) {
                    visibleMarketIds.push(id);
                }
            });

            return visibleMarketIds;
        },
});
