import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { SportType } from 'src/common/enums';
import type { Navigate } from 'src/ui/common/SubNavigation/types';
import { buildInPlayLinks } from 'src/ui/layouts/InPlay/helpers';

import type { Stream } from '../types';

export const useInPlayLinks = (sportId: string, activeSports: Navigate[], streamsCounters: Stream[]) => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const streamsCount = useMemo(() => {
        const filteredStreamsCounters = streamsCounters.filter((streamCounter) => streamCounter.id);

        return filteredStreamsCounters.reduce((accumulator, currentValue: Stream) => {
            if (currentValue.id && currentValue.id !== SportType.ESoccer) {
                return accumulator + currentValue.count;
            }

            return accumulator;
        }, 0);
    }, [streamsCounters]);

    return buildInPlayLinks(getTranslation, streamsCount, activeSports, sportId);
};
