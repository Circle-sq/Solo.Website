import orderBy from 'lodash/orderBy';
import ms from 'ms';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';

import { useAppStateContext } from 'src/appState/AppState';
import type { SportType } from 'src/common/enums';
import { request as getCompetitionsLocations } from 'src/modules/sports/actions/get-competitions-locations-list';
import { competitionLocationItemsBySportSelector } from 'src/modules/sports/selectors';

import { getLHNCompetition } from '../helpers';
import type { LHNCompetition } from '../types';

const PER_PAGE = 40;
const REFETCH_INTERVAL = ms('30s');

export const useLHNCompetitions = (sportId: string, enabled: boolean) => {
    const dispatch = useDispatch();
    const competitionLocations = useSelector(competitionLocationItemsBySportSelector(sportId as SportType));

    const [currentPage, setCurrentPage] = useState(1);
    const [isShowMoreAvailable, setIsShowMoreAvailable] = useState(false);

    const { eventsCollection } = useAppStateContext();
    const { events, total, isInitialLoading, loadMore } = useMemo(() => {
        if (enabled) {
            return eventsCollection.getEventsCollectionList(`in-play-${sportId}`, {
                sport: sportId,
                page: 1,
                perPage: PER_PAGE * currentPage,
            });
        }

        return { events: [], total: 0, isInitialLoading: false, loadMore: () => {} };
    }, [sportId, enabled, eventsCollection, currentPage]);

    const competitions = useMemo(() => {
        const aggregation = events.reduce(
            (acc, event) => {
                if (event.display && event.timeSettingsStarted) {
                    const competitionLocation = competitionLocations.find(
                        (location) => +location.id === event.competitionId,
                    );

                    acc[event.competitionId] ??= getLHNCompetition(event, competitionLocation);
                    acc[event.competitionId].events.push(event);
                }

                return acc;
            },
            {} as Record<string, LHNCompetition>,
        );
        const values = Object.values(aggregation);

        values.forEach((value) => {
            value.events = orderBy(value.events, ['timeSettingsStartTime', 'name']);
        });

        return orderBy(values, ['displayOrder', 'events.0.timeSettingsStartTime'], ['desc', 'asc']);
    }, [competitionLocations, events]);

    const refetchCompetitionsLocations = useCallback(() => {
        if (enabled) {
            dispatch(getCompetitionsLocations({ sport: sportId }));
        }
    }, [sportId, enabled, dispatch]);

    const onShowMore = useCallback(() => {
        setCurrentPage((prev) => prev + 1);
    }, []);

    useEffect(() => {
        if (competitionLocations.length === 0) {
            refetchCompetitionsLocations();
        }
    }, [competitionLocations.length, refetchCompetitionsLocations]);

    useEffect(() => {
        if (isInitialLoading || (total === 0 && events.length > 0)) {
            return;
        }

        setIsShowMoreAvailable(total > events.length);
    }, [events.length, total, isInitialLoading]);

    useInterval(() => {
        loadMore();
        refetchCompetitionsLocations();
    }, REFETCH_INTERVAL);

    return {
        competitions,
        isLoading: isInitialLoading,
        isShowMoreAvailable,
        onShowMore,
    };
};
