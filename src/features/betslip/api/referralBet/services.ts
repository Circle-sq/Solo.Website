import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';

import { api } from '@solo-api/api';

import type { OfferStatus } from 'src/common/enums';

import type { BaseLeg } from '../types/leg';
import type { PlacedBet } from '../types/placedBet';
import type { ReferredBet } from '../types/referredBet';

export interface ReferredBetslipResponse {
    bets: ReferredBet[];
    expiresAt: string | null;
    offeredAt: string;
    status: OfferStatus;
}

export interface AcceptOfferResponse {
    bets: PlacedBet[];
}

export const getReferredBetslipApi = async (): Promise<ReferredBetslipResponse | null> => {
    const response = await api.get<ReferredBetslipResponse | '', never>('/user/referred-betslip');

    if (isString(response) || isEmpty(response)) {
        return null;
    }

    const { bets, expiresAt, offeredAt, status } = response;

    return {
        bets,
        expiresAt,
        offeredAt,
        status,
    };
};

export const acceptOfferApi = async () => {
    return api.post<AcceptOfferResponse>('/betslip/offered-betslip/accept');
};

export const rejectOfferApi = async () => {
    return api.post<{ legs?: BaseLeg[] }[]>('/betslip/offered-betslip/reject');
};
