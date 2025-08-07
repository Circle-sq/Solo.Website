import type { ReactElement, ReactNode } from 'react';

import type { Testable } from 'src/utils/Testable/types';

export interface Props {
    onChange: (value?: string) => void;
    sportsCounter: SportCount[];
    route: RouteLink;
    sportToShow: string | undefined;
}

export interface RouteLink {
    route?: string;
    params: Record<string, string | number | null | undefined>;
    icon?: string;
    label?: ReactNode;
    counter?: number;
}

export interface SportCount {
    id: string;
    count: number;
}

export interface CrossSportLink extends Testable {
    route: string;
    params: {
        sport: string;
    };
    sportId: string;
    icon: string;
    label: ReactElement;
    displayOrder?: number;
    count?: number;
}
