import { SportType } from 'src/common/enums';
import type { Statistics } from 'src/common/types/statistics';

interface ScoreDisplayConfig {
    sports: SportType[];
    render: (stats: Statistics, t: (key: string, defaultText: string) => string) => string;
}

export const scoreDisplayFormats: ScoreDisplayConfig[] = [
    {
        sports: [
            SportType.AmericanFootball,
            SportType.Baseball,
            SportType.Basketball,
            SportType.Football,
            SportType.Futsal,
            SportType.Handball,
            SportType.IceHockey,
            SportType.RugbyLeague,
            SportType.RugbyUnion,
        ],
        render: (stats) => `${stats.score?.home}:${stats.score?.away}`,
    },
    {
        sports: [
            SportType.Tennis,
            SportType.TableTennis,
            SportType.Volleyball,
            SportType.BeachVolleyball,
            SportType.Badminton,
            SportType.Snooker,
        ],
        render: (stats, t) => {
            return `${t('event.score.sets', 'Sets')} ${stats['set-score']?.home}:${stats['set-score']?.away}`;
        },
    },
    {
        sports: [SportType.CsGo, SportType.LeagueOfLegends, SportType.Dota2, SportType.StarCraft],
        render: (stats, t) => `${t('event.score.sets', 'Sets')} ${stats.score?.home}:${stats.score?.away}`,
    },
];

export const phaseDetailsDisplayFormats: ScoreDisplayConfig[] = [
    {
        sports: [SportType.Tennis],
        render: (stats) => `${stats['game-score']?.home}:${stats['game-score']?.away}`,
    },
    {
        sports: [SportType.Volleyball, SportType.BeachVolleyball, SportType.TableTennis, SportType.Badminton],
        render: (stats) => `${stats['point-score']?.home}:${stats['point-score']?.away}`,
    },
];
