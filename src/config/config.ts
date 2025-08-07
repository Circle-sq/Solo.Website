import startsWith from 'lodash/startsWith';

import { SportType } from 'src/common/enums';
import { SPORT_TYPE } from 'src/utils/constants';

export const AMERICAN_SPORTS: string[] = [
    SportType.Baseball,
    SportType.IceHockey,
    SportType.Basketball,
    SportType.AmericanFootball,
];

export const SCOREBOARD_SPORTS: string[] = [
    SportType.Tennis,
    SportType.Badminton,
    SportType.Darts,
    SportType.Snooker,
    SportType.TableTennis,
    SportType.Volleyball,
    SportType.BeachVolleyball,
];

export const SCORE_SUPPORTED_MARQUEE_SPORTS: string[] = [
    SportType.Football,
    SportType.Baseball,
    SportType.Basketball,
    SportType.AmericanFootball,
    SportType.Tennis,
    SportType.Snooker,
    SportType.IceHockey,
    SportType.Volleyball,
    SportType.BeachVolleyball,
    SportType.Badminton,
    SportType.TableTennis,
    SportType.Boxing,
    SportType.AmericanFootball,
    SportType.Dota2,
    SportType.CsGo,
    SportType.StarCraft,
    SportType.LeagueOfLegends,
];

export const SIMULATED_REALITY_LEAGUES: string[] = [
    'Simulated Reality League',
    'Simulated Reality Women',
    'International Youth',
    'International',
    'International Clubs',
    'Simulated Reality',
];

export const SPORT_REMAPPING: Map<string, string> = new Map([[SPORT_TYPE.esoccer, SPORT_TYPE.football]]);

export const getCookie = (name: string): string | null => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = (cookies[i] || '').trim();

        if (startsWith(cookie, nameEQ)) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }

    return null;
};

export const setCookie = (name: string, value: string | null | (string | null)[], days: number) => {
    const date = new Date();
    let expires = '';

    if (days) {
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

        expires = `; expires=${date.toUTCString()}`;
    }

    document.cookie = `${name}=${value || ''}${expires}; path=/`;
};
