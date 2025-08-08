import { Currency, CurrencySymbol, SportType } from 'src/common/enums';
import { TAGS } from 'src/utils/constants';

import type { CurrencyType } from '../config/types';

import {
    buildCacheUrl,
    currencyToSymbol,
    getCompetitionLocation,
    getCompetitionLocationLabel,
    isDecimalCheck,
    isValidLabel,
    remapCompetitionLocations,
} from './utils';

const competitionsMock = [
    {
        total: 2,
        name: 'UEFA Champions League',
        displayOrder: 0,
        globalDisplayOrder: 0,
        platformObject: {
            id: '02_sr:tournament:7',
            name: 'UEFA Champions League',
            externalId: {
                instance: 'solo',
                provider: 'bet-radar',
                feedId: 'sr:tournament:7',
                sportId: 'bet-radar',
            },
        },
        label: 'World',
        sport: SportType.Football,
        country: 'WRL',
        tags: {
            'category-label': ['International Clubs'],
            outright: ['no'],
            'website-show': ['yes'],
            'ante-post': ['no'],
            highlight: ['no'],
            region: ['-'],
            country: ['WRL'],
            'country-label': ['World'],
            category: ['International Clubs'],
        },
        id: '67',
    },
    {
        total: 1,
        name: 'Superettan',
        displayOrder: 0,
        globalDisplayOrder: 0,
        platformObject: {
            id: '02_sr:tournament:46',
            name: 'Superettan',
            externalId: {
                instance: 'solo',
                provider: 'bet-radar',
                feedId: 'sr:tournament:46',
                sportId: 'bet-radar',
            },
        },
        label: 'Sweden',
        sport: SportType.Football,
        country: 'SWE',
        tags: {
            'category-label': ['-'],
            outright: ['no'],
            'website-show': ['yes'],
            'ante-post': ['no'],
            highlight: ['no'],
            region: ['-'],
            country: ['SWE'],
            'country-label': ['Sweden'],
            category: ['-'],
        },
        id: '74',
    },
];

const mappedCompetitions = [
    {
        total: 2,
        name: 'UEFA Champions League',
        displayOrder: 0,
        globalDisplayOrder: 0,
        platformObject: {
            id: '02_sr:tournament:7',
            name: 'UEFA Champions League',
            externalId: {
                instance: 'solo',
                provider: 'bet-radar',
                feedId: 'sr:tournament:7',
                sportId: 'bet-radar',
            },
        },
        label: 'International Clubs',
        sport: SportType.Football,
        country: 'International Clubs',
        tags: {
            'category-label': ['International Clubs'],
            outright: ['no'],
            'website-show': ['yes'],
            'ante-post': ['no'],
            highlight: ['no'],
            region: ['-'],
            country: ['International Clubs'],
            'country-label': ['International Clubs'],
            category: ['International Clubs'],
        },
        id: '67',
    },
    {
        total: 1,
        name: 'Superettan',
        displayOrder: 0,
        globalDisplayOrder: 0,
        platformObject: {
            id: '02_sr:tournament:46',
            name: 'Superettan',
            externalId: {
                instance: 'solo',
                provider: 'bet-radar',
                feedId: 'sr:tournament:46',
                sportId: 'bet-radar',
            },
        },
        label: 'Sweden',
        sport: SportType.Football,
        country: 'SWE',
        tags: {
            'category-label': ['-'],
            outright: ['no'],
            'website-show': ['yes'],
            'ante-post': ['no'],
            highlight: ['no'],
            region: ['-'],
            country: ['SWE'],
            'country-label': ['Sweden'],
            category: ['-'],
        },
        id: '74',
    },
];

describe('utils', () => {
    describe('currencyToSymbol', () => {
        it('should return € for EUR', () => {
            expect(currencyToSymbol(Currency.EUR)).toBe(CurrencySymbol.EUR);
        });

        it('should return £ for GBP', () => {
            expect(currencyToSymbol(Currency.GBP)).toBe(CurrencySymbol.GBP);
        });

        it('should return $ for USD', () => {
            expect(currencyToSymbol(Currency.USD)).toBe(CurrencySymbol.USD);
        });

        it('should return ₩ for KRW', () => {
            expect(currencyToSymbol(Currency.KRW)).toBe(CurrencySymbol.KRW);
        });

        it('should return ₩ for an unknown currency', () => {
            expect(currencyToSymbol('RUB' as CurrencyType)).toBe(CurrencySymbol.USD);
        });
    });

    describe('isDecimalCheck', () => {
        it('returns true if the string contains a decimal point', () => {
            expect(isDecimalCheck('10.5')).toBe(true);
        });

        it('returns true if the string contains a comma', () => {
            expect(isDecimalCheck('10,5')).toBe(true);
        });

        it('returns false if the string does not contain a decimal point or comma', () => {
            expect(isDecimalCheck('105')).toBe(false);
        });

        it('returns true if the string contains both a decimal point and comma', () => {
            expect(isDecimalCheck('10.000,5')).toBe(true);
        });
    });

    describe('getCompetitionLocation', () => {
        it('returns correct competition for sport with tennis tour', () => {
            const result = getCompetitionLocation(SportType.Tennis);

            expect(result.tag).toEqual(TAGS.TennisTour);
            expect(result.label).toEqual(TAGS.TennisTourLabel);
            expect(result.tagSelector).toBe(`tags.${TAGS.TennisTour}.0`);
            expect(result.labelSelector).toBe(`tags.${TAGS.TennisTourLabel}.0`);
            expect(result.querySelector).toBe(`tags.${TAGS.TennisTour}`);
            expect(result.queryLabelSelector).toBe(`tags.${TAGS.TennisTourLabel}`);
        });

        it('returns correct competition for sport with CsGo tour', () => {
            const result = getCompetitionLocation(SportType.CsGo);

            expect(result.tag).toEqual(TAGS.Category);
            expect(result.label).toEqual(TAGS.CategoryLabel);
            expect(result.tagSelector).toBe(`tags.${TAGS.Category}.0`);
            expect(result.labelSelector).toBe(`tags.${TAGS.CategoryLabel}.0`);
            expect(result.querySelector).toBe(`tags.${TAGS.Category}`);
            expect(result.queryLabelSelector).toBe(`tags.${TAGS.CategoryLabel}`);
        });

        it('returns correct competition for other sports', () => {
            const result = getCompetitionLocation(SportType.Football);

            expect(result.tag).toEqual(TAGS.Country);
            expect(result.label).toEqual(TAGS.CountryLabel);
            expect(result.tagSelector).toBe(`tags.${TAGS.Country}.0`);
            expect(result.labelSelector).toBe(`tags.${TAGS.CountryLabel}.0`);
            expect(result.querySelector).toBe(`tags.${TAGS.Country}`);
            expect(result.queryLabelSelector).toBe(`tags.${TAGS.CountryLabel}`);
        });

        it('returns correct competition for null sportId', () => {
            const result = getCompetitionLocation(null);

            expect(result.tag).toEqual(TAGS.Country);
            expect(result.label).toEqual(TAGS.CountryLabel);
            expect(result.tagSelector).toBe(`tags.${TAGS.Country}.0`);
            expect(result.labelSelector).toBe(`tags.${TAGS.CountryLabel}.0`);
            expect(result.querySelector).toBe(`tags.${TAGS.Country}`);
            expect(result.queryLabelSelector).toBe(`tags.${TAGS.CountryLabel}`);
        });

        it('returns correct competition for undefined sportId', () => {
            const result = getCompetitionLocation(undefined);

            expect(result.tag).toEqual(TAGS.Country);
            expect(result.label).toEqual(TAGS.CountryLabel);
            expect(result.tagSelector).toBe(`tags.${TAGS.Country}.0`);
            expect(result.labelSelector).toBe(`tags.${TAGS.CountryLabel}.0`);
            expect(result.querySelector).toBe(`tags.${TAGS.Country}`);
            expect(result.queryLabelSelector).toBe(`tags.${TAGS.CountryLabel}`);
        });
    });

    describe('type guard isValidLabel', () => {
        it('returns true for a non-null string', () => {
            expect(isValidLabel('bet')).toBe(true);
        });

        it('returns false for null', () => {
            expect(isValidLabel(null)).toBe(false);
        });

        it('returns false for "-"', () => {
            expect(isValidLabel('-')).toBe(false);
        });
    });

    describe('getCompetitionLocationLabel', () => {
        const mockGetTranslation = vi.fn();

        beforeEach(() => {
            mockGetTranslation.mockReset();
        });

        it('returns label if it is a valid string', () => {
            expect(getCompetitionLocationLabel(mockGetTranslation, null, 'bet')).toBe('bet');
            expect(mockGetTranslation).not.toHaveBeenCalled();
        });

        it('uses label key to get translation if label is not valid and labelKey is valid', () => {
            mockGetTranslation.mockReturnValue('Translated Label');
            expect(getCompetitionLocationLabel(mockGetTranslation, 'bet', null)).toBe('Translated Label');
            expect(mockGetTranslation).toHaveBeenCalledWith('competition.location.bet', 'bet');
        });

        it('returns default "Other" translation if neither label nor labelKey are valid and placeholder is true', () => {
            mockGetTranslation.mockReturnValue('Other');
            expect(getCompetitionLocationLabel(mockGetTranslation, null, null)).toBe('Other');
            expect(mockGetTranslation).toHaveBeenCalledWith('sport.label.tournament.other', 'Other');
        });

        it('returns empty string if neither label nor labelKey are valid and placeholder is false', () => {
            expect(getCompetitionLocationLabel(mockGetTranslation, null, null, false)).toBe('');
            expect(mockGetTranslation).not.toHaveBeenCalled();
        });
    });

    describe('remapCompetitionLocations fn', () => {
        it('should change the country and country label values to category if category is not empty', () => {
            expect(remapCompetitionLocations(competitionsMock)).toMatchObject(mappedCompetitions);
        });
    });

    it('should prefix url with cache if not disabled', () => {
        delete global.process.env.DISABLE_CACHE_PROXY;
        expect(buildCacheUrl('/bar')).toBe('/cache-proxy/bar');
        global.process.env.DISABLE_CACHE_PROXY = 'true';
        expect(buildCacheUrl('/bar')).toBe('/bar');
    });
});
