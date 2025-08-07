import type { EventModel } from 'src/appState/models/models/EventModel';
import { LiveTrackerProviders } from 'src/common/enums';
import type { MediaItem } from 'src/common/types/media';

export function getStream(event: EventModel): MediaItem | undefined {
    const reduxStream = event?.media?.streams[0];

    return reduxStream !== undefined ? { id: reduxStream.id, provider: reduxStream.provider } : undefined;
}

export function getLiveTracker(event: EventModel): MediaItem | undefined {
    return event?.media?.liveTrackers.find(
        (t) =>
            t.provider === LiveTrackerProviders.BetRadar ||
            t.provider === LiveTrackerProviders.Bayes ||
            t.provider === LiveTrackerProviders.LSports,
    );
}
