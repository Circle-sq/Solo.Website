import type { ReactNode } from 'react';
import type { CompetitionLocationTags, PlatformObject } from 'src/common/types/competition';

import type { ParamsType } from 'src/utils/Router/types';

export interface Link {
    route?: string;
    originalRoute?: string;
    params?: ParamsType;
    Icon?: ReactNode;
    label: ReactNode | string;
    highlighted?: boolean;
    counter?: number;
    liveType?: boolean;
    iconUrl?: string;
}

export interface CompetitionDetails {
    id: string;
    name: string;
    sport: string;
    originalSport: string;
    displayOrder: number;
    platformObject: PlatformObject | null;
    tags: CompetitionLocationTags;
}
