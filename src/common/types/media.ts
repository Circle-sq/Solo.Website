export interface Media {
    liveTrackers: MediaItem[];
    statistics: MediaItem[];
    streams: MediaItem[];
}

export interface MediaItem<TId = string | null | undefined> {
    id: TId;
    provider: string;
}
