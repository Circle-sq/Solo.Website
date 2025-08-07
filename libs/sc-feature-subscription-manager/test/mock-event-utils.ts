import map from 'lodash/map';
import set from 'lodash/set';

import type { MockEvent } from './MockEvent';

export const buildMockEvent = (id: number, revision = 42): MockEvent => {
    const mockEvent = { id, name: `Event ${id}` };

    return set(mockEvent, 'data.value.revision', revision);
};
export const buildMockEvents = (ids: number[]): MockEvent[] => map(ids, (id) => buildMockEvent(id));
