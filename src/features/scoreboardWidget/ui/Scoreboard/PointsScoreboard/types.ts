export const enum BoardStatus {
    Active = 'active',
    Inactive = 'inactive',
}

export const enum ScoreColor {
    Primary = 'primary',
    Secondary = 'secondary',
}

export interface MatchHistoryEntrySeparator {
    id: number;
    type: 'separator';
}

export interface MatchHistoryEntryScore {
    id: number;
    type: 'score';
    home: { value: number | string; color: ScoreColor };
    away: { value: number | string; color: ScoreColor };
}

export type MatchHistory = Array<MatchHistoryEntryScore | MatchHistoryEntrySeparator>;
