import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRecoilCallback } from 'recoil';
import { setRecoil } from 'recoil-nexus';
import { w3cwebsocket as WebSocket } from 'websocket';

import LoginPopup from '@solo-account/components/LoginPopup/LoginPopup';
import { isAuthenticatedAtom } from '@solo-account/store/atoms';
import { freebetCreditsAtomWithQuery } from '@solo-account/store/queries';
import { api } from '@solo-api/api';
import DevToolsPopup from '@solo-devtools/DevToolsPopup';
import { useWebsocketLogsDevTool } from '@solo-devtools/hooks';

import type Application from 'src/app';
import { useAppStateContext } from 'src/appState/AppState';
import { BettingTab } from 'src/common/enums';
import { getMaintenanceWebSocketUrl, isStandalone } from 'src/infra.client';
import MessageBoxWrapper from 'src/layouts/MessageBoxWrapper/MessageBoxWrapper';
import { request as getActiveSports } from 'src/modules/sports/actions/active';
import { request as getAllSports } from 'src/modules/sports/actions/get-list';
import { i18nextAtom } from 'src/store/i18next';
import { bettingAtom } from 'src/ui/betting/store/atoms';
import { setOpenMyBetsBettingTabTask } from 'src/ui/betting/store/tasks';
import Notifications from 'src/ui/content/Notifications/Notifications';
import GolfPopup from 'src/ui/sports/Golf';
import { SPORT_BOOK_MESSAGES } from 'src/utils/constants';
import { isTokenExpired } from 'src/utils/expiredToken';
import useUpdateUnleashContext from 'src/utils/hooks/useUpdateUnleashContext';
import isLocal from 'src/utils/isLocal';
import SendPostMessageWhenAllIsLoaded from 'src/utils/standalone/SendPostMessageWhenAllIsLoaded ';
import { IFRAME_ACTION_TYPE, LogStandaloneMessage } from 'src/utils/standalone/utils';

import MainWrapper from '../MainWrapper/MainWrapper';

const AppContent = () => {
    const dispatch = useDispatch();
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const setI18next = useSetAtom(i18nextAtom);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    const [reloaded, setReloaded] = useState(false);
    const { show_socket_logs } = useWebsocketLogsDevTool();
    const setMyBetsBettingTab = useRecoilCallback(setOpenMyBetsBettingTabTask, []);

    const establishWebSocketConnection = () => {
        const wsUrl = getMaintenanceWebSocketUrl();

        const socket = new WebSocket(wsUrl);

        socket.onmessage = (event) => {
            if (show_socket_logs) {
                console.warn('WebSocket message received:', event.data);
            }

            const data = JSON.parse(event.data.toString()); // Convert event.data to string
            const { maintenance } = data;

            if (maintenance !== undefined && Boolean(maintenance) && !reloaded) {
                setReloaded(true);
                window.location.reload();
            }
        };

        socket.onopen = () => {
            if (show_socket_logs) {
                console.warn('WebSocket connection opened');
            }

            if (isTokenExpired()) {
                console.warn('WebSocket refresh access token');
                api.refreshAccessToken();
            }
        };

        const reconnectDelay = 2000; // Define a constant for the delay duration

        socket.onclose = (event) => {
            if (show_socket_logs) {
                console.warn('WebSocket connection closed:', event);
            }

            // Reconnect after a short delay
            setTimeout(() => {
                establishWebSocketConnection();
            }, reconnectDelay); // Use the defined constant
        };

        socket.onerror = (error) => {
            if (show_socket_logs) {
                console.error('WebSocket error:', error);
            }
        };

        return socket;
    };

    useEffect(() => {
        setI18next({ t: getTranslation });
    }, [getTranslation]);

    useEffect(() => {
        const socket = establishWebSocketConnection();

        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        dispatch(getAllSports());
        dispatch(getActiveSports());
    }, []);

    useAtomValue(freebetCreditsAtomWithQuery);
    useUpdateUnleashContext();

    const openMyBets = window.$open_my_bets;

    useEffect(() => {
        if (!isStandalone() || openMyBets === undefined) {
            return;
        }

        if (openMyBets !== null && openMyBets) {
            setRecoil(bettingAtom, (state) => ({
                ...state,
                showMyBets: true,
                showMyBetsTab: false,
                showQuickBet: false,
                bettingTab: BettingTab.MyBets,
            }));
        }

        LogStandaloneMessage(IFRAME_ACTION_TYPE.info, `Open my betting tab`);
        window.$open_my_bets = undefined;
    }, [openMyBets, setMyBetsBettingTab]);

    const handleAppRenderDone = () => {
        const app: Application = window.$app;
        app.postExternalMessage(SPORT_BOOK_MESSAGES.render_done, {});
    };

    return (
        <>
            <MainWrapper />
            <MessageBoxWrapper />
            <DevToolsPopup />
            {isAuthenticated && <Notifications />}
            <GolfPopup />
            {isStandalone() && <SendPostMessageWhenAllIsLoaded appRenderDone={handleAppRenderDone} />}
            {isLocal() && <LoginPopup />}
        </>
    );
};

export default AppContent;
