/* eslint-disable @typescript-eslint/naming-convention */
import includes from 'lodash/includes';
import type { ReactElement } from 'react';

import { CrossBetIcon, LiveSportsIcon, SportsIcon } from '@sc-ui/icons/svg';

import { RouteName, SportType } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';
import type { Testable } from 'src/utils/Testable/types';

export interface SubHeaderItem extends Testable {
    route: string;
    label: ReactElement;
    params: Readonly<Record<string, string>>;
    isActive: (route: string, isLive: boolean) => boolean;
    icon: ReactElement;
}

export const getSubHeaderItems = (): SubHeaderItem[] => [
    {
        route: RouteName.Homepage,
        icon: <SportsIcon />,
        label: <I18n langKey='header.sportsbetting.label' defaultText='Sports' />,
        params: {},
        isActive: (route: string, isLive: boolean) =>
            !isLive &&
            includes(
                [RouteName.Competition, RouteName.Event, RouteName.Sport, RouteName.Country, RouteName.AllCountries],
                route,
            ),
    },
    {
        route: RouteName.CrossBetting,
        label: <I18n langKey='header.crossbetting.label' defaultText='Cross' />,
        params: { sport: SportType.All },
        isActive: (route: string, isLive: boolean) => route === RouteName.CrossBetting && !isLive,
        icon: <CrossBetIcon />,
    },
    {
        route: RouteName.InPlay,
        label: <I18n langKey='header.livebetting.label' defaultText='Live Sports' />,
        params: { id: RouteName.Betting },
        isActive: (route: string, isLive: boolean) => route === RouteName.InPlay || isLive,
        icon: <LiveSportsIcon fontSize='xsmall' />,
    },
];
