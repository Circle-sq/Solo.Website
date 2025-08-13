import { ko } from 'date-fns/locale';
import includes from 'lodash/includes';
import memoize from 'lodash/memoize';

import { getShortLocale } from 'src/utils/common';

import { BLUE_SPORTS_BG, gradientHeaderColors, langs, twoRowStyleSports } from './constants';
import type { Participant } from './types';

const getRandomGradientColor = memoize(() => {
    const values = Object.values(gradientHeaderColors);

    return values[Math.floor(Math.random() * values.length)];
});

export const getSportBG = (sport: string, sportsMap = BLUE_SPORTS_BG): string => {
    const backgroundList = Object.keys(sportsMap);
    const key = sport.toUpperCase();

    if (backgroundList.includes(key)) {
        return `url(${sportsMap[key]})`;
    }

    return getRandomGradientColor();
};

export const langToLocale = (lang: string | null) => {
    if (lang === null) {
        return ko;
    }

    return langs[lang as keyof typeof langs];
};

export const getBetRadarStatisticUrl = (requestId: string, userLang: string): string => {
    const lang = getShortLocale(userLang);

    return `https://s5.sir.sportradar.com/solo/${lang}/match/${requestId}`;
};

export const getTeamByType = (participants: Record<number, Participant>, type: string) => {
    for (const team of Object.values(participants)) {
        if (team.role === type) {
            return team;
        }
    }
};

export const isTwoRowStyleSport = (sport?: string) => includes(twoRowStyleSports, sport);
