import { enGB, ko } from 'date-fns/locale';

import Corners from 'src/assets/statistics_icons/Corners.svg';
import RedCard from 'src/assets/statistics_icons/RedCard.svg';
import YellowCard from 'src/assets/statistics_icons/YellowCard.svg';
import { SportType } from 'src/common/enums';

import AMERICANFOOTBALL from './assets/backgrounds/blue/american_football.webp';
import ARCHERY from './assets/backgrounds/blue/archery.webp';
import ATHLETICS from './assets/backgrounds/blue/athletics.webp';
import BADMINTON from './assets/backgrounds/blue/badminton.webp';
import BASEBALL from './assets/backgrounds/blue/baseball.webp';
import BASKETBALL from './assets/backgrounds/blue/basketball.webp';
import BEACHVOLLEYBALL from './assets/backgrounds/blue/beach_volleyball.webp';
import BOXING from './assets/backgrounds/blue/boxing.webp';
import COMBATSPORTS from './assets/backgrounds/blue/combat.webp';
import CSGO from './assets/backgrounds/blue/csgo.webp';
import DARTS from './assets/backgrounds/blue/darts.webp';
import DOTA2 from './assets/backgrounds/blue/dota2.webp';
import FOOTBALL from './assets/backgrounds/blue/football.webp';
import FORMULAONE from './assets/backgrounds/blue/formula1.webp';
import FUTSAL from './assets/backgrounds/blue/futsal.webp';
import GOLF from './assets/backgrounds/blue/golf.webp';
import HANDBALL from './assets/backgrounds/blue/handball.webp';
import ICEHOCKEY from './assets/backgrounds/blue/ice_hockey.webp';
import LOL from './assets/backgrounds/blue/lol.webp';
import MOTORBIKES from './assets/backgrounds/blue/motorbikes.webp';
import OLYMPICGAMES from './assets/backgrounds/blue/olympics.webp';
import RUGBYLEAGUE from './assets/backgrounds/blue/rugby_league.webp';
import RUGBYUNION from './assets/backgrounds/blue/rugby_union.webp';
import SNOOKER from './assets/backgrounds/blue/snooker.webp';
import SPECIALS from './assets/backgrounds/blue/specials.webp';
import STARCRAFT from './assets/backgrounds/blue/starcraft.webp';
import TABLETENNIS from './assets/backgrounds/blue/table_tennis.webp';
import TAEKWONDO from './assets/backgrounds/blue/taekwondo.webp';
import TENNIS from './assets/backgrounds/blue/tennis.webp';
import VOLLEYBALL from './assets/backgrounds/blue/volleyball.webp';
import NEON_AMERICANFOOTBALL from './assets/backgrounds/neon/American-Football.webp';
import NEON_ARCHERY from './assets/backgrounds/neon/Archery.webp';
import NEON_ATHLETICS from './assets/backgrounds/neon/Athletics.webp';
import NEON_BADMINTON from './assets/backgrounds/neon/Badminton.webp';
import NEON_BASEBALL from './assets/backgrounds/neon/Baseball.webp';
import NEON_BASKETBALL from './assets/backgrounds/neon/Basketball.webp';
import NEON_BEACHVOLLEYBALL from './assets/backgrounds/neon/Beach-Volleyball.webp';
import NEON_BOXING from './assets/backgrounds/neon/Boxing.webp';
import NEON_COMBATSPORTS from './assets/backgrounds/neon/Combat.webp';
import NEON_CSGO from './assets/backgrounds/neon/CSGO.webp';
import NEON_DARTS from './assets/backgrounds/neon/Darts.webp';
import NEON_DOTA2 from './assets/backgrounds/neon/Dota2.webp';
import NEON_FOOTBALL from './assets/backgrounds/neon/Football.webp';
import NEON_FORMULAONE from './assets/backgrounds/neon/Formula-1.webp';
import NEON_FUTSAL from './assets/backgrounds/neon/Futsal.webp';
import NEON_GOLF from './assets/backgrounds/neon/Golf.webp';
import NEON_HANDBALL from './assets/backgrounds/neon/Handball.webp';
import NEON_ICEHOCKEY from './assets/backgrounds/neon/Ice-Hockey.webp';
import NEON_LOL from './assets/backgrounds/neon/League-of-Legends.webp';
import NEON_MOTORBIKES from './assets/backgrounds/neon/Motorbikes.webp';
import NEON_OLYMPICGAMES from './assets/backgrounds/neon/Olympics.webp';
import NEON_RUGBYLEAGUE from './assets/backgrounds/neon/Rugby-League.webp';
import NEON_RUGBYUNION from './assets/backgrounds/neon/Rugby-Union.webp';
import NEON_SNOOKER from './assets/backgrounds/neon/Snooker.webp';
import NEON_SPECIALS from './assets/backgrounds/neon/Specials.webp';
import NEON_STARCRAFT from './assets/backgrounds/neon/Starcraft.webp';
import NEON_TABLETENNIS from './assets/backgrounds/neon/Table-Tennis.webp';
import NEON_TAEKWONDO from './assets/backgrounds/neon/Taekwondo.webp';
import NEON_TENNIS from './assets/backgrounds/neon/Tennis.webp';
import NEON_VOLLEYBALL from './assets/backgrounds/neon/Volleyball.webp';

export const BLUE_SPORTS_BG: { [index: string]: string } = {
    AMERICANFOOTBALL,
    ARCHERY,
    ATHLETICS,
    BADMINTON,
    BASEBALL,
    BASKETBALL,
    BEACHVOLLEYBALL,
    BOXING,
    COMBATSPORTS,
    DARTS,
    FOOTBALL,
    FORMULAONE,
    FUTSAL,
    GOLF,
    HANDBALL,
    ICEHOCKEY,
    MOTORBIKES,
    OLYMPICGAMES,
    RUGBYLEAGUE,
    RUGBYUNION,
    SNOOKER,
    SPECIALS,
    TABLETENNIS,
    TAEKWONDO,
    TENNIS,
    VOLLEYBALL,
    LOL,
    CSGO,
    DOTA2,
    STARCRAFT,
};

export const NEON_SPORTS_BG: { [index: string]: string } = {
    AMERICANFOOTBALL: NEON_AMERICANFOOTBALL,
    ARCHERY: NEON_ARCHERY,
    ATHLETICS: NEON_ATHLETICS,
    BADMINTON: NEON_BADMINTON,
    BASEBALL: NEON_BASEBALL,
    BASKETBALL: NEON_BASKETBALL,
    BEACHVOLLEYBALL: NEON_BEACHVOLLEYBALL,
    BOXING: NEON_BOXING,
    COMBATSPORTS: NEON_COMBATSPORTS,
    DARTS: NEON_DARTS,
    FOOTBALL: NEON_FOOTBALL,
    FORMULAONE: NEON_FORMULAONE,
    FUTSAL: NEON_FUTSAL,
    GOLF: NEON_GOLF,
    HANDBALL: NEON_HANDBALL,
    ICEHOCKEY: NEON_ICEHOCKEY,
    MOTORBIKES: NEON_MOTORBIKES,
    OLYMPICGAMES: NEON_OLYMPICGAMES,
    RUGBYLEAGUE: NEON_RUGBYLEAGUE,
    RUGBYUNION: NEON_RUGBYUNION,
    SNOOKER: NEON_SNOOKER,
    SPECIALS: NEON_SPECIALS,
    TABLETENNIS: NEON_TABLETENNIS,
    TAEKWONDO: NEON_TAEKWONDO,
    TENNIS: NEON_TENNIS,
    VOLLEYBALL: NEON_VOLLEYBALL,
    LOL: NEON_LOL,
    CSGO: NEON_CSGO,
    DOTA2: NEON_DOTA2,
    STARCRAFT: NEON_STARCRAFT,
};

export const gradientHeaderColors = {
    blue: 'radial-gradient(229px 72px at top center,#3879D9,#214780)',
    teal: 'radial-gradient(229px 72px at top center,#2B5266,#093841)',
    grey: 'radial-gradient(229px 72px at top center,#6B6B6B,#3A3A3A)',
    green: 'radial-gradient(229px 72px at top center,#397300,#264D00)',
    'light-brown': 'radial-gradient(229px 72px at top center,#A67324,#704300)',
};

export enum StatisticType {
    CornerKicks = 'corner-kicks',
    RedCards = 'red-cards',
    YellowCards = 'yellow-cards',
    YellowRedCards = 'yellow-red-cards',
}

export const EVENT_STATISTICS_HOME_AWAY_INITIAL_CONFIG = {
    home: [
        {
            id: 1,
            type: StatisticType.RedCards,
            icon: RedCard,
            count: 0,
        },
        {
            id: 2,
            type: StatisticType.YellowCards,
            icon: YellowCard,
            count: 0,
        },
        {
            id: 3,
            type: StatisticType.CornerKicks,
            icon: Corners,
            count: 0,
        },
    ],
    away: [
        {
            id: 1,
            type: StatisticType.RedCards,
            icon: RedCard,
            count: 0,
        },
        {
            id: 2,
            type: StatisticType.YellowCards,
            icon: YellowCard,
            count: 0,
        },
        {
            id: 3,
            type: StatisticType.CornerKicks,
            icon: Corners,
            count: 0,
        },
    ],
};

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

export const basicScoreSports = [
    SportType.AmericanFootball,
    SportType.Basketball,
    SportType.Football,
    SportType.Futsal,
    SportType.Handball,
    SportType.IceHockey,
    SportType.RugbyLeague,
    SportType.RugbyUnion,
];

export const multiParticipantSports = [
    SportType.Archery,
    SportType.Athletics,
    SportType.Golf,
    SportType.FormulaOne,
    SportType.MotorBikes,
    SportType.OlympicGames,
    SportType.Taekwondo,
    SportType.Specials,
];

export const pointsScoreSports = [
    SportType.Tennis,
    SportType.TableTennis,
    SportType.Volleyball,
    SportType.BeachVolleyball,
    SportType.Badminton,
    SportType.Snooker,
    SportType.CsGo,
    SportType.LeagueOfLegends,
    SportType.Dota2,
    SportType.StarCraft,
];

export const individualSports = [SportType.Boxing, SportType.CombatSports, SportType.Darts];

export const langs = { ko: ko, en: enGB };

export const STAKE_INPUT_COMMAS_LENGTH = 2;
export const STAKE_INPUT_MAX_LENGTH = 9;
export const DEFAULT_STAKE = '5000';

export const SELECTIONS_IDENTIFIERS = {
    yes: 'Y',
    no: 'N',
};
