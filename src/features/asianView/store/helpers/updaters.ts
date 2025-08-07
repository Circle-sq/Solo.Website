import type { CompetitionLocationItem } from 'src/common/types/competition';
import type { TimeSettings } from 'src/common/types/event';
import type { EventItem, SelectionItem } from 'src/store/events/types';

import type { SearchEventsPageData } from '../../api/events/types';
import type { SortBy } from '../../enums';

import { countCompetitionEvents } from './count';
import { groupCompetitionEvents } from './group';

export const updateSelectionStatuses =
    (active: boolean, display: boolean) =>
    (selection: SelectionItem | null): SelectionItem | null => {
        if (selection === null) {
            return null;
        }

        return { ...selection, active, display };
    };

export const updateStartedEvent =
    (eventId: number, { started, tradedInPlay }: TimeSettings) =>
    (event: EventItem): EventItem => {
        if (event.id !== eventId) {
            return event;
        }

        return {
            ...event,
            timeSettings: { ...event.timeSettings, started, tradedInPlay, timeline: 'Started' },
        };
    };

export const moveStartedEventToLiveGroup =
    (eventId: number, sortBy: SortBy, competitionLocations: CompetitionLocationItem[], timeSettings: TimeSettings) =>
    (page: SearchEventsPageData) => {
        if (page.upcoming.total === 0) {
            return page;
        }

        const events = page.events.map(updateStartedEvent(eventId, timeSettings));

        const { liveGroups, upcomingGroups } = groupCompetitionEvents(events, competitionLocations, sortBy);

        return {
            ...page,
            events,
            live: { groups: liveGroups, total: countCompetitionEvents(liveGroups) },
            upcoming: { groups: upcomingGroups, total: countCompetitionEvents(upcomingGroups) },
        };
    };

export const removeFinishedEvent =
    (eventId: number, sortBy: SortBy, competitionLocations: CompetitionLocationItem[]) =>
    (page: SearchEventsPageData) => {
        if (page.live.total === 0) {
            return page;
        }

        const events = page.events.filter((event) => event.id !== eventId);

        const { liveGroups } = groupCompetitionEvents(events, competitionLocations, sortBy);

        return {
            ...page,
            events,
            live: { groups: liveGroups, total: countCompetitionEvents(liveGroups) },
            total: page.events.length === events.length ? page.total : page.total - 1,
        };
    };
