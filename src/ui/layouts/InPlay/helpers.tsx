import isUndefined from 'lodash/isUndefined';

import type { EventModel } from 'src/appState/models/models/EventModel';
import { getLocationTags } from 'src/appState/models/models/helpers';
import type { SportCount } from 'src/appState/sportsList/types';
import { getCompetitionLocationInfoFromTags } from 'src/appState/utils';
import { RouteName } from 'src/common/enums';
import type { CompetitionLocationItem } from 'src/modules/sports/types';
import type { Navigate } from 'src/ui/common/SubNavigation/types';
import { NA } from 'src/utils/constants';

import type { LHNCompetition } from './types';

export const sportCounterGuard = (sport: SportCount | undefined): sport is SportCount => !isUndefined(sport);

export const buildInPlayLinks = (
    getTranslation: (key: string, defaultKey: string) => string,
    streamsCount: number,
    activeSports: Navigate[],
    selectedTabId: string,
): Navigate[] => {
    const liveStreamLink = {
        route: RouteName.InPlay,
        params: { id: RouteName.LiveStream },
        count: streamsCount,
        icon: 'sports-glyph-video-i',
        label: getTranslation('livefilter.live-streaming.title', 'Live Streaming'),
        testId: 'liveStreamLink',
    };

    const highlightsLink = {
        route: RouteName.InPlay,
        params: { id: RouteName.Betting },
        icon: 'sports-all',
        label: getTranslation('livefilter.highlights.title', 'Highlights'),
        testId: 'highlightsLink',
    };

    return streamsCount === 0 && selectedTabId !== RouteName.LiveStream
        ? [highlightsLink, ...activeSports]
        : [highlightsLink, liveStreamLink, ...activeSports];
};

export const getLHNCompetition = (
    event: EventModel,
    competitionLocation: CompetitionLocationItem | undefined,
): LHNCompetition => {
    const { name, sport, displayOrder, platformObject, tags } = competitionLocation ?? {};

    return {
        id: event.competitionId,
        name: name ?? event.translations?.competition ?? NA,
        sport: sport ?? event.sport,
        displayOrder: displayOrder ?? 0,
        platformObject: platformObject ?? null,
        categoryInfo: getCompetitionLocationInfoFromTags(tags ?? getLocationTags(event)),
        events: [],
    };
};
