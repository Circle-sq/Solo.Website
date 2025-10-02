import type { ReactNode } from 'react';
import type { Testable } from 'src/utils/Testable/types';

export interface SportLinkType {
    route: 'sport';
    params: {
        id: string;
    };
    label: string;
    uuid: string;
    onClick?: () => void;
    Icon: ReactNode;
}

export interface SportModelType extends Testable {
    id: string;
    label: string;
    displayOrder: number;
    tags?: unknown;
}

export interface SportCount {
    id: string;
    count: number;
    live?: boolean;
    displayOrder?: number;
}
