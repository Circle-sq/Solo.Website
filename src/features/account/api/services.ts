import { api } from '@sc-api/api';

import type { BetslipCashout, BetslipOdds, OddsFormatLong } from 'src/common/enums';

import type { FreebetCredits, Session, SessionPayload, UserCurrenciesData, UserData } from '../types';

export const SessionService = {
    createSession: async (payload: SessionPayload): Promise<Session & UserData> => {
        return api.post<Session & UserData, SessionPayload>('/session', payload);
    },
    deleteSession: async (): Promise<void> => {
        try {
            window.$appState.messageBox.markAsLogout();
        } catch (error) {
            console.error('Failed to invoke MessageBox API', error);
        }

        return api.request('DELETE', '/session', { data: {} });
    },
};

export const UserService = {
    changeBetslipSettings: async (data: {
        oddsUpdate?: BetslipOdds;
        cashoutAcceptMode?: BetslipCashout;
    }): Promise<UserData> => {
        return api.post('/user/change-odds-update', data);
    },
    changeCrossInfoDismiss: async (crossInfoDismiss: boolean): Promise<UserData> => {
        return api.post('/user/cross-info-update', { crossInfoDismiss });
    },
    changeOddsFormat: async (oddsFormat: OddsFormatLong): Promise<UserData> => {
        return api.post('/user/change-odds', { oddsFormat });
    },
    getFreebetCredits: async (id: number | null, signal?: AbortSignal): Promise<FreebetCredits> => {
        return api.get(`/user/freebet/${id}/credits`, {}, {}, signal);
    },
    getAvailableCurrencies: async (userId: number | null, signal?: AbortSignal): Promise<UserCurrenciesData> => {
        return api.get(`/wallets/${userId}/currencies`, {}, {}, signal);
    },
    getLastDeposit: async (currency: string, signal?: AbortSignal): Promise<UserData> => {
        return api
            .get<{ user: UserData }>('/user/deposits/last', { currency }, {}, signal)
            .then((response) => response.user);
    },
    getOpenBetsCount: async (signal?: AbortSignal): Promise<number> => {
        return api.get('/user/open-bets-count', {}, {}, signal);
    },
};
