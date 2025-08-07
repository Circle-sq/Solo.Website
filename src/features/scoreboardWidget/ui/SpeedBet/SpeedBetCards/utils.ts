import find from 'lodash/find';

import type { MarketItem } from 'src/common/types/market';
import type { SelectionItem } from 'src/common/types/selection';

export const CARDS_PADDING = 12;
export const CARD_WIDTH = 326;
export const CARD_HEIGHT = 160;
export const CARD_TRANSITION_TIME = 400;
export const MAX_CARDS_DISPLAYED = 3;

export const findSelectionByIdentifier = (selections: SelectionItem[], identifier: string): SelectionItem => {
    const selectionByIdentifier = find(
        selections,
        (selection) => selection?.tags['selection-identifier'][0] === identifier,
    );

    return selectionByIdentifier || ({} as SelectionItem);
};

const TWO_SIDES = 2;

export const getCardPadding = (index: number) => index * CARDS_PADDING;

export const getCardSummedUpPadding = (index: number) => index * TWO_SIDES * CARDS_PADDING;

export const isMarketVisible = (market: MarketItem) => market.active && market.display;

export const isLastCard = (index: number, totalCards: number) => index === totalCards - 1;
