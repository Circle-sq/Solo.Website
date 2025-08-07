import type { CompetitionLocationItem } from 'src/modules/sports/types';

import type { EVENT_FILTERS, EVENT_MEDIA_TYPE, MARKET_TEMPLATE, SPORT_BOOK_MESSAGES } from './constants';

export type GetTranslationFunc = (key: string, defaultText: string) => string;
export type EventFilterType = (typeof EVENT_FILTERS)[keyof typeof EVENT_FILTERS];

export type MarketTemplateType = (typeof MARKET_TEMPLATE)[keyof typeof MARKET_TEMPLATE];
export type SportBookMessages = (typeof SPORT_BOOK_MESSAGES)[keyof typeof SPORT_BOOK_MESSAGES];

export type EventMediaType = (typeof EVENT_MEDIA_TYPE)[keyof typeof EVENT_MEDIA_TYPE];

export interface CompetitionLocation {
    tag: string;
    label: string;
    categorySelector: string;
    categoryLabelSelector: string;
    tagSelector: string;
    labelSelector: string;
    querySelector: string;
    queryLabelSelector: string;
    originalSportSelector?: string;
}

export interface CompetitionLocations {
    [tagKey: string]: CompetitionLocationItem[];
}
