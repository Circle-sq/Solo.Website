import { endOfDay } from 'date-fns';

import { SportType } from 'src/common/enums';
import type { TimeRange } from 'src/common/types/main';
import { SIMULATED_REALITY_LEAGUES } from 'src/config/config';
import { COMPETITION_ICON, LHN_SPORTS_ORDER, MARKET_TEMPLATE, SPORT_TYPE } from 'src/utils/constants';
import { BettingEventTime } from 'src/utils/enums';

export const getTimeRange = (time?: BettingEventTime): TimeRange | null => {
    switch (time) {
        case BettingEventTime.CurrentDay:
            return {
                from: new Date().toISOString(),
                to: endOfDay(new Date()).toISOString(),
            };

        default:
            return null;
    }
};

export interface SportCountry {
    count: number;
    key: string;
    label: string;
    locationIcon?: string;
}

export interface Country {
    id: string;
    count: number;
    sportId: string;
}

export interface Sport {
    count: number;
    countries: SportCountry[];
    id: string;
}

export interface EventsResponse {
    competitions: [];
    country: Country[];
    sports: Sport[];
    total: number;
}

export const mergeEventsCounterResponse = (countries: EventsResponse, categories: EventsResponse): EventsResponse => {
    const mergedSports = countries.sports.map((sport) => {
        const matchingSport = categories.sports.find((s) => s.id === sport.id);

        const sportCountries = sport.countries ? [...sport.countries] : [];

        if (matchingSport) {
            const mergedCountriesSet = new Set<SportCountry>(
                [...sportCountries, ...matchingSport.countries].filter((x) => x),
            );
            let uniqueCountries = Array.from(mergedCountriesSet).filter(
                (country) => country.key !== MARKET_TEMPLATE.default,
            );
            const simulatedRealityLeagueCounter = uniqueCountries
                .filter((country) => SIMULATED_REALITY_LEAGUES.includes(country.key))
                .reduce((sum, country) => sum + country.count, 0);
            const isCountEqual =
                uniqueCountries.filter((country) => country.key === LHN_SPORTS_ORDER.WRL)[0]?.count ===
                simulatedRealityLeagueCounter;

            if (isCountEqual) {
                uniqueCountries = uniqueCountries.filter((country) => country.key !== LHN_SPORTS_ORDER.WRL);
            }

            return { ...sport, countries: uniqueCountries };
        } else {
            return sport;
        }
    });
    const mergedCountry = countries.country.concat(categories.country);

    return {
        sports: mergedSports,
        country: mergedCountry,
        competitions: [],
        total: countries.total,
    };
};

export const mergeFootballAndESoccerEvents = (response: EventsResponse): EventsResponse => {
    const footballSport = response.sports.find((sport) => sport.id === SportType.Football);
    const eSoccerSport = response.sports.find((sport) => sport.id === SportType.ESoccer && sport.count > 0);

    if (!eSoccerSport) {
        return response;
    }

    const newResponse: EventsResponse = { ...response };

    if (eSoccerSport && !footballSport) {
        newResponse.sports.unshift({ id: SPORT_TYPE.football, count: 0, countries: [] });
    }

    let result = {
        ...response,
        sports: response.sports.map((sport) => {
            if (sport.id === SPORT_TYPE.football) {
                return {
                    ...sport,
                    countries: [
                        ...sport.countries,
                        ...eSoccerSport.countries
                            .filter((country) => country.key !== LHN_SPORTS_ORDER.WRL)
                            .map((country) => ({ ...country, locationIcon: COMPETITION_ICON })),
                    ],
                };
            }

            return sport;
        }),
    };

    result = { ...result, sports: result.sports.filter((sport) => sport.id !== SPORT_TYPE.esoccer) };

    return result;
};
