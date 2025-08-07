import type { ReactNode } from 'react';
import type { Map } from 'immutable';
import type { Testable } from 'src/utils/Testable/types';

export interface LiveEvent {
    events: Map<number, any>;
    competitions: Map<number, any>;
    competitionLocations: Map<number, any>;
}

export interface Link extends Testable {
    route?: string;
    params?: Record<string, string | number | null | undefined>;
    icon?: string;
    label?: ReactNode;
    counter?: number;
}
