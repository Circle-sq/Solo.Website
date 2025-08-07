import * as React from 'react';

import type Application from 'src/app';
import { SPORT_REMAPPING as SPORT_REMAPPING_DEFAULT } from 'src/config/config';
import { LANGUAGES } from 'src/utils/constants';

import { Router } from '../utils/Router';

import { ApiWrapper } from './ApiWrapper';
import { getFromSsr } from './app-state-helper';
import type { AppStateFromServerType, AppStateSerializedType } from './AppStateImportExport';
import { convertServerInitToAppStateInit, decodeAppStateSerializedType } from './AppStateImportExport';
import { EnvironmentState } from './EnvironmentState';
import { EventsCollectionState } from './EventsCollection/EventsCollectionState';
import { EventsCounterState } from './EventsCollection/EventsCounterState';
import { HeaderMeta } from './headerMeta/HeaderMeta';
import { LanguagesState } from './LanguagesState';
import { WebsocketState } from './lib/WebsocketState';
import { MessageBoxState } from './MessageBoxState';
import { ModelsState } from './models/ModelsState';
import { ReduxState } from './redux/ReduxState';
import { SportsList } from './sportsList/SportsList';
import TranslationsStore from './TranslationsStore';
import { convertMapToRecordDefault } from './utils';

export interface InjectStateType {
    reduxState: ReduxState;
    apiWrapper: ApiWrapper;
    router: Router;
    env: EnvironmentState;
}

const FETCH_MARKETS_GROUP_SIZE_DEFAULT = 200;

export class AppState {
    readonly reduxState: ReduxState;
    readonly apiWrapper: ApiWrapper;
    readonly router: Router;
    readonly websocket: WebsocketState;
    readonly env: EnvironmentState;
    readonly headerMeta: HeaderMeta;
    readonly language: LanguagesState;
    readonly sportsList: SportsList;
    readonly translationsStore: TranslationsStore;
    readonly models: ModelsState;
    readonly eventsCollection: EventsCollectionState;
    readonly eventsCounter: EventsCounterState;
    readonly messageBox: MessageBoxState;

    constructor(injectState: InjectStateType, initData: AppStateSerializedType) {
        const { reduxState, apiWrapper, router, env } = injectState;

        this.env = env;

        this.reduxState = reduxState;

        this.apiWrapper = apiWrapper;

        this.router = router;

        this.models = new ModelsState(reduxState);

        this.eventsCollection = new EventsCollectionState(this.reduxState, this.apiWrapper, this.models);

        this.eventsCounter = new EventsCounterState(this.reduxState, this.apiWrapper);

        this.language = new LanguagesState(initData.allTranslations, initData.userLang);

        this.headerMeta = new HeaderMeta();

        this.websocket = new WebsocketState(reduxState);

        this.translationsStore = new TranslationsStore(this.language);

        this.messageBox = new MessageBoxState(router, this.language);

        this.sportsList = new SportsList(reduxState);
    }

    static createForContext(): AppState {
        const injectState: InjectStateType = {
            reduxState: ReduxState.createForContext(),
            apiWrapper: ApiWrapper.createFromContext(),
            router: Router.createForContext(),
            env: EnvironmentState.createForContext(),
        };

        let userLang: string | null = LANGUAGES.korean;

        if (typeof window !== 'undefined') {
            userLang = getFromSsr<string>(window, '$appStateInit', 'userLang');
        }

        const initData: AppStateSerializedType = {
            universe: 'star',
            websocket_host: '',
            cashout_websocket_host: '',
            userAgent: '',
            userLang,
            allTranslations: {},
            img_api_url: '',
            refreshTimeout: 0,
            fetchMarketsGroupSize: FETCH_MARKETS_GROUP_SIZE_DEFAULT,
            accountUpdateDelayTimeout: 0,
            shouldRefreshEvent: false,
            featureTogglingProxyUri: '',
            featureTogglingProxyToken: '',
            sportRemapping: convertMapToRecordDefault(SPORT_REMAPPING_DEFAULT),
            host: '',
        };

        return new AppState(injectState, initData);
    }

    static createInjectState = (application: Application, initData: AppStateSerializedType): InjectStateType => {
        const { accountUpdateDelayTimeout, featureTogglingProxyUri, featureTogglingProxyToken } = initData;
        const env = new EnvironmentState(
            initData.universe,
            initData.userAgent,
            initData.websocket_host,
            initData.cashout_websocket_host,
            initData.img_api_url,
            initData.refreshTimeout,
            initData.fetchMarketsGroupSize,
            {
                accountUpdateDelayTimeout,
                featureTogglingProxyUri,
                featureTogglingProxyToken,
            },
            initData.shouldRefreshEvent,
            initData.sportRemapping,
            initData.host,
        );

        const reduxState = new ReduxState(application.store);
        const apiWrapper = new ApiWrapper();
        const router: Router = application.router;

        return {
            reduxState,
            apiWrapper,
            router: router,
            env,
        };
    };

    static createForBrowser(application: Application, data: unknown): AppState {
        const dataDecoded = decodeAppStateSerializedType(data);
        const injectState = AppState.createInjectState(application, dataDecoded);

        return new AppState(injectState, dataDecoded);
    }

    static createForServer(application: Application, dataInitServer: AppStateFromServerType): AppState {
        const initData = convertServerInitToAppStateInit(dataInitServer);
        const injectState = AppState.createInjectState(application, initData);

        return new AppState(injectState, initData);
    }

    export(): AppStateSerializedType {
        return {
            universe: this.env.universe,
            websocket_host: this.env.websocket_host,
            cashout_websocket_host: this.env.cashout_websocket_host,
            userAgent: this.env.userAgent,
            allTranslations: this.language.allTranslationsExport(),
            userLang: this.language.userLang,
            img_api_url: this.env.img_api_url,
            refreshTimeout: this.env.refreshTimeout,
            fetchMarketsGroupSize: this.env.fetchMarketsGroupSize,
            accountUpdateDelayTimeout: this.env.accountUpdateDelayTimeout,
            shouldRefreshEvent: this.env.shouldRefreshEvent,
            featureTogglingProxyUri: this.env.featureTogglingProxyUri,
            featureTogglingProxyToken: this.env.featureTogglingProxyToken,
            sportRemapping: this.env.sportRemapping,
            host: this.env.host,
        };
    }
}

const AppContext = React.createContext<AppState>(AppState.createForContext());

export const Consumer = AppContext.Consumer;
export const Provider = AppContext.Provider;

export const useAppStateContext = (): AppState => {
    return React.useContext(AppContext);
};
