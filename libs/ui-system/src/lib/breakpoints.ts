import type { DynamicContainers } from './themed';

export enum BreakPoints {
    phone = 500,
    phoneLandscape = 680,
    smallTablet = 768,
    tablet = 960,
    desktop = 1280,
}

export const breakpoints = Object.freeze({
    bp1920: '1920px',
    bp1600: '1600px',
    bp1570: '1570px',
    bp1536: '1536px',
    bp1498: '1498px',
    bp1440: '1440px',
    bp1366: '1366px',
    bp1132: '1132px',
    bp1280: '1280px',
    bp1279max: '1279.98px',
    bp1279: '1279px',
    bp1149: '1149px',
    bp1120: '1120px',
    bp1100: '1100px',
    bp1055: '1055px',
    bp961: '961px',
    bp960: '960px',
    bp959max: '959.98px',
    bp896: '896px',
    bp850: '850px',
    bp845: '845px',
    bp768: '768px',
    bp680: '680px',
    bp600: '600px',
    bp500: '500px',
    bp420: '420px',
    bp360: '360px',
} as const);

export const dynamicSelections = Object.freeze({
    regular: {
        bp1920: { width: 48, height: 56 },
        bp1570: { width: 48, height: 56 },
        bp1536: { width: 48, height: 56 },
        bp1440: { width: 48, height: 56 },
        bp1366: { width: 48, height: 56 },
        bp1280: { width: 48, height: 56 },
        bp1279: { width: 48, height: 56 },
        bp1100: { width: 48, height: 56 },
        bp960: { width: 48, height: 56 },
        bp896: { width: 48, height: 56 },
        bp850: { width: 48, height: 56 },
        bp768: { width: 48, height: 56 },
        bp680: { width: 48, height: 56 },
        bp500: { width: 40, height: 62 },
        gap: 8,
    },
    american: {
        bp1920: { width: 106, height: 40 },
        bp1570: { width: 106, height: 40 },
        bp1536: { width: 106, height: 40 },
        bp1440: { width: 48, height: 40 },
        bp1366: { width: 48, height: 40 },
        bp1280: { width: 106, height: 40 },
        bp1279: { width: 106, height: 40 },
        bp1100: { width: 106, height: 40 },
        bp960: { width: 106, height: 40 },
        bp896: { width: 106, height: 40 },
        bp850: { width: 106, height: 40 },
        bp768: { width: 106, height: 40 },
        bp680: { width: 48, height: 40 },
        bp500: { width: 40, height: 48 },
        gap: 8,
    },
    scoreboard: {
        bp1920: { width: 48, height: 56 },
        bp1570: { width: 48, height: 56 },
        bp1536: { width: 48, height: 56 },
        bp1440: { width: 48, height: 56 },
        bp1366: { width: 48, height: 56 },
        bp1280: { width: 40, height: 56 },
        bp1279: { width: 48, height: 56 },
        bp1100: { width: 48, height: 56 },
        bp960: { width: 48, height: 56 },
        bp896: { width: 48, height: 56 },
        bp850: { width: 48, height: 56 },
        bp768: { width: 48, height: 56 },
        bp680: { width: 48, height: 56 },
        bp500: { width: 40, height: 62 },
        gap: 8,
    },
});

const COLUMN_COUNT = {
    SINGLE: 1,
    DOUBLE: 2,
    TRIPLE: 3,
};

export const dynamicContainers: DynamicContainers = Object.freeze({
    regular: {
        bp1920: {
            gap: 16,
            1: dynamicSelections.regular.bp1920.width,
            2: dynamicSelections.regular.bp1920.width * COLUMN_COUNT.DOUBLE + dynamicSelections.regular.gap,
            3:
                dynamicSelections.regular.bp1920.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.regular.gap * COLUMN_COUNT.DOUBLE,
        },
        bp1570: {
            gap: 16,
            1: dynamicSelections.regular.bp1570.width,
            2: dynamicSelections.regular.bp1570.width * COLUMN_COUNT.DOUBLE + dynamicSelections.regular.gap,
            3:
                dynamicSelections.regular.bp1570.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.regular.gap * COLUMN_COUNT.DOUBLE,
        },
        bp1536: {
            gap: 16,
            1: dynamicSelections.regular.bp1536.width,
            2: dynamicSelections.regular.bp1536.width * COLUMN_COUNT.DOUBLE + dynamicSelections.regular.gap,
            3:
                dynamicSelections.regular.bp1536.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.regular.gap * COLUMN_COUNT.DOUBLE,
        },
        bp1440: {
            gap: 16,
            1: dynamicSelections.regular.bp1440.width,
            2: dynamicSelections.regular.bp1440.width * COLUMN_COUNT.DOUBLE + dynamicSelections.regular.gap,
            3:
                dynamicSelections.regular.bp1440.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.regular.gap * COLUMN_COUNT.DOUBLE,
        },
        bp1366: {
            gap: 16,
            1: dynamicSelections.regular.bp1366.width,
            2: dynamicSelections.regular.bp1366.width * COLUMN_COUNT.DOUBLE + dynamicSelections.regular.gap,
            3:
                dynamicSelections.regular.bp1366.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.regular.gap * COLUMN_COUNT.DOUBLE,
        },
        bp1280: {
            gap: 16,
            1: dynamicSelections.regular.bp1280.width,
            2: dynamicSelections.regular.bp1280.width * COLUMN_COUNT.DOUBLE + dynamicSelections.regular.gap,
            3:
                dynamicSelections.regular.bp1280.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.regular.gap * COLUMN_COUNT.DOUBLE,
        },
        bp1279: {
            gap: 16,
            1: dynamicSelections.regular.bp1279.width,
            2: dynamicSelections.regular.bp1279.width * COLUMN_COUNT.DOUBLE + dynamicSelections.regular.gap,
            3:
                dynamicSelections.regular.bp1279.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.regular.gap * COLUMN_COUNT.DOUBLE,
        },
        bp1100: {
            gap: 16,
            1: dynamicSelections.regular.bp1100.width,
            2: dynamicSelections.regular.bp1100.width * COLUMN_COUNT.DOUBLE + dynamicSelections.regular.gap,
            3:
                dynamicSelections.regular.bp1100.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.regular.gap * COLUMN_COUNT.DOUBLE,
        },
        bp960: {
            gap: 16,
            1: dynamicSelections.regular.bp960.width,
            2: dynamicSelections.regular.bp960.width * COLUMN_COUNT.DOUBLE + dynamicSelections.regular.gap,
            3:
                dynamicSelections.regular.bp960.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.regular.gap * COLUMN_COUNT.DOUBLE,
        },
        bp896: {
            gap: 16,
            1: dynamicSelections.regular.bp896.width,
            2: dynamicSelections.regular.bp896.width * COLUMN_COUNT.DOUBLE + dynamicSelections.regular.gap,
            3:
                dynamicSelections.regular.bp896.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.regular.gap * COLUMN_COUNT.DOUBLE,
        },
        bp850: {
            gap: 16,
            1: dynamicSelections.regular.bp850.width,
            2: dynamicSelections.regular.bp850.width * COLUMN_COUNT.DOUBLE + dynamicSelections.regular.gap,
            3:
                dynamicSelections.regular.bp850.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.regular.gap * COLUMN_COUNT.DOUBLE,
        },
        bp768: {
            gap: 16,
            1: dynamicSelections.regular.bp768.width,
            2: dynamicSelections.regular.bp768.width * COLUMN_COUNT.DOUBLE + dynamicSelections.regular.gap,
            3:
                dynamicSelections.regular.bp768.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.regular.gap * COLUMN_COUNT.DOUBLE,
        },
        bp680: {
            gap: 0,
            1: dynamicSelections.regular.bp680.width,
            2: dynamicSelections.regular.bp680.width * COLUMN_COUNT.DOUBLE + dynamicSelections.regular.gap,
            3:
                dynamicSelections.regular.bp680.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.regular.gap * COLUMN_COUNT.DOUBLE,
        },
        bp500: {
            gap: 0,
            1: dynamicSelections.regular.bp500.width,
            2: dynamicSelections.regular.bp500.width * COLUMN_COUNT.DOUBLE + dynamicSelections.regular.gap,
            3:
                dynamicSelections.regular.bp500.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.regular.gap * COLUMN_COUNT.DOUBLE,
        },
    },
    american: {
        bp1920:
            dynamicSelections.american.bp1920.width * COLUMN_COUNT.TRIPLE +
            dynamicSelections.american.gap * COLUMN_COUNT.DOUBLE,
        bp1570:
            dynamicSelections.american.bp1570.width * COLUMN_COUNT.TRIPLE +
            dynamicSelections.american.gap * COLUMN_COUNT.DOUBLE,
        bp1536:
            dynamicSelections.american.bp1536.width * COLUMN_COUNT.TRIPLE +
            dynamicSelections.american.gap * COLUMN_COUNT.DOUBLE,
        bp1440:
            dynamicSelections.american.bp1440.width * COLUMN_COUNT.TRIPLE +
            dynamicSelections.american.gap * COLUMN_COUNT.DOUBLE,
        bp1366:
            dynamicSelections.american.bp1366.width * COLUMN_COUNT.TRIPLE +
            dynamicSelections.american.gap * COLUMN_COUNT.DOUBLE,
        bp1280:
            dynamicSelections.american.bp1280.width * COLUMN_COUNT.TRIPLE +
            dynamicSelections.american.gap * COLUMN_COUNT.DOUBLE,
        bp1279:
            dynamicSelections.american.bp1279.width * COLUMN_COUNT.TRIPLE +
            dynamicSelections.american.gap * COLUMN_COUNT.DOUBLE,
        bp1100:
            dynamicSelections.american.bp1100.width * COLUMN_COUNT.TRIPLE +
            dynamicSelections.american.gap * COLUMN_COUNT.DOUBLE,
        bp960:
            dynamicSelections.american.bp960.width * COLUMN_COUNT.TRIPLE +
            dynamicSelections.american.gap * COLUMN_COUNT.DOUBLE,
        bp896:
            dynamicSelections.american.bp896.width * COLUMN_COUNT.TRIPLE +
            dynamicSelections.american.gap * COLUMN_COUNT.DOUBLE,
        bp850:
            dynamicSelections.american.bp850.width * COLUMN_COUNT.TRIPLE +
            dynamicSelections.american.gap * COLUMN_COUNT.DOUBLE,
        bp768:
            dynamicSelections.american.bp768.width * COLUMN_COUNT.TRIPLE +
            dynamicSelections.american.gap * COLUMN_COUNT.DOUBLE,
        bp680:
            dynamicSelections.american.bp680.width * COLUMN_COUNT.TRIPLE +
            dynamicSelections.american.gap * COLUMN_COUNT.DOUBLE,
        bp500:
            dynamicSelections.american.bp500.width * COLUMN_COUNT.TRIPLE +
            dynamicSelections.american.gap * COLUMN_COUNT.DOUBLE,
    },
    scoreboard: {
        bp1920: {
            gap: 16,
            1: dynamicSelections.scoreboard.bp1920.width,
            2: dynamicSelections.scoreboard.bp1920.width * COLUMN_COUNT.DOUBLE + dynamicSelections.scoreboard.gap,
            3:
                dynamicSelections.scoreboard.bp1920.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.scoreboard.gap * COLUMN_COUNT.DOUBLE,
        },
        bp1570: {
            gap: 16,
            1: dynamicSelections.scoreboard.bp1570.width,
            2: dynamicSelections.scoreboard.bp1570.width * COLUMN_COUNT.DOUBLE + dynamicSelections.scoreboard.gap,
            3:
                dynamicSelections.scoreboard.bp1570.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.scoreboard.gap * COLUMN_COUNT.DOUBLE,
        },
        bp1536: {
            gap: 16,
            1: dynamicSelections.scoreboard.bp1536.width,
            2: dynamicSelections.scoreboard.bp1536.width * COLUMN_COUNT.DOUBLE + dynamicSelections.scoreboard.gap,
            3:
                dynamicSelections.scoreboard.bp1536.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.scoreboard.gap * COLUMN_COUNT.DOUBLE,
        },
        bp1440: {
            gap: 16,
            1: dynamicSelections.scoreboard.bp1440.width,
            2: dynamicSelections.scoreboard.bp1440.width * COLUMN_COUNT.DOUBLE + dynamicSelections.scoreboard.gap,
            3:
                dynamicSelections.scoreboard.bp1440.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.scoreboard.gap * COLUMN_COUNT.DOUBLE,
        },
        bp1366: {
            gap: 16,
            1: dynamicSelections.scoreboard.bp1366.width,
            2: dynamicSelections.scoreboard.bp1366.width * COLUMN_COUNT.DOUBLE + dynamicSelections.scoreboard.gap,
            3:
                dynamicSelections.scoreboard.bp1366.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.scoreboard.gap * COLUMN_COUNT.DOUBLE,
        },
        bp1280: {
            gap: 16,
            1: dynamicSelections.scoreboard.bp1280.width,
            2: dynamicSelections.scoreboard.bp1280.width * COLUMN_COUNT.DOUBLE + dynamicSelections.scoreboard.gap,
            3:
                dynamicSelections.scoreboard.bp1280.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.scoreboard.gap * COLUMN_COUNT.DOUBLE,
        },
        bp1279: {
            gap: 16,
            1: dynamicSelections.scoreboard.bp1279.width,
            2: dynamicSelections.scoreboard.bp1279.width * COLUMN_COUNT.DOUBLE + dynamicSelections.scoreboard.gap,
            3:
                dynamicSelections.scoreboard.bp1279.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.scoreboard.gap * COLUMN_COUNT.DOUBLE,
        },
        bp1100: {
            gap: 16,
            1: dynamicSelections.scoreboard.bp1100.width,
            2: dynamicSelections.scoreboard.bp1100.width * COLUMN_COUNT.DOUBLE + dynamicSelections.scoreboard.gap,
            3:
                dynamicSelections.scoreboard.bp1100.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.scoreboard.gap * COLUMN_COUNT.DOUBLE,
        },
        bp960: {
            gap: 16,
            1: dynamicSelections.scoreboard.bp960.width,
            2: dynamicSelections.scoreboard.bp960.width * COLUMN_COUNT.DOUBLE + dynamicSelections.scoreboard.gap,
            3:
                dynamicSelections.scoreboard.bp960.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.scoreboard.gap * COLUMN_COUNT.DOUBLE,
        },
        bp896: {
            gap: 16,
            1: dynamicSelections.scoreboard.bp896.width,
            2: dynamicSelections.scoreboard.bp896.width * COLUMN_COUNT.DOUBLE + dynamicSelections.scoreboard.gap,
            3:
                dynamicSelections.scoreboard.bp896.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.scoreboard.gap * COLUMN_COUNT.DOUBLE,
        },
        bp850: {
            gap: 16,
            1: dynamicSelections.scoreboard.bp850.width,
            2: dynamicSelections.scoreboard.bp850.width * COLUMN_COUNT.DOUBLE + dynamicSelections.scoreboard.gap,
            3:
                dynamicSelections.scoreboard.bp850.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.scoreboard.gap * COLUMN_COUNT.DOUBLE,
        },
        bp768: {
            gap: 16,
            1: dynamicSelections.scoreboard.bp768.width,
            2: dynamicSelections.scoreboard.bp768.width * COLUMN_COUNT.DOUBLE + dynamicSelections.scoreboard.gap,
            3:
                dynamicSelections.scoreboard.bp768.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.scoreboard.gap * COLUMN_COUNT.DOUBLE,
        },
        bp680: {
            gap: 16,
            1: dynamicSelections.scoreboard.bp680.width,
            2: dynamicSelections.scoreboard.bp680.width * COLUMN_COUNT.DOUBLE + dynamicSelections.scoreboard.gap,
            3:
                dynamicSelections.scoreboard.bp680.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.scoreboard.gap * COLUMN_COUNT.DOUBLE,
        },
        bp500: {
            gap: 0,
            1: dynamicSelections.scoreboard.bp500.width,
            2: dynamicSelections.scoreboard.bp500.width * COLUMN_COUNT.DOUBLE + dynamicSelections.scoreboard.gap,
            3:
                dynamicSelections.scoreboard.bp500.width * COLUMN_COUNT.TRIPLE +
                dynamicSelections.scoreboard.gap * COLUMN_COUNT.DOUBLE,
        },
    },
});

export const COLUMN_BREAKPOINTS = [
    { width: 1570, columns: COLUMN_COUNT.TRIPLE },
    { width: 1440, columns: COLUMN_COUNT.DOUBLE },
    { width: 1279, columns: COLUMN_COUNT.SINGLE },
    { width: 1100, columns: COLUMN_COUNT.TRIPLE },
    { width: 960, columns: COLUMN_COUNT.DOUBLE },
    { width: 850, columns: COLUMN_COUNT.TRIPLE },
    { width: 768, columns: COLUMN_COUNT.DOUBLE },
    { width: 680, columns: COLUMN_COUNT.DOUBLE },
    { width: 500, columns: COLUMN_COUNT.SINGLE },
];
