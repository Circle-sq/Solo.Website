import type { PlatformObject } from 'src/common/types/competition';

export interface LinkItem {
    href?: string;
    router?: string;
    params?: {
        id?: string;
        slug?: string;
        countryId?: string;
        sportId?: string | null;
        account?: string;
        static?: string;
        competitionId?: string;
    };
    label?: string;
    iconName?: string;
    route?: string;
    eventNumber?: number;
    id?: string;
    country?: string;
    category?: string;
    imageUrl?: string;
    uuid?: string;
    displayOrder?: string | number;
    platformObject?: PlatformObject | null;
    onClick?: () => void;
}

export interface NestedLinkItem extends LinkItem {
    countryId?: string;
    key?: string;
    totalEventsCounter?: number;
    children?: LinkItem[];
    menuLevel?: number;
}
