import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import sumBy from 'lodash/sumBy';

import { getCompetitionLocation } from 'src/appState/utils';
import type { SportType } from 'src/common/enums';
import type { CompetitionLocationItem } from 'src/modules/sports/types';
import { COMPETITION_ICON, LHN_SPORTS_ORDER } from 'src/utils/constants';

import type {
    Children,
    Competition,
    CompetitionLocationItemById,
    GroupCompetitionsByCountry,
    TournamentModel,
} from './types';

const sortedCountries = (countries: GroupCompetitionsByCountry[]): GroupCompetitionsByCountry[] => {
    const getIdentifier = (a: GroupCompetitionsByCountry): string => (a.countryId !== undefined ? a.countryId : '');

    const byCustomCountry = Object.keys(LHN_SPORTS_ORDER)
        .map((sport) => countries.filter((a) => sport === getIdentifier(a)))
        .reduce((acc, item) => {
            return item.length > 0 ? [...acc, item[0]] : acc;
        }, []);

    const filtered = countries
        .filter((a) => !Object.keys(LHN_SPORTS_ORDER).includes(getIdentifier(a)))
        .sort((a, b) => b.totalEventsCounter - a.totalEventsCounter);

    return [...byCustomCountry, ...filtered];
};

export const buildCrossBetNavigationLinks = (
    competitions: Competition[],
    competitionLocations: CompetitionLocationItem[] = [],
    sport: SportType,
    getTranslation: (key: string, defaultText: string, params?: Record<string, string | number>) => string,
    getTranslationsReverse: (keys: string[]) => string[],
): GroupCompetitionsByCountry[] => {
    const selectors = getCompetitionLocation(sport);

    const competitionIds = competitions.map((competition) => competition.id);

    const filteredCompetitionLocations: CompetitionLocationItemById = competitionLocations.reduce(
        (result, location) => {
            if (competitionIds.includes(location.id)) {
                result[location.id] = location;
            }

            return result;
        },
        {} as CompetitionLocationItemById,
    );

    const categories = Object.values(filteredCompetitionLocations).reduce(
        (uniqueArray: TournamentModel[], location) => {
            const id = get(location, selectors.tagSelector, '');
            const isDuplicate = uniqueArray.some((uniqueLocation) => uniqueLocation.id === id);

            if (!isDuplicate) {
                uniqueArray.push({
                    id,
                    label: get(location, selectors.labelSelector, ''),
                    sport,
                    count: location.total,
                });
            }

            return uniqueArray;
        },
        [],
    );

    const formatCompetitions = competitions.map((competition): Children => {
        const competitionWithFullInfo = filteredCompetitionLocations[competition.id];
        const country = get(competitionWithFullInfo, selectors.tagSelector, '');

        return {
            iconName: COMPETITION_ICON,
            eventNumber: competition.count,
            id: competition.id,
            country,
            displayOrder: competition.displayOrder,
            label: competition.name,
            params: { countryId: country, competitionId: competition.id, sport },
        };
    });

    const groupCompetitionsByCountry = groupBy(formatCompetitions, (competition: Competition) => competition.country);

    return sortedCountries(
        categories.map((country) => {
            const countryCompetitions = get(groupCompetitionsByCountry, country.id, []);
            const counter = sumBy(countryCompetitions, 'eventNumber');

            const allTourCompetitionsLink = {
                label: getTranslationsReverse([
                    getTranslation('lhn.country.all.label', 'All'),
                    ' ',
                    country.label || '',
                ]),
                iconName: 'theme-competitions-all',
                params: { countryId: country.id, sport },
                displayOrder: '0',
                eventNumber: counter,
                country: country.id,
            };

            const children = countryCompetitions.length > 1 ? [allTourCompetitionsLink] : [];

            return {
                countryId: country.id,
                menuLevel: 1,
                label: country.label,
                competitions: country.count,
                totalEventsCounter: counter,
                key: country.id,
                children: [
                    ...children,
                    ...orderBy(groupCompetitionsByCountry[country.id], ['displayOrder', 'label'], ['desc', 'asc']),
                ],
            } as GroupCompetitionsByCountry;
        }),
    );
};
