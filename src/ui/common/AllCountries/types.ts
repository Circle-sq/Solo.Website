import type { ReactNode } from 'react';

import type { NestedLinkItem } from '../NavigationPanel/types';

export interface LinkItem {
    href?: string;
    router?: string;
    params?: Record<string, string | number | null | undefined>;
    label?: ReactNode | string;
    iconName?: string;
    icon?: string;
    route?: string;
    eventNumber?: number;
    children?: NestedLinkItem[];
    country?: string;
    count?: number;
    imageUrl?: string;
    uuid?: string;
    locationKey?: string | null;
    locationLabel?: string | null;
    locationIcon?: string;
    sport?: string;
    sportId?: string;
    onClick?: () => void;
}
