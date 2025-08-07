/* eslint-disable @typescript-eslint/naming-convention */
import compact from 'lodash/compact';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import some from 'lodash/some';
import upperCase from 'lodash/upperCase';
import type { ReactElement } from 'react';

import type { EventModel } from 'src/appState/models/models/EventModel';
import type { MarketModel } from 'src/appState/models/models/MarketModel';
import { getCompetitionLocationLabel } from 'src/appState/utils';
import { RouteName, SelectionIdentifier, SportType } from 'src/common/enums';
import { MarketTemplate } from 'src/common/enums/market';
import { formatToFullDate } from 'src/common/helpers/date';
import { isHandicapTemplate, isOverUnderTemplate } from 'src/common/helpers/market';
import { SIMULATED_REALITY_LEAGUES } from 'src/config/config';
import { DASH, getWeekdayLabel, LHN_SPORTS_ORDER } from 'src/utils/constants';

import { marketTypeGenericValues } from './config';
import type { EventDataGrouped, GroupNameParams } from './types';

export const isESoccerType = (sportId?: string): sportId is SportType.ESoccer => sportId === SportType.ESoccer;

export const hasEventsToDisplay = (events: EventModel[]) => {
    return some(
        events,
        (event) =>
            get(event, 'timeMatchInPlay') &&
            get(event, 'state') === 'open' &&
            get(event, 'data.value.timeSettings.started'),
    );
};

export const hideEventsBasedOnESoccer = (countryId?: string | null, sportId?: string) =>
    (isESoccerType(sportId) && countryId === LHN_SPORTS_ORDER.WRL) ||
    (!isESoccerType(sportId) && countryId === upperCase(SportType.ESoccer));

export const hideEventsBasedOnSRL = (countryId?: string | null, category?: string): boolean => {
    if (category === undefined) {
        return false;
    }

    return includes(SIMULATED_REALITY_LEAGUES, category) && countryId === LHN_SPORTS_ORDER.WRL;
};

export const getQueryCollectionId = (collectionId: string, sortBy: string, countryTag?: string) => {
    if (!isEmpty(countryTag)) {
        const country = `-country:${countryTag}`;

        return `${collectionId}${country}${sortBy}`;
    }

    return `${collectionId}${sortBy}`;
};

export const getEventsCount = ({ events = [] }: EventDataGrouped): number => {
    return events.filter(
        (event) => get(event, 'data.value.timeSettings.timeLineState') !== 'FINISHED' && get(event, 'display') === true,
    ).length;
};

export const getGroupName = ({
    group: { originalSport, ...group },
    routeName,
    getTranslation,
    shouldGroupEvents,
}: GroupNameParams): string | string[] | ReactElement => {
    if (routeName === RouteName.Competition && originalSport !== SportType.ESoccer) {
        const { weekDayName, formattedDate } = group;
        const weekdayLabel = getWeekdayLabel(getTranslation);

        return (
            <>
                {weekdayLabel[weekDayName]?.toUpperCase()}
                {' | '}
                {formattedDate || formatToFullDate(new Date())}
            </>
        );
    }

    if (routeName === RouteName.Country || originalSport === SportType.ESoccer || shouldGroupEvents) {
        const { competition, location, locationLabel, tag } = group;
        const competitionName = getTranslation(competition, competition);

        if (originalSport === SportType.ESoccer) {
            const labelOfCategory = locationLabel ?? location;

            if (routeName === RouteName.Competition) {
                return compact([labelOfCategory, competitionName, tag]);
            }

            return compact([location, labelOfCategory, tag]);
        }

        if (
            (!location || location === LHN_SPORTS_ORDER.WRL) &&
            originalSport === SportType.Football &&
            locationLabel !== DASH
        ) {
            return compact([locationLabel, competitionName, location, tag]);
        }

        if (!isUndefined(location) && includes(SIMULATED_REALITY_LEAGUES, location)) {
            return compact([locationLabel, competitionName, location, tag]);
        }

        const competitionLocation = getCompetitionLocationLabel(getTranslation, location, locationLabel);

        return compact([competitionLocation, competitionName, location, tag]);
    }

    return '';
};

export const getMarketTypeGenericIdentifiers = (marketTypeGeneric?: string): string[] => {
    if (marketTypeGeneric === undefined) {
        return [];
    }

    const identifiers = get(marketTypeGenericValues, marketTypeGeneric, []);

    if (isOverUnderTemplate(marketTypeGeneric)) {
        return [SelectionIdentifier.Goal, ...identifiers];
    }

    if (isHandicapTemplate(marketTypeGeneric)) {
        return ['', ...identifiers];
    }

    return identifiers;
};

export const getMarketIdentifiers = ({ marketTypeGeneric, selections, templateId }: MarketModel) => {
    const maximumSelectionIdentifiers = 3;

    const identifiers = selections.map((s) => s.identifier).slice(0, maximumSelectionIdentifiers);

    if (isOverUnderTemplate(marketTypeGeneric)) {
        return [SelectionIdentifier.Goal, ...identifiers];
    }

    const isHandicap = includes(templateId, MarketTemplate.Handicap) || isHandicapTemplate(marketTypeGeneric);

    if (isHandicap && selections.length < maximumSelectionIdentifiers) {
        return ['', ...identifiers];
    }

    return identifiers;
};
