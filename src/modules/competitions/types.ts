import type { RequestStatus } from 'src/common/enums';
import type { Competition } from 'src/common/types/competition';

export interface Competitions extends Record<string, unknown> {
    items?: CompetitionItems;
    highlight?: Highlights;
}

export interface CompetitionItems {
    [id: string]: Competition;
}

export interface Highlights {
    state: RequestStatus;
    items: HighlightItem[];
}

export interface HighlightItem extends Competition {
    active: boolean;
    display: boolean;
    sport: {
        id: string;
        name: string;
        url: string;
        displayOrder?: number | null;
        translations: Record<string, unknown>;
    };
}
