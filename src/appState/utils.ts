import type { Map as ImmutableMap } from 'immutable';
import get from 'lodash/get';

import type { Currency } from 'src/common/enums';
import { CurrencySymbol } from 'src/common/enums';
import type { CompetitionLocationTags } from 'src/common/types/competition';
import type { CurrencyType } from 'src/config/types';
import type { CompetitionLocationItem, TagsCategoryInfo } from 'src/modules/sports/types';
import { DASH, SPORTS_WITH_CATEGORY, SPORTS_WITH_TENNIS_TOUR, TAGS } from 'src/utils/constants';
import type { CompetitionLocation } from 'src/utils/types';

export const convertRecordToMap = <V1, V2>(data: Record<string, V1>, mapItem: (v1: V1) => V2): Map<string, V2> => {
    const out: Map<string, V2> = new Map();

    for (const [key, item] of Object.entries(data)) {
        out.set(key, mapItem(item));
    }

    return out;
};

export const convertRecordToMapDefault = <V1>(data: Record<string, V1>): Map<string, V1> =>
    convertRecordToMap(data, (item) => item);

export const convertMapToRecord = <V1, V2>(data: Map<string, V1>, mapItem: (v1: V1) => V2): Record<string, V2> => {
    const out: Record<string, V2> = {};

    for (const [key, item] of data) {
        out[key] = mapItem(item);
    }

    return out;
};

export const convertMapToRecordDefault = <V1>(data: Map<string, V1>): Record<string, V1> =>
    convertMapToRecord(data, (item) => item);

export const currencyToSymbol = (currency: CurrencyType): CurrencySymbol => {
    if (currency.toUpperCase() in CurrencySymbol) {
        return CurrencySymbol[currency.toUpperCase() as Currency];
    }

    return CurrencySymbol.USD;
};

export const isDecimalCheck = (stake: string): boolean => {
    const regex = /[.,]/;

    return regex.exec(stake) !== null;
};

export const returns = (bet: ImmutableMap<string, unknown>): number => {
    const price = bet.getIn(['price', 'f']).split('/');

    return (price[0] * 100) / price[1] + 100;
};

export function getCompetitionLocation(sportId: string | undefined | null, isLive = false): CompetitionLocation {
    switch (true) {
        case sportId != null && SPORTS_WITH_TENNIS_TOUR.includes(sportId):
            return {
                tag: TAGS.TennisTour,
                label: TAGS.TennisTourLabel,
                categorySelector: `tags.${TAGS.Category}.0`,
                categoryLabelSelector: `tags.${TAGS.CategoryLabel}.0`,
                tagSelector: `tags.${TAGS.TennisTour}.0`,
                labelSelector: `tags.${TAGS.TennisTourLabel}.0`,
                querySelector: `tags.${TAGS.TennisTour}`,
                queryLabelSelector: `tags.${TAGS.TennisTourLabel}`,
            };

        case sportId != null && SPORTS_WITH_CATEGORY.includes(sportId):
            return {
                tag: TAGS.Category,
                label: TAGS.CategoryLabel,
                categorySelector: `tags.${TAGS.Category}.0`,
                categoryLabelSelector: `tags.${TAGS.CategoryLabel}.0`,
                tagSelector: `tags.${TAGS.Category}.0`,
                labelSelector: `tags.${TAGS.CategoryLabel}.0`,
                querySelector: `tags.${TAGS.Category}`,
                queryLabelSelector: `tags.${TAGS.CategoryLabel}`,
            };

        case isLive:
            return {
                tag: TAGS.Category,
                label: TAGS.CategoryLabel,
                categorySelector: `tags.${TAGS.Category}.0`,
                categoryLabelSelector: `tags.${TAGS.CategoryLabel}.0`,
                tagSelector: `tags.${TAGS.Category}.0`,
                labelSelector: `tags.${TAGS.CategoryLabel}.0`,
                querySelector: `tags.${TAGS.Category}`,
                queryLabelSelector: `tags.${TAGS.CategoryLabel}`,
                originalSportSelector: `tags.${TAGS.OriginalSport}.0`,
            };

        default:
            return {
                tag: TAGS.Country,
                label: TAGS.CountryLabel,
                categorySelector: `tags.${TAGS.Category}.0`,
                categoryLabelSelector: `tags.${TAGS.CategoryLabel}.0`,
                tagSelector: `tags.${TAGS.Country}.0`,
                originalSportSelector: `tags.${TAGS.OriginalSport}.0`,
                labelSelector: `tags.${TAGS.CountryLabel}.0`,
                querySelector: `tags.${TAGS.Country}`,
                queryLabelSelector: `tags.${TAGS.CountryLabel}`,
            };
    }
}

export const isValidLabel = (label: string | null | undefined): label is string => {
    return label != null && label !== DASH;
};

const defaultToCategory = (category: string, categoryLabel: string | undefined) => {
    return isValidLabel(categoryLabel) ? categoryLabel : category;
};

export const getCompetitionLocationInfoFromTags = <T extends CompetitionLocationTags>(tags: T): TagsCategoryInfo => {
    const tennisTour = get(tags, `${TAGS.TennisTour}.0`, DASH);
    const tennisTourLabel = get(tags, `${TAGS.TennisTourLabel}.0`, DASH);

    if (isValidLabel(tennisTour) || isValidLabel(tennisTourLabel)) {
        return {
            tag: TAGS.TennisTour,
            category: tennisTour,
            categoryLabel: defaultToCategory(tennisTour, tennisTourLabel),
        };
    }

    const category = get(tags, `${TAGS.Category}.0`, DASH);
    const categoryLabel = get(tags, `${TAGS.CategoryLabel}.0`, DASH);

    if (isValidLabel(category) || isValidLabel(categoryLabel)) {
        return {
            tag: TAGS.Category,
            category,
            categoryLabel: defaultToCategory(category, categoryLabel),
        };
    }

    const country = get(tags, `${TAGS.Country}.0`, DASH);
    const countryLabel = get(tags, `${TAGS.CountryLabel}.0`, DASH);

    return {
        tag: TAGS.Country,
        category: country,
        categoryLabel: defaultToCategory(country, countryLabel),
    };
};

export function getCompetitionLocationLabel(
    getTranslation: (key: string, def: string) => string,
    labelKey?: string | null,
    label?: string | null,
    placeholder = true,
): string {
    if (isValidLabel(label)) {
        return label;
    }

    if (isValidLabel(labelKey)) {
        return getTranslation(`competition.location.${labelKey}`, labelKey);
    }

    if (placeholder) {
        return getTranslation('sport.label.tournament.other', 'Other');
    }

    return '';
}

export const remapCompetitionLocations = (competitions: CompetitionLocationItem[]) => {
    return competitions.map(({ country, label, tags, ...competition }) => {
        const tagsCategory = get(tags, 'category[0]');
        const tagsCategoryLabel = get(tags, 'category-label[0]');
        const tagsCountry = get(tags, 'country[0]');
        const tagsCountryLabel = get(tags, 'country-label[0]');

        const isCategoryTagValid = tagsCategory !== undefined && tagsCategory !== DASH;

        const categoryLabel = tagsCategoryLabel || tagsCategory;

        return {
            ...competition,
            country: isCategoryTagValid ? tagsCategory : country,
            label: isCategoryTagValid ? categoryLabel : label,
            tags: {
                ...tags,
                country: [isCategoryTagValid ? tagsCategory : tagsCountry],
                'country-label': [isCategoryTagValid ? categoryLabel : tagsCountryLabel],
            },
        };
    });
};

export const buildCacheUrl = (url: string): string => {
    if (process.env.DISABLE_CACHE_PROXY === 'true') {
        return url;
    }

    return `/cache-proxy${url}`;
};
