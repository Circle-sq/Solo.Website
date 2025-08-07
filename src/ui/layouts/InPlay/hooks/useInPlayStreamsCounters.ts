import { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import ms from 'ms';

import { useAppStateContext } from 'src/appState/AppState';
import { useInterval } from 'src/appState/customHooks';
import { RouteName, ModalRouteName } from 'src/common/enums';
import { getCompetitionLocation } from 'src/appState/utils';
import { selectedCountryAtom, reloadCountersAtom } from 'src/ui/layouts/store/atoms';

import type { Stream, InPlayCounters } from '../types';

const COUNTERS_REFRESH_TIMEOUT = ms('30s');

interface Props {
    streamsCounters: Stream[];
    inPlayCounters: InPlayCounters[];
    selectedCountry: string | null;
}

export const useInPlayStreamsCounters = (): Props => {
    const {
        eventsCounter,
        router: {
            route: {
                name: routeName,
                params: { id: sportId },
            },
        },
    } = useAppStateContext();
    const [selectedCountry, setSelectedCountry] = useRecoilState(selectedCountryAtom);
    const [reloadCounters, setReloadCounters] = useRecoilState(reloadCountersAtom);

    const isLiveSports = routeName === RouteName.InPlay;
    const selectedTabId = `${sportId}`;
    const competitionLocation = getCompetitionLocation(sportId);

    const { counters: inPlayCounters } = useMemo(() => {
        return eventsCounter.getEventsCounterList(ModalRouteName.LiveGroupedSports, {
            aggregations: [
                `sport-location-aggregation|${competitionLocation.querySelector}|${competitionLocation.queryLabelSelector}`,
            ],
        });
    }, [sportId, reloadCounters]);

    const { counters: streamsCounters } = useMemo(() => {
        return eventsCounter.getEventsCounterList(ModalRouteName.InPlayStreamsCount, {});
    }, [sportId, reloadCounters]);

    useInterval(() => {
        if (isLiveSports) {
            setReloadCounters(!reloadCounters);
        }
    }, COUNTERS_REFRESH_TIMEOUT);

    useEffect(() => {
        setSelectedCountry(null);
    }, [selectedTabId]);

    return { streamsCounters, inPlayCounters, selectedCountry };
};
