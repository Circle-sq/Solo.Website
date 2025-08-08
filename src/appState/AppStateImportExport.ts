import * as t from 'io-ts';
import { buildValidator } from '@solo-webapi/mobx-utils/buildValidator';
import type { LangDetailsRecordType } from './LanguagesState';

export interface AppStateSerializedType {
    universe: string;
    websocket_host: string;
    cashout_websocket_host: string;
    userAgent: string;
    allTranslations: Record<string, LangDetailsRecordType>;
    userLang: string | null;
    img_api_url: string;
    refreshTimeout: number;
    fetchMarketsGroupSize: number;
    accountUpdateDelayTimeout: number;
    shouldRefreshEvent: boolean;
    featureTogglingProxyUri: string;
    featureTogglingProxyToken: string;
    sportRemapping: Record<string, string>;
    host: string;
}

export interface AppStateFromServerType {
    universe: string;
    websocket_host: string;
    cashout_websocket_host: string;
    userAgent: string;
    allTranslations: Record<string, LangDetailsRecordType>;
    userLang: string | null;
    img_api_url: string;
    refreshTimeout: number;
    fetchMarketsGroupSize: number;
    accountUpdateDelayTimeout: number;
    shouldRefreshEvent: boolean;
    featureTogglingProxyUri: string;
    featureTogglingProxyToken: string;
    sportRemapping: Record<string, string>;
    host: string;
    theme: string;
    guestCurrency: string;
}

const AppStateSerializedIO = t.interface({
    universe: t.string,
    websocket_host: t.string,
    cashout_websocket_host: t.string,
    userAgent: t.string,
    allTranslations: t.record(
        t.string,
        t.interface({
            description: t.string,
            properties: t.record(t.string, t.string),
        }),
    ),
    userLang: t.union([t.string, t.null]),
    img_api_url: t.string,
    refreshTimeout: t.number,
    fetchMarketsGroupSize: t.number,
    accountUpdateDelayTimeout: t.number,
    shouldRefreshEvent: t.boolean,
    featureTogglingProxyUri: t.string,
    featureTogglingProxyToken: t.string,
    sportRemapping: t.record(t.string, t.string),
    host: t.string,
});

const decodeAppStateSerialized = buildValidator<AppStateSerializedType>('AppStateSerializedType', AppStateSerializedIO);

export const decodeAppStateSerializedType = (data: unknown): AppStateSerializedType => {
    const dataDecoded = decodeAppStateSerialized(data);

    if (dataDecoded instanceof Error) {
        throw dataDecoded;
    }

    return dataDecoded;
};

export const convertServerInitToAppStateInit = (data: AppStateFromServerType): AppStateSerializedType => ({
    universe: data.universe,
    websocket_host: data.websocket_host,
    cashout_websocket_host: data.cashout_websocket_host,
    userAgent: data.userAgent,
    allTranslations: data.allTranslations,
    userLang: data.userLang,
    img_api_url: data.img_api_url,
    refreshTimeout: data.refreshTimeout,
    fetchMarketsGroupSize: data.fetchMarketsGroupSize,
    accountUpdateDelayTimeout: data.accountUpdateDelayTimeout,
    shouldRefreshEvent: data.shouldRefreshEvent,
    featureTogglingProxyUri: data.featureTogglingProxyUri,
    featureTogglingProxyToken: data.featureTogglingProxyToken,
    sportRemapping: data.sportRemapping,
    host: data.host,
});
