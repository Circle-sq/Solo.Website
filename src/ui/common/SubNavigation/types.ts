import type { ReactElement, ReactNode } from 'react';

import type { Testable } from 'src/utils/Testable/types';

export interface Nav {
    isNav: boolean;
    iconType?: string;
    isInHeader?: boolean;
}

export interface Navigate extends Testable {
    route: string | null;
    params: { id: string; popup?: string };
    count?: number;
    Icon: ReactNode;
    label: string;
}

export interface SubNav {
    isInHeader?: boolean;
    isActive?: boolean;
    isInPlayPage?: boolean;
}

export interface NoLink {
    isInHeader?: boolean;
}

export interface NavLink extends Testable {
    route?: string | null;
    params?: Record<string, string>;
    Icon: ReactNode;
    label?: string | null | ReactElement;
    displayOrder?: number;
    isActiveCallback?: (url: string) => boolean;
    extra?: boolean;
    count?: number;
    onClick?: () => void;
    iconUrl?: string;
}
