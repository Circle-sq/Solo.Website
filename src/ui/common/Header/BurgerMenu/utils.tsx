import type { ReactElement } from 'react';

import { AllSportsIcon, LiveSportsIcon } from '@solo-ui/icons/svg';

import type { SportCount } from 'src/appState/sportsList/types';
import { RouteName, SportTab } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';
import { PAGE_ROUTE_NAME } from 'src/utils/constants';
import type { ReadonlyRoute } from 'src/utils/Router/types';

interface SportTabItem {
    key: string;
    className: string;
    Icon: ReactElement;
    label: ReactElement;
    params: Record<string, string>;
    route: RouteName;
}

export const LOGGED_IN_SPORTS_MIN_LENGTH = 7;
export const TABS_AND_LANGUAGE_SELECTOR_ADDED_HEIGHTS = 91;
export const SEARCH_BUTTON_HEIGHT = 56;
export const SPORT_ROW_HEIGHT = 39;
export const FREE_BET_ITEM_HEIGHT = 65;
export const FREE_BET_HEADER_HEIGHT = 46;
export const MAX_VISIBLE_FREE_BETS = 3;
export const LANGUAGE_ROW_HEIGHT = 30;
export const HEIGHT_OFFSET = 10;

export const getSportTabItems = (): SportTabItem[] => [
    {
        key: SportTab.Sports,
        className: 'theme-sports',
        Icon: <AllSportsIcon fontSize='small' />,
        label: <I18n langKey='footer.mobile.sports.label' defaultText='Sports' />,
        params: { id: PAGE_ROUTE_NAME.homepage },
        route: RouteName.Homepage,
    },
    {
        key: SportTab.Live,
        className: 'theme-live',
        Icon: <LiveSportsIcon fontSize='xsmall' />,
        label: <I18n langKey='footer.mobile.live-sports.label' defaultText='Live Sports' />,
        params: { id: PAGE_ROUTE_NAME.betting },
        route: RouteName.InPlay,
    },
];

export const mergeCounts = (arr1: SportCount[], arr2: SportCount[]): SportCount[] => {
    const counts: { [key: string]: number } = {};

    for (const item of arr1) {
        counts[item.id] = (counts[item.id] || 0) + item.count;
    }

    for (const item of arr2) {
        if (counts[item.id] === undefined) {
            counts[item.id] = 0;
        }
        counts[item.id] += item.count;
    }

    return Object.keys(counts)
        .map((id) => ({
            id,
            count: counts[id],
        }))
        .sort((a, b) => b.count - a.count);
};

export const getRouteByTab = (tab: string): RouteName => {
    if (tab === SportTab.Live) {
        return RouteName.InPlay;
    }

    return RouteName.Homepage;
};

export const getActiveTab = (route: string): string => {
    const routeToTabMap: Record<string, string> = {
        [RouteName.InPlay]: SportTab.Live,
    };

    return routeToTabMap[route] || SportTab.Sports;
};

export const isActiveTabOnCorrespondingRoute = ({ name }: ReadonlyRoute, activeTab: string): boolean => {
    return (
        (name === RouteName.InPlay && activeTab === SportTab.Live) ||
        ((name === RouteName.Homepage || name === RouteName.Sport || name === RouteName.Country) &&
            activeTab === SportTab.Sports)
    );
};

export const isActiveSportRow = (
    { name, params }: ReadonlyRoute,
    activeTab: string,
    id: string,
    sport = '',
    isLiveEvent?: boolean,
): boolean => {
    if (name === RouteName.Event && sport === id) {
        if (isLiveEvent) {
            return activeTab === SportTab.Live;
        }

        return activeTab === SportTab.Sports;
    }

    const isActiveTabOnRoute = isActiveTabOnCorrespondingRoute({ name, params }, activeTab);

    if (!isActiveTabOnRoute) {
        return false;
    }

    if (activeTab === SportTab.Sports || activeTab === SportTab.Live) {
        return params?.id === id || params?.sportId === id;
    }

    return false;
};
