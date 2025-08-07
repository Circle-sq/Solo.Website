import type { ReactElement } from 'react';

import type { Testable } from 'src/utils/Testable/types';

export interface Nav {
    isNav: boolean;
    iconType?: string;
    isInHeader?: boolean;
    isCrossBet?: boolean;
}

export interface Navigate extends Testable {
    route: string | null;
    params: { id: string; popup?: string };
    count?: number;
    icon: string;
    label: string;
}

export interface SubNav {
    isInHeader?: boolean;
    iconType?: string;
    isActive?: boolean;
    isInPlayPage?: boolean;
}

export interface NoLink {
    isInHeader?: boolean;
    iconType?: string;
}

export interface NavLink extends Testable {
    route?: string | null;
    params?: Record<string, string>;
    icon: string;
    label?: string | null | ReactElement;
    displayOrder?: number;
    isActiveCallback?: (url: string) => boolean;
    extra?: boolean;
    count?: number;
    onClick?: () => void;
    iconUrl?: string;
}
