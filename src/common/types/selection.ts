import type { Metadata } from './event';
import type { Price, PriceHistory, PriceType } from './selectionPrice';

export interface Selections {
    [selectionId: string]: SelectionItem;
}

export interface SelectionItem {
    id: number;
    name: string;
    marketId: string;
    eventId: number;
    feedSettings: {
        updates: boolean;
        prices: boolean;
    };
    displayOrder: number;
    active: boolean;
    activated: boolean;
    display: boolean;
    priceType: PriceType;
    price: Price;
    priceHistory: PriceHistory[];
    metadata: Metadata;
    state: string;
    blockSettlement: boolean;
    line: string | null | undefined;
    tags: Record<string, [string]>;
    template: SelectionTemplate;
    participants: any;
    sp: boolean;
}

export interface SelectionTemplate {
    id: string;
    name: string;
    eventTemplateId: string;
    marketTemplateId: string;
    sportId: string;
}

export interface SelectionGroup<T = SelectionItem> {
    homeSelection: T | null;
    awaySelection: T | null;
    drawSelection: T | null;
    overSelection: T | null;
    isHandicap: boolean;
}
