import includes from 'lodash/includes';

import { SportType } from 'src/common/enums';

import type { GetTranslationFunc } from './types';

export const NUMBERS = Object.freeze({
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    perPage: 15,
    noSuchIndex: -1,
    max: 99999,
    selectionsMaxRow: 7,
    hundred: 100,
    thousand: 1000,
    oneZeroOne: 1.01,
} as const);

export const DASH = '-';

export const EMPTY_STRING = '';

export const DEFAULT_DECIMAL = 2;

export const MARKET_TABS_GOALSCORER = Object.freeze({
    singleGoal: 'singleGoal',
    multipleGoals: 'multipleGoals',
});

export const MARKETS_DISPLAY_ORDER = Object.freeze({
    displayOrderDefault: '-',
});

export const STORAGE_KEYS = Object.freeze({
    gameId: 'gameId',
    platformId: 'platformId',
    token: 'token',
    tokenExpireDate: 'token_expireDate',
    refreshToken: 'refresh_token',
    refreshTokenExpireDate: 'refresh_token_expireDate',
    seenNotifications: 'seenNotifications',
} as const);

export const REQUEST_STATUS = Object.freeze({
    IN_PROGRESS: 'IN_PROGRESS',
    PROGRESS: 'PROGRESS',
    ERROR: 'ERROR',
    READY: 'READY',
} as const);

export const DATE_FORMAT = Object.freeze({
    LITERAL_DAY: 'E', // Mon
    LITERAL_FULL_MONTH: 'MMM', // May
    LITERAL_DAY_MONTH: 'dd MMM', // 25 May
    LITERAL_DAY_MONTH_FULL_TIME: 'dd MMM HH:mm:ss', // 25 May 15:20:45
    LITERAL_DAY_TIME_PERIOD: 'EEE h:mma', // Thu 5:21PM
    LITERAL_WEEKDAY_MONTHDAY_MONTH: 'EEE, dd MMM', // Thu, 25 May
    LITERAL_FULL_DATE: 'MMMM do yyyy', // May 25th 2023
    NUMERIC_FULL_TIME: 'HH:mm', // 15:20
    NUMERIC_DAY_MONTH: 'dd.MM', // 25.05
    NUMERIC_FULL_DATE: 'yyyy.MM.dd', // 2023.05.25
    NUMERIC_DATE: 'yyyy-MM-dd', // 2023-05-25
    NUMERIC_FULL_DATE_TIME_W_SEPARATOR: 'yyyy.MM.dd | HH:mm', // 2023.05.25 | 15:20
    NUMERIC_DAY_MONTH_SHORT_TIME: 'MM.dd HH:mm', // 25.05 15:20
    NUMERIC_FULL_DATE_AND_TIME: 'yyyy.MM.dd HH:mm', // 2023.05.25 15:20
    NUMERIC_FULL_DATE_AND_FULL_TIME: 'yyyy.MM.dd HH:mm:ss', // 2023.05.25 15:20:45
    FULL_NUMERIC_WITH_TIMEZONE_DIFF: 'yyyy.MM.dd HH:mm:ssXXX', // 2023.05.25 13:20:45+03:00
    TIMESTAMP: "yyyy-MM-dd'T'HH:mm:ss", // 2023-05-25T23:00:00
} as const);

export const REQUEST_ASYNC_STATUS = Object.freeze({
    start: 'start',
    end: 'end',
} as const);

export const EVENTS_COLLECTIONS = Object.freeze({
    highlightCarousel: 'highlight-carousel',
    search: 'search',
    onLater: 'on-later',
} as const);

export const SELECTIONS_IDENTIFIERS = {
    home: 'H',
    away: 'A',
    draw: 'D',
    over: 'O',
    under: 'U',
    goal: 'G',
    yes: 'Y',
    no: 'N',
    spread: 'spread',
    moneyLine: 'money-line',
    total: 'total',
};

const valuesInFrontOfOverUnder = {
    games: 'Games',
    points: 'Points',
};

export const getSelectionIdentifierLabel = (
    getTranslation: GetTranslationFunc,
    sportId: string,
): Record<string, string> => {
    const passSport = (label: string, sportId: string): string => `${label}.${sportId}`;

    const getValuesInFrontOfOverUnder = (sportId: string): string => {
        if (SPORTS_WITH_TOURNAMENTS.includes(sportId)) {
            return valuesInFrontOfOverUnder.games;
        }

        if (SPORTS_WITH_POINTS.includes(sportId)) {
            return valuesInFrontOfOverUnder.points;
        }

        return '';
    };

    const fallbackTranslation = (
        getTranslation: GetTranslationFunc,
        label: string,
        sportId: string,
        defaultTranslation: string,
    ): string => {
        const defaultText = label === 'selection.identifier.goals' ? getValuesInFrontOfOverUnder(sportId) : '';
        const tryTranslationBySport = getTranslation(passSport(label, sportId), defaultText);

        return tryTranslationBySport === '' ? getTranslation(label, defaultTranslation) : tryTranslationBySport;
    };

    return Object.freeze({
        H: fallbackTranslation(getTranslation, 'selection.identifier.home', sportId, '1'),
        A: fallbackTranslation(getTranslation, 'selection.identifier.away', sportId, '2'),
        D: fallbackTranslation(getTranslation, 'selection.identifier.draw', sportId, 'X'),
        U: fallbackTranslation(getTranslation, 'selection.identifier.under', sportId, 'Under'),
        O: fallbackTranslation(getTranslation, 'selection.identifier.over', sportId, 'Over'),
        G: fallbackTranslation(getTranslation, 'selection.identifier.goals', sportId, 'Goals'),
        HD: fallbackTranslation(getTranslation, 'selection.identifier.hd', sportId, '1 or X'),
        DA: fallbackTranslation(getTranslation, 'selection.identifier.da', sportId, 'X or 2'),
        HA: fallbackTranslation(getTranslation, 'selection.identifier.ha', sportId, '1 or 2'),
        [SELECTIONS_IDENTIFIERS.yes]: fallbackTranslation(getTranslation, 'selection.identifier.yes', sportId, 'Y'),
        [SELECTIONS_IDENTIFIERS.no]: fallbackTranslation(getTranslation, 'selection.identifier.no', sportId, 'N'),
        [SELECTIONS_IDENTIFIERS.moneyLine]: fallbackTranslation(
            getTranslation,
            'selection.identifier.money.line',
            sportId,
            'Money Line',
        ),
        [SELECTIONS_IDENTIFIERS.spread]: fallbackTranslation(
            getTranslation,
            'selection.identifier.spread',
            sportId,
            'Spread',
        ),
        [SELECTIONS_IDENTIFIERS.total]: fallbackTranslation(
            getTranslation,
            'selection.identifier.total',
            sportId,
            'Total',
        ),
    });
};

export const getWeekdayLabel = (getTranslation: GetTranslationFunc): Record<string, string> => {
    return Object.freeze({
        sunday: getTranslation('events.weekday.sunday', 'sunday'),
        monday: getTranslation('events.weekday.monday', 'monday'),
        tuesday: getTranslation('events.weekday.tuesday', 'tuesday'),
        wednesday: getTranslation('events.weekday.wednesday', 'wednesday'),
        thursday: getTranslation('events.weekday.thursday', 'thursday'),
        friday: getTranslation('events.weekday.friday', 'friday'),
        saturday: getTranslation('events.weekday.saturday', 'saturday'),
    });
};

export const MODAL_ROUTE_NAME = Object.freeze({
    groupedSports: 'grouped-sports',
    liveGroupedSports: 'live-grouped-sports',
    liveGroupedSportsTennisTour: 'live-grouped-sports-tennis-tour',
    betfinder: 'betfinder',
    myBets: 'my-bets',
    betslip: 'betslip',
} as const);

export const PAGE_ROUTE_NAME = Object.freeze({
    sport: 'sport',
    country: 'country',
    competition: 'competition',
    inplay: 'inplay',
    event: 'event',
    betting: 'betting',
    liveStream: 'live-stream',
    allcountries: 'allcountries',
    homepage: 'homepage',
    azSports: 'az-sports',
    myBets: 'my-bets',
    asianview: 'asian-view',
});

export const EVENT_FILTERS = Object.freeze({
    day: 'day',
    sport: 'sport',
    competition: 'competition',
    time: 'time',
    region: 'region',
    country: 'country',
    market: 'market',
});

export const SPORT_BOOK_MESSAGES = Object.freeze({
    ready: `sportbook_ready`,
    render_done: 'sportbook_render_done',
    login: `sportbook_login`,
    relogin: `sportbook_relogin`,
    sessionExpired: `sportbook_session_expired`,
    logout: `sportbook_logout`,
    error: `sportbook_error`,
    configurations: `sportbook_configurations`,
    url: `sportbook_url`,
    set_url: `sportbook_set_url`,
    set_theme: `sportbook_set_theme`,
    set_guest_currency: 'sportbook_set_guest_currency',
    balance_update: `sportbook_balance_update`,
    height_update: `sportbook_height_update`,
    betslip_update: `sportbook_betslip_update`,
    open_betslip: `sportbook_open_betslip`,
    open_my_bets: `sportbook_open_my_bets`,
    closed_popup: `sportsbook_popup_closed`,
    message_box_popup: `sportsbook_message_box_popup`,
    internalError: 'sb_error',
} as const);

export const NAV_IDS = Object.freeze({
    sportsCountries: 'sports-countries',
} as const);

export const TEAM_IDENTIFIER = {
    home: 'home',
    away: 'away',
};

export const MARKET_TEMPLATE = Object.freeze({
    default: '-',
    oneColumn: 'one-column',
    twoColumn: 'two-column',
    homeAway: 'home-away',
    halfFullTime: 'half-full-time',
    threeColumn: 'three-column',
    homeDrawAway: 'home-draw-away',
    gamelines: 'gamelines',
    goalscorer: 'goalscorer',
    correctscore: 'correctscore',
    overunder: 'overunder',
    threeWayHandicap: 'threewayhandicap',
    twoWayHandicap: 'twowayhandicap',
    asianOverUnder: 'asianoverunder',
    asianHandicap: 'asianhandicap',
    twoWayWinner: 'twowaywinner',
    threeWayWinner: 'threewaywinner',
    spread: 'spread',
    simple: 'simple',
} as const);

export const MARKET_TEMPLATE_GROUP = Object.freeze({
    gameLines: 'Game Lines',
    spread: 'handicap',
    totals: 'Totals',
    total: 'Total',
    totals_KO: '오버언더',
});

export const SPORT_TYPE = Object.freeze({
    football: 'football',
    baseball: 'baseball',
    basketball: 'basketball',
    tennis: 'tennis',
    americanfootball: 'americanfootball',
    archery: 'archery',
    athletics: 'athletics',
    icehockey: 'icehockey',
    volleyball: 'volleyball',
    snooker: 'snooker',
    handball: 'handball',
    tabletennis: 'tabletennis',
    taekwondo: 'taekwondo',
    darts: 'darts',
    golf: 'golf',
    betlinkgolf: 'betlinkgolf',
    horseracing: 'horseracing',
    badminton: 'badminton',
    beachvolleyball: 'beachvolleyball',
    boxing: 'boxing',
    combatsports: 'combatsports',
    formulaone: 'formulaone',
    futsal: 'futsal',
    motorbikes: 'motorbikes',
    rugbyleague: 'rugbyleague',
    rugbyunion: 'rugbyunion',
    specials: 'specials',
    olympicgames: 'olympicgames',
    cricket: 'cricket',
    csgo: 'csgo',
    lol: 'lol',
    dota2: 'dota2',
    starcraft: 'starcraft',
    esoccer: 'esoccer',
} as const);

export const LANGUAGES = Object.freeze({
    ko: 'ko',
    en: 'en',
    ja: 'ja',
    korean: 'ko-KR',
    english: 'en-US',
    englishGB: 'en-GB',
    japanese: 'ja-JP',
    chinese: 'zh-CN',
} as const);

export const LANGUAGE_SHORTCUTS: Record<string, string> = {
    [LANGUAGES.ko]: LANGUAGES.korean,
    [LANGUAGES.en]: LANGUAGES.english,
    [LANGUAGES.ja]: LANGUAGES.japanese,
    default: LANGUAGES.english,
} as const;

export const shortLocale: Record<string, string> = {
    [LANGUAGES.english]: LANGUAGES.en,
    [LANGUAGES.englishGB]: LANGUAGES.en,
    [LANGUAGES.korean]: LANGUAGES.ko,
    [LANGUAGES.japanese]: LANGUAGES.ja,
    default: LANGUAGES.en,
} as const;

export const COMPETITIONS_TABS = Object.freeze({
    matches: 'matches',
    outright: 'outright',
    specials: 'specials',
} as const);

export const EVENT_MEDIA_TYPE = Object.freeze({
    stream: 'stream',
    videoStream: 'video',
    liveMatchTracker: 'stats-field',
    statistics: 'stats-info',
});

export const LHN_SPORTS_ORDER = Object.freeze({
    WRL: 'WRL',
    KOR: 'KOR',
} as const);

export const MARKET_TEMPLATES_SETTINGS = Object.freeze({
    rowsDisplayLimit: {
        default: 3,
        outright: 3,
    },
    rowsDisplayed: {
        two: 2,
        three: 3,
    },
    columns: {
        one: [MARKET_TEMPLATE.default, MARKET_TEMPLATE.oneColumn],
        two: [MARKET_TEMPLATE.twoColumn, MARKET_TEMPLATE.homeAway, MARKET_TEMPLATE.halfFullTime],
        three: [MARKET_TEMPLATE.threeColumn, MARKET_TEMPLATE.homeDrawAway, MARKET_TEMPLATE.goalscorer],
    } as { [key: string]: Partial<(typeof MARKET_TEMPLATE)[keyof typeof MARKET_TEMPLATE]>[] },
});

export const NA = 'N/A';

export const NON_LIVE_PERIODS = [
    'Not started',
    'The match has been abandoned',
    'The match has been interrupted',
    'The match has ended',
    'Not started yet',
    'Ended',
];

export const MARKET_TABS_PERIODS = Object.freeze({
    regularPlay: 'Regular play',
    includingOvertime: 'Including overtime',
    includingOvertimeAndPenalty: 'Including overtime and penalty',
    includingExtraInnings: 'Including extra innings',
    overtime: 'Overtime',
    firstHalf: '1st half',
    overtimeFirstHalf: 'Overtime 1st half',
    secondHalf: '2nd half',
    secondHalfIncludingOvertime: '2nd half including overtime',
    inningsOneToFive: 'Innings 1 to 5',
    inningsSevenToNine: 'Innings 7 to 9',
    penaltyShootout: 'Penalty shootout',
    firstSetTiebreak: '1st set tiebreak',
    secondSetTiebreak: '2nd set tiebreak',
    thirdSetTiebreak: '3rd set tiebreak',
    forthSetTiebreak: '4th set tiebreak',
    fifthSetTiebreak: '5th set tiebreak',
    firstQuarter: '1st quarter',
    secondQuarter: '2nd quarter',
    thirdQuarter: '3rd quarter',
    fourthQuarter: '4th quarter',
    firstQuarterIncludingOvertime: '1st quarter including overtime',
    secondQuarterIncludingOvertime: '2nd quarter including overtime',
    thirdQuarterIncludingOvertime: '3rd quarter including overtime',
    fourthQuarterIncludingOvertime: '4th quarter including overtime',
    firstPeriod: '1st period',
    secondPeriod: '2nd period',
    thirdPeriod: '3rd period',
    firstInning: '1st inning',
    secondInning: '2nd inning',
    thirdInning: '3rd inning',
    fourthInning: '4th inning',
    fifthInning: '5th inning',
    sixthInning: '6th inning',
    seventhInning: '7th inning',
    eighthInning: '8th inning',
    ninthInning: '9th inning',
    firstFrame: '1st frame',
    secondFrame: '2nd frame',
    thirdFrame: '3rd frame',
    fourthFrame: '4th frame',
    fifthFrame: '5th frame',
    sixthFrame: '6th frame',
    seventhFrame: '7th frame',
    eighthFrame: '8th frame',
    ninthFrame: '9th frame',
    tenthFrame: '10th frame',
    eleventhFrame: '11th frame',
    twelfthFrame: '12th frame',
    thirteenthFrame: '13th frame',
    fourteenthFrame: '14th frame',
    fifteenthFrame: '15th frame',
    sixteenthFrame: '16th frame',
    seventeenthFrame: '17th frame',
    eighteenthFrame: '18th frame',
    nineteenthFrame: '19th frame',
    twentiethFrame: '20th frame',
    twentyfirstFrame: '21st frame',
    twentysecondFrame: '22nd frame',
    twentythirdFrame: '23rd frame',
    twentyfourthFrame: '24th frame',
    twentyfifthFrame: '25th frame',
    twentysixsthFrame: '26th frame',
    twentyseventhFrame: '27th frame',
    twentyeighthFrame: '28th frame',
    twentyninthFrame: '29th frame',
    thirtiethFrame: '30th frame',
    thirtyfirstFrame: '31st frame',
    thirtysecondFrame: '32nd frame',
    thirtythirdFrame: '33rd frame',
    thirtyfourthFrame: '34th frame',
    thirtyfifthFrame: '35th frame',
    firstInnings: '1st innings',
    secondInnings: '2nd innings',
    thirdInnings: '3rd innings',
    fourthInnings: '4th innings',
    fifthInnings: '5th innings',
    sixthInnings: '6th innings',
    seventhInnings: '7th innings',
    eighthInnings: '8th innings',
    ninthInnings: '9th innings',
    firstSet: '1st set',
    secondSet: '2nd set',
    thirdSet: '3rd set',
    fourthSet: '4th set',
    fifthSet: '5th set',
    sixthSet: '6th set',
    seventhSet: '7th set',
    eighthSet: '8th set',
    ninthSet: '9th set',
    tenthSet: '10th set',
    eleventhSet: '11th set',
    twelfthSet: '12th set',
    thirteenthSet: '13th set',
    oneMinute: '1 minute',
    fiveMinutes: '5 minutes',
    tenMinutes: '10 minutes',
    fifteenMinutes: '15 minutes',
});

export const MATCH_PERIOD = Object.freeze({
    endOfThirdQuarter: 'End of 3rd quarter',
    penalties: 'Penalties',
    postponed: 'Postponed',
    startingSoon: 'Not started yet',
    firstHalf: '1st half',
    halftime: 'Halftime',
    secondHalf: '2nd half',
    finished: 'Finished',
    extraTimeToStart: 'Extra time to start',
    firstHalfExtraTime: '1st extra',
    extraTimeHalftime: 'Extra time halftime',
    secondHalfExtraTime: '2nd extra',
    penaltyShootoutStartingSoon: 'Penalty shootout starting soon',
    penaltyShootOut: 'Penalty shoot out',
    interrupted: 'Interrupted',
    abandoned: 'Abandoned',
    suspended: 'Suspended',
    firstPeriod: '1st period',
    secondPeriod: '2nd period',
    firstQuarter: '1st quarter',
    secondQuarter: '2nd quarter',
    thirdQuarter: '3rd quarter',
    fourthQuarter: '4th quarter',
    overtimeStartingSoon: 'Overtime starting soon',
    overtime: 'Overtime',
    ended: 'Ended',
    sixthBreak: 'Sixth break',
    fifthBreak: 'Fifth break',
    fourthBreak: 'Fourth break',
    thirdBreak: 'Third break',
    secondBreak: 'Second break',
    firstBreak: 'First break',
    firstInningTop: '1st inning top',
    secondInningTop: '2nd inning top',
    thirdInningTop: '3rd inning top',
    fourthInningTop: '4th inning top',
    fifthInningTop: '5th inning top',
    sixthInningTop: '6th inning top',
    seventhInningTop: '7th inning top',
    eighthInningTop: '8th inning top',
    ninthInningTop: '9th inning top',
    firstInningBottom: '1st inning bottom',
    secondInningBottom: '2nd inning bottom',
    thirdInningBottom: '3rd inning bottom',
    fourthInningBottom: '4th inning bottom',
    fifthInningBottom: '5th inning bottom',
    sixthInningBottom: '6th inning bottom',
    seventhInningBottom: '7th inning bottom',
    eighthInningBottom: '8th inning bottom',
    ninthInningBottom: '9th inning bottom',
    extraInningTop: 'Extra inning top',
    extraInningBottom: 'Extra inning bottom',
    breakTopFirstBottomFirst: 'Break top 1 bottom 1',
    breakTopSecondBottomFirst: 'Break top 2 bottom 1',
    breakTopSecondBottomSecond: 'Break top 2 bottom 2',
    breakTopThirdBottomSecond: 'Break top 3 bottom 2',
    breakTopThirdBottomThird: 'Break top 3 bottom 3',
    breakTopFourthBottomThird: 'Break top 4 bottom 3',
    breakTopFourthBottomFourth: 'Break top 4 bottom 4',
    breakTopFifthBottomFourth: 'Break top 5 bottom 4',
    breakTopFifthBottomFifth: 'Break top 5 bottom 5',
    breakTopSixthBottomFifth: 'Break top 6 bottom 5',
    breakTopSixthBottomSixth: 'Break top 6 bottom 6',
    breakTopSeventhBottomSixth: 'Break top 7 bottom 6',
    breakTopSeventhBottomSeventh: 'Break top 7 bottom 7',
    breakTopEighthBottomSeventh: 'Break top 8 bottom 7',
    breakTopEighthBottomEighth: 'Break top 8 bottom 8',
    breakTopNinthBottomEighth: 'Break top 9 bottom 8',
    breakTopNinthBottomNinth: 'Break top 9 bottom 9',
    breakTopEIBottomNinth: 'Break top EI bottom 9',
    breakTopEIBottomEI: 'Break top EI bottom EI',
    breakTopEIBottomSeventh: 'Break top EI bottom 7',
    firstSet: '1st set',
    secondSet: '2nd set',
    thirdSet: '3rd set',
    fourthSet: '4th set',
    fifthSet: '5th set',
    firstGame: '1st game',
    secondGame: '2nd game',
    thirdGame: '3rd game',
    fourthGame: '4th game',
    fifthGame: '5th game',
    retired: 'Retired',
    startDelayed: 'Start delayed',
    walkoverPlayerFirstWon: 'Walkover, player 1 won',
    walkoverPlayerSecondWon: 'Walkover, player 2 won',
    playerFirstRetiredPlayerSecondWon: 'Player 1 retired, player 2 won',
    playerSecondRetiredPlayerFirstWon: 'Player 2 retired, player 1 won',
    sixthSet: '6th set',
    seventhSet: '7th set',
    goldenSet: 'Golden set',
    awaitingExtraTime: 'Awaiting extra time',
    awaitingGoldenSet: 'Awaiting golden set',
    afterGoldenSet: 'After golden set',
    thirdPeriod: '3rd period',
    break: 'Break',
    inProgress: 'In progress',
    playerSecondDefaultedPlayerFirstWon: 'Player 2 defaulted, player 1 won',
    playerFirstDefaultedPlayerSecondWon: 'Player 1 defaulted, player 2 won',
});

export const COMPETITION_ICON = 'CupIcon';

export enum MarketGroupNames {
    Multiscores = 'Multiscores',
}

export const TAGS = Object.freeze({
    TennisTour: 'tennis-tour',
    TennisTourLabel: 'tennis-tour-label',
    Country: 'country',
    CountryLabel: 'country-label',
    Category: 'category',
    CategoryLabel: 'category-label',
    OriginalSport: 'original-sport',
});

export const SPORTS_WITH_TENNIS_TOUR: string[] = [SPORT_TYPE.tennis];

export const SPORTS_WITH_CATEGORY: string[] = [SPORT_TYPE.csgo, SPORT_TYPE.lol, SPORT_TYPE.dota2, SPORT_TYPE.starcraft];

export const SPORTS_WITH_TOURNAMENTS: string[] = [
    SPORT_TYPE.tennis,
    SPORT_TYPE.csgo,
    SPORT_TYPE.lol,
    SPORT_TYPE.dota2,
    SPORT_TYPE.starcraft,
];

export const SPORTS_WITH_POINTS: string[] = [
    SPORT_TYPE.volleyball,
    SPORT_TYPE.beachvolleyball,
    SPORT_TYPE.tabletennis,
    SPORT_TYPE.badminton,
    SPORT_TYPE.snooker,
    SPORT_TYPE.darts,
    SPORT_TYPE.rugbyleague,
    SPORT_TYPE.rugbyunion,
];

export const E_SPORTS: string[] = [SPORT_TYPE.csgo, SPORT_TYPE.lol, SPORT_TYPE.dota2, SPORT_TYPE.starcraft];

export const isESports = (sport: string | typeof SPORT_TYPE | undefined): boolean => includes(E_SPORTS, sport);

export const LOAD_MORE_THRESHOLD = 0.8;

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

export const SECONDS_IN_MINUTE = 60;

export const TICK_INTERVAL = 1000;

export const BAB_ICON_SIZES = {
    xs: { width: 22.5, height: 12 },
    sm: { width: 30, height: 16 },
};

export const DEFAULT_EXTERNAL_LINK_WINDOW_WIDTH = 1024;
export const DEFAULT_EXTERNAL_LINK_WINDOW_HEIGHT = 750;
