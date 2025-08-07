import { Map } from 'immutable';

export const reduxStateMock: Record<string, unknown> = {
    competitions: Map().set('items', Map()),
    content: Map(),
    events: Map().set('items', Map().set(1, Map().set('sport', 'football'))),
    sports: Map(),
    media: Map(),
};
