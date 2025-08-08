import { api } from '@solo-api/api';

export const retrieveMarketsActiveCounter = async (eventsId: number[]): Promise<Record<string, number>> => {
    return api.post('/events/markets/active-counter', eventsId);
};
