import { asianInPlayHandicapLineFlagAtom } from '@solo-feature-flags';
import getIn from 'lodash/get';

import { selectorFamily } from '@solo-utils/jotai';

import { type SelectionIdentifier, SportType } from 'src/common/enums';
import type { Price } from 'src/common/types/selectionPrice';

import { selectionItemAtomFamily } from '../entities';
import type { SelectionItem } from '../types';

import { eventInPlaySelectorFamily } from './event';

export const selectionParentsSelectorFamily = selectorFamily<SelectionItem['parents'], number>({
    key: 'selectionParentsSelectorFamily',
    get:
        (selectionId) =>
        ({ get }) => {
            const selection = get(selectionItemAtomFamily(selectionId));

            return selection?.parents ?? { eventId: 0, marketId: 0 };
        },
});

export const selectionActiveSelectorFamily = selectorFamily<boolean, number>({
    key: 'selectionActiveSelectorFamily',
    get:
        (selectionId) =>
        ({ get }) => {
            const selection = get(selectionItemAtomFamily(selectionId));

            return selection?.active === true;
        },
});

export const selectionDisplaySelectorFamily = selectorFamily<boolean, number>({
    key: 'selectionDisplaySelectorFamily',
    get:
        (selectionId) =>
        ({ get }) => {
            const selection = get(selectionItemAtomFamily(selectionId));

            return selection?.display === true;
        },
});

export const selectionPriceSelectorFamily = selectorFamily<Price | null, number>({
    key: 'selectionPriceSelectorFamily',
    get:
        (selectionId) =>
        ({ get }) => {
            const selection = get(selectionItemAtomFamily(selectionId));

            return selection?.price ?? null;
        },
});

export const selectionIdentifierSelectorFamily = selectorFamily<SelectionIdentifier | undefined, number>({
    key: 'selectionIdentifierSelectorFamily',
    get:
        (selectionId) =>
        ({ get }) => {
            const selection = get(selectionItemAtomFamily(selectionId));

            return getIn(selection, 'tags.selection-identifier.0') as SelectionIdentifier;
        },
});

export const selectionNameSelectorFamily = selectorFamily<string | undefined, number>({
    key: 'selectionNameSelectorFamily',
    get:
        (selectionId) =>
        ({ get }) => {
            const selection = get(selectionItemAtomFamily(selectionId));

            return selection?.name;
        },
});

export const selectionTemplateSportIdSelectorFamily = selectorFamily<string | undefined, number>({
    key: 'selectionTemplateSportIdSelectorFamily',
    get:
        (selectionId) =>
        ({ get }) => {
            const selection = get(selectionItemAtomFamily(selectionId));

            return selection?.template.sportId;
        },
});

export const selectionLineSelectorFamily = selectorFamily<string | null, number>({
    key: 'selectionLineSelectorFamily',
    get:
        (selectionId) =>
        ({ get }) => {
            const selection = get(selectionItemAtomFamily(selectionId));

            return selection?.line ?? null;
        },
});

export const selectionAsianLineSelectorFamily = selectorFamily<string | null, number>({
    key: 'selectionAsianLineSelectorFamily',
    get:
        (selectionId) =>
        ({ get }) => {
            const selection = get(selectionItemAtomFamily(selectionId));

            return selection?.asianInPlayLine ?? null;
        },
});

export const selectionHandicapLineSelectorFamily = selectorFamily<string | null, number>({
    key: 'selectionHandicapLineSelectorFamily',
    get:
        (selectionId) =>
        ({ get }) => {
            const asianInPlayHandicapLineFlag = get(asianInPlayHandicapLineFlagAtom);
            const sportId = get(selectionTemplateSportIdSelectorFamily(selectionId));
            const { eventId } = get(selectionParentsSelectorFamily(selectionId));
            const eventInPlay = get(eventInPlaySelectorFamily(eventId));
            const line = get(selectionLineSelectorFamily(selectionId));
            const asianInPlayLine = get(selectionAsianLineSelectorFamily(selectionId));

            return asianInPlayHandicapLineFlag &&
                eventInPlay &&
                (sportId === SportType.Football || sportId === SportType.ESoccer)
                ? asianInPlayLine
                : line;
        },
});
