import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { SportType } from 'src/common/enums';

import type { EventSort } from './types';

export const QUERY_VALUE = {
    all: SportType.All,
    crossbet: 'crossbet',
};

export const QUERY_OPTIONS = [
    { id: QUERY_VALUE.all, label: 'All bet types' },
    { id: QUERY_VALUE.crossbet, label: 'Cross bet only' },
];

const betQueries = {
    [QUERY_VALUE.all]: {},
    [QUERY_VALUE.crossbet]: {
        'market.market-display': 'cross-bet-view',
    },
};

export const useBetTypeQuery = (): EventSort => {
    const { router } = useAppStateContext();
    const { betType, ...params } = router.route.params;

    const onSortChange = (value?: string) => {
        router.redirect(router.route.name, { ...params, betType: value });
    };

    const value = useMemo(() => betType ?? QUERY_VALUE.crossbet, [betType]);

    return {
        options: QUERY_OPTIONS,
        betType: value,
        onSortChange,
        betTypeReqParams: betQueries[value],
    };
};
