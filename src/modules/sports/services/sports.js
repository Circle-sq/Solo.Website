import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';

import { api } from '@solo-api/api';

import { remapCompetitionLocations, buildCacheUrl } from 'src/appState/utils';
import { SPORT_TYPE } from 'src/utils/constants';
import { filterActiveSports, filterSports } from 'src/utils/sportRemapping';

export function getActiveSports() {
    return api.get(buildCacheUrl(`/sports/active`)).then((it) => filterActiveSports(it));
}

export function getSports() {
    return api.get(buildCacheUrl('/sports')).then((it) => filterSports(it));
}

export function launchToken(token) {
    return api.post('/launch-token', { launchToken: token });
}

export const remapESoccerCompetitions = (competitions) => {
    if (isUndefined(competitions)) {
        return [];
    }

    const { getTranslation } = window.$appState.language;

    return competitions.map((competition) => {
        const categoryLabel = get(competition, 'tags.category-label[0]');
        const country = SPORT_TYPE.esoccer.toUpperCase();
        const countryLabel = getTranslation('sport-name.esoccer', 'eSoccer');

        return {
            ...competition,
            country,
            label: competition.name,
            name: categoryLabel,
            tags: {
                ...competition.tags,
                country: [country],
                'country-label': [countryLabel],
            },
        };
    });
};

export async function getCompetitions(action) {
    const sportRemapping = window.$appState.env.sportRemapping;

    const competitionsPromise = api.post(buildCacheUrl('/competitions/search'), action.query);

    const mappedCompetitionsPromises = Object.entries(sportRemapping).reduce((accumulator, [key, value]) => {
        if (action.query.sport === value) {
            const newQuery = {
                ...action.query,
                sport: key,
            };
            accumulator.push(api.post(buildCacheUrl('/competitions/search'), newQuery));
        }

        return accumulator;
    }, []);

    return Promise.all([competitionsPromise, ...mappedCompetitionsPromises]).then((it) => {
        return [...remapCompetitionLocations(it[0]), ...remapESoccerCompetitions(it[1])];
    });
}
