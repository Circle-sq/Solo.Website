import type { MouseEvent, ReactElement } from 'react';

import type { Testable } from 'src/utils/Testable/types';

export interface EventGroupHeaderProps extends Testable, IconUrls {
    columnLabelsGroups: string[][];
    label?: string | string[] | ReactElement;
    isOpen?: boolean;
    sportId: number | string;
    eventsCount?: number;
    onToggle?: (event: MouseEvent) => void;
    showSelections: boolean;
    iconUrl?: string;
    hideChevron?: boolean;
    selectionsSizes: number[];
    originalSportId?: string;
}

export interface SelectionColumnLabel extends Testable {
    isAmericanSports?: boolean;
}

export interface IconUrls {
    categoryIconUrl?: string;
    competitionIconUrl?: string;
}

export interface ESoccerCompetitionGroupNameProps extends IconUrls {
    countryName: string;
    competitionName: string;
}
