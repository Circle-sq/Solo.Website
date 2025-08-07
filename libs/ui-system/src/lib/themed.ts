enum Resolutions {
    BP1920 = 'bp1920',
    BP1570 = 'bp1570',
    BP1536 = 'bp1536',
    BP1498 = 'bp1498',
    BP1440 = 'bp1440',
    BP1366 = 'bp1366',
    BP1132 = 'bp1132',
    BP1280 = 'bp1280',
    BP1279MAX = 'bp1279max',
    BP1279 = 'bp1279',
    BP1149 = 'bp1149',
    BP1120 = 'bp1120',
    BP1100 = 'bp1100',
    BP1055 = 'bp1055',
    BP961 = 'bp961',
    BP960 = 'bp960',
    BP959MAX = 'bp959max',
    BP896 = 'bp896',
    BP850 = 'bp850',
    BP845 = 'bp845',
    BP768 = 'bp768',
    BP680 = 'bp680',
    BP600 = 'bp600',
    BP500 = 'bp500',
    BP420 = 'bp420',
    BP360 = 'bp360',
}

type Dimensions = {
    width: number;
    height: number;
};

type Selections = {
    [key in Resolutions]?: Dimensions;
} & { gap: number };

export interface DynamicSelections {
    regular: Selections;
    american: Selections;
    scoreboard: Selections;
}

type Container = {
    gap: number;
    [key: number]: number;
};

export interface DynamicContainers {
    regular: { [key: string]: Container };
    american: { [key: string]: number };
    scoreboard: { [key: string]: Container };
}

export interface LegacyTheme {
    breakpoints: Record<string, string>;
    dynamicSelections: DynamicSelections;
}
