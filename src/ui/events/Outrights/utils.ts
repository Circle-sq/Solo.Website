import { differenceInYears } from 'date-fns';
import get from 'lodash/get';
import includes from 'lodash/includes';

import type { EventModel } from 'src/appState/models/models/EventModel';
import { getCompetitionLocationLabel } from 'src/appState/utils';
import { RouteName, SportType } from 'src/common/enums';
import { formatToFullDate } from 'src/common/helpers/date';
import type { CompetitionLocationItem } from 'src/modules/sports/types';
import { NUMBERS } from 'src/utils/constants';
import { WeekDayName } from 'src/utils/date';
import type { CompetitionLocation } from 'src/utils/types';

import type { CompetitionData, EventData } from './types';

export function isValidOutrightDate(date: string | undefined): boolean {
    return date !== undefined && differenceInYears(new Date(date), new Date()) < NUMBERS.three;
}

export const getSportId = (routeName: string, params: Readonly<Record<string, string>>) => {
    switch (routeName) {
        case RouteName.Sport:
            return params.id;

        case RouteName.Competition:
            return params.slug;

        case RouteName.Country:
            return params.sportId;

        default:
            return undefined;
    }
};

export const getPageSortQuery = (sport: string): string[] => {
    const exceptionList = [SportType.Golf, SportType.FormulaOne];
    const isExceptionPage = includes(exceptionList, sport);
    const defaultQuery = [
        '-competition.displayOrder',
        'timeSettings.startTime',
        '-sport.displayOrder',
        'competition.name',
        'name',
    ];

    return isExceptionPage
        ? ['timeSettings.startTime', '-competition.displayOrder', '-sport.displayOrder', 'competition.name', 'name']
        : defaultQuery;
};

export const groupOutrightEvents = (
    events: EventModel[],
    groupByParameter: 'formattedDate' | 'eventCompetition',
    competitionLocations: CompetitionLocationItem[],
    competitionLocation: CompetitionLocation,
    getTranslation: {
        (key: string, defaultText: string, params?: Record<string, string | number>): string;
    },
): CompetitionData[] => {
    return events.reduce((groupedEvents: CompetitionData[], event: EventModel) => {
        const competitionId = event.competitionId;

        const locationItem = competitionLocations.find(({ id }) => id === String(competitionId));
        const locationName = getCompetitionLocationLabel(
            getTranslation,
            get(locationItem, competitionLocation.tagSelector),
            get(locationItem, competitionLocation.labelSelector),
        );

        const competitionName = get(locationItem, 'name') as string;
        const date = event.timeSettingsStartTime;
        const formattedDate = formatToFullDate(date);

        const eventData: EventData = {
            id: event.id,
            name: event.name,
            originalName: event.originalName,
            date,
            markets: event.markets,
            revision: event.revision,
        };

        const competitionData: CompetitionData = {
            weekDayName: WeekDayName(new Date(date)),
            competition: competitionName,
            locationLabel: locationName,
            formattedDate,
            eventCompetition: competitionId,
            events: [eventData],
        };

        const competitionIndex = groupedEvents
            .map((competitionObj) => competitionObj[groupByParameter])
            .indexOf(competitionData[groupByParameter]);

        if (competitionIndex !== -1) {
            groupedEvents[competitionIndex].events.push(eventData);

            return groupedEvents;
        } else {
            groupedEvents.push(competitionData);

            return groupedEvents;
        }
    }, []);
};
