import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { getRecoil, setRecoil } from 'recoil-nexus';

import { signIn, signOut, updateOddsFormat } from '@solo-account/actions';
import { isAuthenticatedAtom, userDataAtom, userSettingsAtom } from '@solo-account/store/atoms';
import { currencySelector, playableBalanceSelector } from '@solo-account/store/selectors';
import { BreakPoints } from '@solo-ui/system';
import { store } from '@solo-utils/jotai';

import { SPORT_BOOK_MESSAGES, STORAGE_KEYS } from 'src/utils/constants';
import { guestCurrencyAtom } from 'src/utils/standalone/store/atom';

import type Application from './app';
import type { AppState } from './appState/AppState';
import { BettingTab, type OddsFormat } from './common/enums';
import { type PostMessageData } from './types';
import { bettingAtom } from './ui/betting/store/atoms';
import type { Betting } from './ui/betting/store/types';
import { subscribeState } from './ui/betting/utils/quickBet';
import { getLongOddsFormat } from './utils/common';
import { formatAmountWithCurrency } from './utils/format';
import { getLanguage } from './utils/getLanguage';
import { isBackFromEventPageAtom, reInitTrackRenderDoneAtom } from './utils/standalone/store/atom';
import { IFRAME_ACTION_TYPE, LogStandaloneMessage } from './utils/standalone/utils';
import { getStorageBuilder } from './utils/StorageService';

export const initCommunicationWithParent = (app: Application) => {
    window.addEventListener('message', ({ data }) => {
        const source = data.source;

        if (source && (source.startsWith('react-') || source.startsWith('@devtools-page'))) {
            return;
        }

        onReceiveMessage(data, app);
    });

    window.addEventListener('contextmenu', (e: MouseEvent) => {
        if ((e.target as Element).closest('a')) {
            e.preventDefault();
        }
    });

    window.addEventListener('auxclick', function (event) {
        // Check if the target is a link and the click is a middle-click (button 1)
        const anchor = (event.target as Element).closest('a');

        if (anchor && anchor.href && event.button === 1) {
            event.preventDefault();

            const url = new URL(anchor.href);
            const path = url.pathname;
            const appState: AppState = window.$appState;
            appState.router.setUrl(path);
        }
    });

    app.postExternalMessage(SPORT_BOOK_MESSAGES.ready);

    initListeners(app);

    LogStandaloneMessage(IFRAME_ACTION_TYPE.info, 'communication With Parent initialized');
};

export const onReceiveMessage = (data: PostMessageData, app: Application) => {
    const platformIdStorage = getStorageBuilder()(STORAGE_KEYS.platformId);
    const isAuthenticated = store.get(isAuthenticatedAtom);

    try {
        const { type, value } = data;
        LogStandaloneMessage(IFRAME_ACTION_TYPE.receive, `type: ${type}, value:${JSON.stringify(value, null, 2)}`);
        const { token, jwt, dateFormat, language, oddsFormat, shortDateFormat, setUrl, theme, guestCurrency } =
            value || {};

        switch (type) {
            case SPORT_BOOK_MESSAGES.login:
                if (!isAuthenticated && !isEmpty(token)) {
                    const loginPayload = {
                        externalToken: token,
                        platformId: platformIdStorage.getItem() ?? undefined,
                        ...(jwt != null ? { externalJwt: jwt } : {}),
                    };

                    void signIn(loginPayload);
                    initBalanceUpdate(app);
                }

                break;

            case SPORT_BOOK_MESSAGES.logout:
                if (isAuthenticated) {
                    void signOut();
                }

                break;

            case SPORT_BOOK_MESSAGES.configurations: {
                if (typeof oddsFormat !== 'undefined') {
                    if (isAuthenticated) {
                        void updateOddsFormat(getLongOddsFormat(oddsFormat as OddsFormat));
                    }

                    store.set(userSettingsAtom, {
                        dateFormat,
                        language: getLanguage(language),
                        oddsFormat: oddsFormat as OddsFormat,
                        shortDateFormat,
                    });

                    const previousSavedLanguage = localStorage.getItem('userLang');

                    if (language !== undefined && previousSavedLanguage !== language && window.parent !== window.self) {
                        localStorage.setItem('userLang', language);

                        window.location.reload();
                    }
                } else {
                    console.error('No valid configurations received', data);
                }

                break;
            }

            case SPORT_BOOK_MESSAGES.set_theme: {
                if (theme != null) {
                    if (typeof window.setThemeName === 'function') {
                        window.setThemeName(theme as ThemeNames);
                    } else {
                        console.error('setThemeName is not available');
                    }
                } else {
                    console.error('No theme provided in message', data);
                }

                break;
            }

            case SPORT_BOOK_MESSAGES.set_guest_currency: {
                if (guestCurrency != null) {
                    store.set(guestCurrencyAtom, guestCurrency);
                } else {
                    console.error('No currency provided in message', data);
                }

                break;
            }

            case SPORT_BOOK_MESSAGES.set_url: {
                const appState: AppState = window.$appState;

                if (setUrl !== undefined && !isEmpty(setUrl)) {
                    let urlToSet: string = setUrl;
                    const selectionId = parseUrlParam(urlToSet, 'selectionId');

                    if (!isEmpty(selectionId)) {
                        window.$add_selectionId_to_betlslip = selectionId;
                        urlToSet = removeQueryParam(urlToSet, 'selectionId');
                    }

                    const action = parseUrlParam(urlToSet, 'action');

                    if (!isEmpty(action) && action === 'open_my_bets') {
                        setRecoil(bettingAtom, (state) => ({
                            ...state,
                            showMyBets: true,
                            showMyBetsTab: true,
                            showQuickBet: false,
                            bettingTab: BettingTab.MyBets,
                        }));
                        urlToSet = removeQueryParam(urlToSet, 'action');
                    }

                    const isBackFromEventPage = store.get(isBackFromEventPageAtom);

                    if (isBackFromEventPage) {
                        store.set(isBackFromEventPageAtom, false);

                        return;
                    }

                    const backToParentParam = 'backToParent=true';

                    if (urlToSet.includes('?')) {
                        urlToSet = `${urlToSet}&${backToParentParam}`;
                    } else {
                        urlToSet = `${urlToSet}?${backToParentParam}`;
                    }

                    appState.router.setUrl(urlToSet);
                    store.set(reInitTrackRenderDoneAtom, true);
                } else if (appState.router.url === '/error/404') {
                    appState.router.redirect('homepage', {});
                }

                break;
            }

            case SPORT_BOOK_MESSAGES.open_betslip: {
                setRecoil(bettingAtom, (state: Betting) => ({ ...state, showQuickBet: true, showMyBets: false }));

                break;
            }

            case SPORT_BOOK_MESSAGES.open_my_bets: {
                setRecoil(bettingAtom, (state) => ({
                    ...state,
                    showMyBets: true,
                    showQuickBet: false,
                    bettingTab: BettingTab.MyBets,
                }));

                break;
            }

            case SPORT_BOOK_MESSAGES.internalError: {
                app.postExternalMessage(SPORT_BOOK_MESSAGES.error, value);

                break;
            }
        }
    } catch (err) {
        console.error('onPortalReadMessage', err);
    }
};

// #region listeners

export function initListeners(_app: Application) {
    //const platformId = getStorageBuilder()('platformId').getItem();
    // if (platformId === PlatformIdTypes.Sportsbook1) {
    //     handleResizeUpdate(app);
    // }
    // if (platformId === PlatformIdTypes.Sportsbook1 || platformId === PlatformIdTypes.Sportsbook2) {
    //     initBalanceUpdate(app);
    // }
}

function findHighestNode(nodesList: NodeListOf<ChildNode>): number {
    let highestNodeHeight = 0;

    for (let i = nodesList.length - 1; i >= 0; i--) {
        const node = nodesList[i] as HTMLElement;

        if (node.scrollHeight && node.clientHeight) {
            const elHeight = Math.max(node.scrollHeight, node.clientHeight);

            if (elHeight > highestNodeHeight) {
                highestNodeHeight = elHeight;
            }
        }

        let headerHeight = 0;

        if (node.childNodes.length) {
            if (node.id === 'root') {
                const mainNodes = node.childNodes[0] as HTMLElement;
                headerHeight = mainNodes.offsetHeight;

                for (let i = 0; i < mainNodes.childNodes.length; i++) {
                    const childNode = mainNodes.childNodes[i] as HTMLElement;

                    if (childNode.offsetHeight < headerHeight) {
                        headerHeight = childNode.offsetHeight;
                    }
                }
            }

            const childHighestNodeHeight = findHighestNode(node.childNodes);

            if (childHighestNodeHeight > highestNodeHeight) {
                highestNodeHeight = childHighestNodeHeight + headerHeight;
            }
        }
    }

    return highestNodeHeight;
}

function _handleResizeUpdate(app: Application) {
    LogStandaloneMessage(IFRAME_ACTION_TYPE.info, 'Height Update initialized');
    const defaultHeight = 400;
    const heightCheckInterval = 1000;

    let previous = 0;
    let pageHeight = 0;
    let prevRoute = { ...app.router.route };
    let interval: NodeJS.Timeout | null = null;

    const calculateHeight = () => {
        if (document.body.clientWidth > BreakPoints.phone) {
            return;
        }

        const { showMyBets } = getRecoil(bettingAtom);

        if (showMyBets) {
            const popupElement = document.querySelector('.mybets');

            if (popupElement !== null) {
                pageHeight =
                    findHighestNode((popupElement.lastChild as HTMLElement).childNodes) +
                    (popupElement.firstChild as HTMLElement).offsetHeight;
            }
        } else {
            pageHeight = document.getElementById('root')?.offsetHeight ?? 0;

            const currentRoute = { ...app.router.route };

            if (!isEqual(prevRoute, currentRoute)) {
                pageHeight = defaultHeight;
                prevRoute = { ...currentRoute };
            }
        }

        if (pageHeight > 0 && previous !== pageHeight) {
            app.postExternalMessage(SPORT_BOOK_MESSAGES.height_update, { height: pageHeight.toString() });
            previous = pageHeight;
        }
    };

    const activateInterval = () => {
        if (interval !== null) {
            clearInterval(interval);
        }
        interval = setInterval(calculateHeight, heightCheckInterval);
    };

    subscribeState(
        () => {
            if (interval !== null) {
                clearInterval(interval);
            }
            app.postExternalMessage(SPORT_BOOK_MESSAGES.height_update, { height: defaultHeight.toString() });
        },
        () => {
            activateInterval();
            app.postExternalMessage(SPORT_BOOK_MESSAGES.height_update, { height: pageHeight.toString() });
        },
    );
    activateInterval();
}

function initBalanceUpdate(app: Application) {
    let previousPlayableBalance = 0;

    store.sub(userDataAtom, () => {
        const updatedPlayableBalance = store.get(playableBalanceSelector);
        const currency = store.get(currencySelector);
        const balance = formatAmountWithCurrency(updatedPlayableBalance, currency);

        if (updatedPlayableBalance !== previousPlayableBalance) {
            app.postExternalMessage(SPORT_BOOK_MESSAGES.balance_update, {
                balance: balance,
            });
            previousPlayableBalance = updatedPlayableBalance;
        }
    });
}

// #endregion

// #region Utils

export function parseUrlParam(urlPath: string, param: string): string | undefined {
    const queryStringIndex = urlPath.indexOf('?');

    if (queryStringIndex !== -1) {
        const queryString = urlPath.substring(queryStringIndex + 1);
        const urlSearchParams = new URLSearchParams(queryString);
        const value = urlSearchParams.get(param);

        return value !== null && value !== '' ? value : undefined;
    }

    return undefined;
}

export function removeQueryParam(urlPath: string, paramToRemove: string): string {
    const urlObj = new URL(`http://dummyhost${urlPath}`);
    const queryParams = new URLSearchParams(urlObj.search);

    queryParams.delete(paramToRemove);

    // Reconstruct the search portion of the URL with the modified query parameters
    urlObj.search = queryParams.toString();

    // Return the updated URL string without the host part
    return urlObj.toString().replace('http://dummyhost', '');
}
// #endregion
