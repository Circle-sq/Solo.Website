import type { SportType } from 'src/common/enums';

export interface RouteLink {
    route: string;
    params?: Record<string, string | number | null | undefined>;
}

export interface CountersType {
    counters: {
        count: number;
        id: SportType;
        displayOrder: number;
        name: string;
    }[];
}
