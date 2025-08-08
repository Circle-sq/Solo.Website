import { api } from '@solo-api/api';
import type { PossibleBetApiResponse } from '@solo-betslip/api/types';
import type { PlacedBet } from '@solo-betslip/api/types/placedBet';

import type { PlaceBetPayload, PossibleBetPayload } from '../types';

export const possibleBetsApi = async (payload: PossibleBetPayload): Promise<PossibleBetApiResponse> => {
    return api.post('/betslip/possible-bets', payload);
};

export const placeBetApi = async (payload: PlaceBetPayload): Promise<PlacedBet[]> => {
    return api.post('/betslip/place-bet', payload);
};
