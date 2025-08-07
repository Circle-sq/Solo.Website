import type { Map } from 'immutable';

import type { MediaState } from '../types';

export type MediaStreamState = Map<keyof MediaState, MediaState[keyof MediaState]> | Map<string, unknown>;

export interface UpdateStreams {
    (events: Record<string, any>[], streams: Record<string, string>[], eventId: number): Record<string, any>[];
}
