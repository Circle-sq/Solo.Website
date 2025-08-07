import { SportType } from 'src/common/enums';

export const MIN_DIGIT = 2;

export const SECS_IN_MIN = 60;

export const TWO_HOURS_IN_SECS = 7200;

export const sportsWithTimer: SportType[] = [
    SportType.Football,
    SportType.CsGo,
    SportType.LeagueOfLegends,
    SportType.Dota2,
    SportType.StarCraft,
];

export const sportsWithSimpleTimer: SportType[] = [
    SportType.Basketball,
    SportType.AmericanFootball,
    SportType.IceHockey,
    SportType.Volleyball,
    SportType.Badminton,
];
