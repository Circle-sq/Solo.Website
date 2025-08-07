/* eslint-disable @typescript-eslint/naming-convention */
import { RouteName, SportType } from 'src/common/enums';
import { SPORT_ICONS } from 'src/config/sport-icons';
import { I18n } from 'src/ui/common/Language/I18n';
import type { Stream } from 'src/ui/layouts/InPlay/types';

import type { CrossSportLink } from './types';

export const getSportIconClassName = (sport: SportType): string =>
    `sports-icon ${SPORT_ICONS[sport] ?? SPORT_ICONS.default}`;

export const getCrossBettingSports = (sports: Stream[]): CrossSportLink[] => {
    const allSports: Stream = { id: SportType.All, name: 'All Sports', displayOrder: 100, count: 0 };

    return [allSports, ...sports].map(({ id, name }) => ({
        route: RouteName.CrossBetting,
        params: { sport: id },
        sportId: id,
        icon: getSportIconClassName(id as SportType),
        label: <I18n langKey={`crossbetting.bar.sport.${id}`} defaultText={name} />,
        testId: `crossbet-${id}`,
    }));
};
