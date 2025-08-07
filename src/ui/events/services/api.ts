import { api } from '@sc-api/api';

export const retrieveMarketsActiveCounter = async (eventsId: number[]): Promise<Record<string, number>> => {
    return api.post('/events/markets/active-counter', eventsId);
};
