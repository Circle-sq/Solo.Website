import { format } from 'date-fns';
import groupBy from 'lodash/groupBy';

import type { EventModel } from 'src/appState/models/models/EventModel';
import type { CompetitionGroup } from 'src/ui/events/hooks/useParsedCrossBetCompetitions';
import { DATE_FORMAT } from 'src/utils/constants';
import { WeekDayName } from 'src/utils/date';

export const crossBetGroupEvents = (events: EventModel[]): CompetitionGroup[] => {
    let eventsByCompetition: EventModel[] = [];

    let groupEvents = [];

    if (events.length === 1) {
        const [singleEvent] = events;

        groupEvents.push([singleEvent.competitionId, [singleEvent]]);
    } else {
        groupEvents = events.reduce((acc: unknown[], event: EventModel, index: number) => {
            eventsByCompetition.push(event);

            if (index === events.length - 1 && event.competitionId !== events[index - 1].competitionId) {
                const newState = [...acc, [event.competitionId, eventsByCompetition]];
                eventsByCompetition = [];

                return newState;
            } else if (index === events.length - 1 && event.competitionId === events[index - 1].competitionId) {
                const newState = [...acc, [event.competitionId, eventsByCompetition]];
                eventsByCompetition = [];

                return newState;
            }

            if (Boolean(events[index + 1]) && event.competitionId !== events[index + 1].competitionId) {
                const newState = [...acc, [event.competitionId, eventsByCompetition]];
                eventsByCompetition = [];

                return newState;
            }

            return [...acc];
        }, []);
    }

    return groupEvents as CompetitionGroup[];
};

export interface GroupedCrossBetEvent {
    weekDayName: string;
    events: CompetitionGroup[];
    date: string;
}

export const groupEventsByStartTime = (events: EventModel[]) => {
    return groupBy(events, (event) => {
        return format(new Date(event.timeSettingsStartTime), DATE_FORMAT.NUMERIC_DATE).slice(0, 10);
    });
};

export const groupCrossBetEventsByDay = (events: EventModel[]) => {
    const groupedEvents = groupEventsByStartTime(events);

    return Object.keys(groupedEvents).reduce((acc: GroupedCrossBetEvent[], key: string): GroupedCrossBetEvent[] => {
        return [
            ...acc,
            {
                weekDayName: WeekDayName(new Date(key)),
                events: crossBetGroupEvents(groupedEvents[key]),
                date: format(new Date(key), DATE_FORMAT.NUMERIC_FULL_DATE),
            },
        ];
    }, []);
};
