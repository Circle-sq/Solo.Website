import { SportType } from 'src/common/enums';

export const eSportIds = [SportType.Dota2, SportType.LeagueOfLegends, SportType.CsGo, SportType.StarCraft];

export const eSportsSportType = 'eSports';

export const twoRowStyleSports = [
    SportType.Volleyball,
    SportType.BeachVolleyball,
    SportType.Tennis,
    SportType.TableTennis,
    SportType.Darts,
    SportType.Snooker,
    SportType.Badminton,
    SportType.CsGo,
    SportType.LeagueOfLegends,
    SportType.Dota2,
    SportType.StarCraft,
];

export const asianViewExcludedSports: SportType[] = [
    SportType.Archery,
    SportType.Athletics,
    SportType.Golf,
    SportType.FormulaOne,
    SportType.MotorBikes,
    SportType.OlympicGames,
    SportType.Taekwondo,
];

export enum MarketTypeGeneric {
    ThreeWayWinner = 'threewaywinner',
    OverUnder = 'overunder',
    TwoWayHandicap = 'twowayhandicap',
}
