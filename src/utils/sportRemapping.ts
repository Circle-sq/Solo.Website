import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

import { api } from '@solo-api/api';

import type { EventQueryRequest } from 'src/appState/EventsCollection/types';
import type { Sport } from 'src/appState/EventsCollection/utils';
import { LHN_SPORTS_ORDER, SPORT_TYPE } from 'src/utils/constants';

export const transformQuery = (query: EventQueryRequest, id = '') => {
    const sportRemapping = window.$appState.env.sportRemapping;

    const updatedQuery = { ...query };

    if (updatedQuery.sport) {
        const sportArr = Array.isArray(updatedQuery.sport) ? updatedQuery.sport : [updatedQuery.sport];
        const mappedSports = Object.entries(sportRemapping)
            .filter(([_, value]) => sportArr.includes(value))
            .map(([key]) => key);

        if (mappedSports?.length) {
            if (
                id &&
                !updatedQuery.competition &&
                id.toLowerCase().includes(`country:${mappedSports[0].toLowerCase()}`)
            ) {
                updatedQuery.sport = mappedSports[0];
            } else {
                updatedQuery.sport = [...sportArr, ...mappedSports];
            }

            if (updatedQuery['tags.country']?.toLowerCase() === mappedSports[0]?.toLowerCase()) {
                updatedQuery.sport = mappedSports[0];
                updatedQuery['tags.country'] = LHN_SPORTS_ORDER.WRL;
            }
        }
    }

    return { ...updatedQuery, reduceMarkets: true };
};

export const remapSport = (sport: string): string => {
    const sportRemapping = window.$appState.env.sportRemapping;

    return sportRemapping[sport] || sport;
};

// FIXME - VA: this code should no exist
export const remapEventsSport = (data: any) => {
    if (isEmpty(data)) {
        return {
            events: [],
            sports: [],
        };
    }

    const sportRemapping = window.$appState.env.sportRemapping;
    const originalEvents = get(data, 'events', []);
    const events = map(originalEvents, (event: any) => {
        return {
            ...event,
            sport: remapSport(event.sport),
            tags: {
                ...event.tags,
                'original-sport': event.sport === SPORT_TYPE.esoccer ? [SPORT_TYPE.esoccer] : undefined,
            },
            template:
                typeof event.template === 'string'
                    ? event.template
                    : {
                          ...event.template,
                          sportId: remapSport(event.sport),
                      },
        };
    });

    const originalSports = get(data, 'sports', []);
    const sports = map(originalSports, (sport: Sport) => {
        if (Object.keys(sportRemapping).includes(sport.id)) {
            const reduxState = window.$appState.reduxState;
            const remappedSport = reduxState.getSport(sportRemapping[sport.id]);

            if (remappedSport !== null) {
                return JSON.parse(JSON.stringify(remappedSport));
            }

            return sport;
        }

        return sport;
    });

    return {
        ...data,
        events,
        sports,
    };
};

export const remapSportCounters = (data: Sport[]): Sport[] => {
    const sportRemapping = window.$appState.env.sportRemapping;
    const sports = [...data];

    const findSportIndex = (toSearch: string): number =>
        sports.findIndex((sport: { id: string }) => sport.id === toSearch);

    Object.entries(sportRemapping).forEach(([key, value]) => {
        const eSportIndex = findSportIndex(key);

        if (eSportIndex > -1) {
            const sportIndex = findSportIndex(value);

            if (sportIndex > -1) {
                sports[sportIndex] = {
                    ...sports[sportIndex],
                    count: sports[sportIndex].count + sports[eSportIndex].count,
                };
            } else {
                sports.push({ id: value, count: sports[eSportIndex].count, countries: [] });
            }
        }
    });

    return sports;
};

export const filterSports = (sports: any) => {
    const sportRemapping = window.$appState.env.sportRemapping;
    const sportKeys = Object.keys(sportRemapping);

    return sports.filter((sport: { id: string }) => !sportKeys.includes(sport.id));
};

export const filterActiveSports = (sports: any) => {
    const sportRemapping = window.$appState.env.sportRemapping;

    return Object.entries(sportRemapping).reduce((acc, [key]) => {
        if (acc.find((sport: { id: string }) => sport.id === key) !== undefined) {
            const filteredSports = acc.filter((sport: { id: string }) => sport.id !== key);
            const mappedSport = sportRemapping[key];

            if (acc.find((sport: { id: string }) => sport.id === mappedSport) === undefined) {
                return api.get(`sports/${mappedSport}`).then((sport) => [...filteredSports, sport]);
            } else {
                return filteredSports;
            }
        } else {
            return acc;
        }
    }, sports);
};
