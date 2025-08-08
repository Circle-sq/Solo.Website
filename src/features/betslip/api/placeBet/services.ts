import isString from 'lodash/isString';

import { api } from '@solo-api/api';

import { STORAGE_KEYS } from 'src/utils/constants';
import buildLocalStorageService from 'src/utils/StorageService';

import type { Channel } from '../../enums';
import type { CastBet } from '../types/castBet';
import type { GameId, PlacedBet } from '../types/placedBet';

export interface PlaceBetParams {
    castBets: CastBet[];
    channel: Channel;
}

interface PlaceBetPayload extends PlaceBetParams {
    gameId: GameId;
}

const placeBetApi = async ({ castBets, channel }: PlaceBetParams): Promise<PlacedBet[] | null> => {
    let gameId = buildLocalStorageService<GameId>(STORAGE_KEYS.gameId).getItem();

    if (isString(gameId)) {
        gameId = Number(gameId);
    }

    return api.post<PlacedBet[] | null, PlaceBetPayload>('/betslip/place-bet', { castBets, channel, gameId });
};

export default placeBetApi;
