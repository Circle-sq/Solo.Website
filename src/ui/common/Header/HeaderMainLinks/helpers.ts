import includes from 'lodash/includes';

import { RouteName, SportType } from 'src/common/enums';
import type { HeaderItem } from 'src/ui/common/Header/HeaderMainLinks/types';

export const asianViewHeader: HeaderItem = {
    route: RouteName.AsianView,
    langKey: 'header.asianView.label',
    defaultText: 'Asian View',
    params: { id: RouteName.AsianView },
    isActive: (route: string) => route === RouteName.AsianView,
    testId: 'asianViewHeader',
};

export const getTopHeaderItems = (): HeaderItem[] => [
    {
        route: RouteName.Homepage,
        langKey: 'header.sportsbetting.label',
        defaultText: 'sports',
        params: {},
        isActive: (route: string, isLive: boolean) =>
            !isLive && includes([RouteName.Competition, RouteName.Event, RouteName.Sport, RouteName.Country], route),
        testId: 'sportsBettingHeader',
    },
    {
        route: RouteName.CrossBetting,
        langKey: 'header.crossbetting.label',
        defaultText: 'cross',
        params: { sport: SportType.All },
        isActive: (route: string, isLive: boolean) => route === RouteName.CrossBetting && !isLive,
        testId: 'crossBettingHeader',
    },
    {
        route: RouteName.InPlay,
        langKey: 'header.livebetting.label',
        defaultText: 'live sports',
        params: { id: RouteName.Betting },
        isActive: (route: string, isLive: boolean) => route === RouteName.InPlay || isLive,
        testId: 'liveBettingHeader',
    },
];
