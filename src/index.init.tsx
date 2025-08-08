import { fromJS } from 'immutable';
import { RESET } from 'jotai/utils';
import isEmpty from 'lodash/isEmpty';
import { autorun, configure } from 'mobx';
import queryString from 'query-string';
import React from 'react';

import { signIn } from '@solo-account/actions';
import { isAuthenticatedAtom, userDataAtom } from '@solo-account/store/atoms';
import { store } from '@solo-utils/jotai';
import { PlatformIdTypes } from '@solo-webapi/enums';

import { ModalRouteName, RouteName } from 'src/common/enums';
import { getCookie, setCookie } from 'src/config/config';
import { SPORT_BOOK_MESSAGES, STORAGE_KEYS } from 'src/utils/constants';
import { guestCurrencyAtom } from 'src/utils/standalone/store/atom';
import { getStorageBuilder } from 'src/utils/StorageService';

import Application from './app';
import { AppState } from './appState/AppState';
import type { AppStateSerializedType } from './appState/AppStateImportExport';
import { browserApply } from './appState/headerMeta/BrowserApply';
import { isStandalone } from './infra.client';
import { initCommunicationWithParent, parseUrlParam, removeQueryParam } from './portalMessages';
import History from './utils/History';
import { isBackFromEventPageAtom } from './utils/standalone/store/atom';

export const getElement = (id: string): HTMLElement => {
    const node = document.getElementById(id);

    if (node) {
        return node;
    }

    const newNode = document.createElement('div');

    newNode.setAttribute('id', id);

    document.body.appendChild(newNode);

    return newNode;
};

export const initIndex = () => {
    const userLangStorage = getStorageBuilder()('userLang');
    //https://mobx.js.org/refguide/api.html -> isolateGlobalState
    // TODO: set enforce actions to observerd and fix warnings
    // After finishing the entire migration process and validating that your project works as expected,
    // consider enabling the flags computedRequiresReaction, reactionRequiresObservable and observableRequiresReaction
    // and enforceActions: "observed" to write more idiomatic MobX code. https://mobx.js.org/migrating-from-4-or-5.html
    configure({ isolateGlobalState: true, enforceActions: 'never' });

    //setLogEnabled(true);

    React.Component.prototype.componentDidCatch = (error: unknown, errorInfo: unknown) => {
        try {
            window.console.error('Default error componentDidCatch', error, errorInfo);
        } catch (_err) {
            //
        }
    };

    const data = window.$data;

    try {
        const storageRecent = localStorage.getItem('recent');

        if (storageRecent) {
            const recent = fromJS(JSON.parse(storageRecent));

            if (recent) {
                if (!data.content) {
                    data.content = {};
                }

                data.content.recentlyViewed = recent;
            }
        }
    } catch (_e) {
        // Local storage is not allowed or running in Node
    }

    try {
        const storageUserSettings = localStorage.getItem('userSettings');

        if (storageUserSettings) {
            const userSettings = fromJS(JSON.parse(storageUserSettings));

            if (userSettings) {
                data.content.userSettings = userSettings;
            }
        }
    } catch (_e) {
        // Local storage is not allowed or running in Node
    }

    if (data && typeof data === 'object') {
        Object.keys(data).forEach((key) => {
            if (key !== ModalRouteName.Betslip) {
                data[key as keyof WindowData] = fromJS(data[key as keyof WindowData]);
            }
        });
    }

    let appStateInitData: Partial<AppStateSerializedType> = {
        universe: process.env.OPERATOR,
    };

    if (window.$appStateInit) {
        appStateInitData = JSON.parse(window.$appStateInit);
    }

    const savedLanguage = userLangStorage.getItem();

    if (savedLanguage) {
        console.warn('Using user stored language', savedLanguage);
        appStateInitData.userLang = savedLanguage;
    }

    // Create application instance
    const app = new Application({ url: location.pathname + location.search, data: data });

    const appState = AppState.createForBrowser(app, appStateInitData);

    autorun(() => {
        const list = appState.headerMeta.metaList;

        browserApply(document.head, list);
    });

    window.onpopstate = function () {
        const urlParams = new URLSearchParams(appState.router.url.split('?')[1]);
        const backToParent = urlParams.has('backToParent');

        if (location.pathname.includes('error')) {
            app.router.redirect(RouteName.Homepage, {});

            return;
        }

        if (isStandalone() && backToParent) {
            if (appState.router.route.name === RouteName.Event) {
                store.set(isBackFromEventPageAtom, true);
            }
            window.history.go(-1);
        }

        app.router.setUrl(location.pathname + location.search);
    };

    autorun(() => {
        const { url } = app.router;
        const { pathname, search } = window.location;

        // Update portal URL whenever internal route changes
        app.postExternalMessage(SPORT_BOOK_MESSAGES.url, {
            url,
        });

        if (`${pathname}${search}` !== url) {
            History.pushState(null, '', url);
        }
    });

    // Memorise referral link in the cookie
    const KEY = 'referrer';
    const urlParams = queryString.parse(window.location.search);

    try {
        const dev_scoreboard_amd = urlParams.dev_scoreboard_amd;

        if (typeof dev_scoreboard_amd === 'string' && dev_scoreboard_amd !== '') {
            console.info('SET DEV VERSION: dev_scoreboard_amd');

            sessionStorage.setItem('dev_scoreboard_amd', dev_scoreboard_amd);
        }
    } catch (err) {
        console.error(err);
    }

    // Read referral from URL and set the cookie
    // It is done like this because the module 'query-string' doesn't have a prototype
    if (Object.prototype.hasOwnProperty.call(urlParams, KEY) && urlParams[KEY] !== getCookie(KEY)) {
        setCookie(KEY, urlParams[KEY], 31);
    }

    const iaKey = 'btag';

    if (Object.prototype.hasOwnProperty.call(urlParams, iaKey) && !getCookie(iaKey)) {
        setCookie(iaKey, urlParams[iaKey], 31);
    }

    window.$app = app;

    window.$appState = appState;

    const host = window.$appState.env.host;

    if (window.$gameId) {
        const gameIdStorage = getStorageBuilder()(STORAGE_KEYS.gameId);

        gameIdStorage.setItem(window.$gameId);
    }
    const tokenStorage = getStorageBuilder()(STORAGE_KEYS.token);
    const refreshTokenStorage = getStorageBuilder()(STORAGE_KEYS.refreshToken);
    const platformIdStorage = getStorageBuilder()(STORAGE_KEYS.platformId);

    const missingLocalStorageToken = !tokenStorage.getItem() || !refreshTokenStorage.getItem();

    if (window.$token) {
        void signIn({
            externalToken: window.$token,
            externalJwt: window.$loginjwt,
            platformId: window.$platformId,
        });
    } else if (missingLocalStorageToken || window.$platformId === PlatformIdTypes.SomePlatformId) {
        //If one of them is missing - make sure no residue for proper flow.
        console.warn('No external token provided - cleaning previous session residuals from local storage');
        tokenStorage.removeItem();
        refreshTokenStorage.removeItem();

        store.set(isAuthenticatedAtom, RESET);
        store.set(userDataAtom, RESET);
    } else {
        console.warn('NO LOGIN TOKEN');
    }

    if (window.$theme) {
        const themeStorage = getStorageBuilder()('theme');
        themeStorage.setItem(window.$theme);
    }

    if (window.$guestCurrency) {
        store.set(guestCurrencyAtom, window.$guestCurrency);
    }

    if (window.$platformId != null) {
        platformIdStorage.setItem(window.$platformId);
    }

    if (window.$redirect_url) {
        const selectionId = parseUrlParam(window.$redirect_url, 'selectionId');

        if (!isEmpty(selectionId)) {
            window.$add_selectionId_to_betlslip = selectionId;
            window.$redirect_url = removeQueryParam(window.$redirect_url, 'selectionId');
        }

        const action = parseUrlParam(window.$redirect_url, 'action');

        if (!isEmpty(action) && action === 'open_my_bets') {
            window.$open_my_bets = true;
            window.$redirect_url = removeQueryParam(window.$redirect_url, 'action');
        }

        appState.router.setUrl(window.$redirect_url);
    } else if (appState.router.url === '/error/404') {
        appState.router.redirect('homepage', {});
    }

    if (!isEmpty(host) && window.parent !== window.self) {
        initCommunicationWithParent(app);
    }
};
