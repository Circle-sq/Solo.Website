import mergeWith from 'lodash/mergeWith';
import { type PropsWithChildren, useMemo } from 'react';
import { useReducer } from 'react';

// NXTODO vandries move StorageService to (new) @solo-utils library
import buildStorageService from 'src/utils/StorageService';

import { DevToolsContext } from './hooks';
import { ToggleType, type DevToolsAction, type DevToolsState } from './types';

const toggleProp = (state: DevToolsState, prop: keyof DevToolsState, syncWithLocalStorage = true): DevToolsState => {
    const propNewValue = !state[prop];

    if (syncWithLocalStorage) {
        localStorage.setItem(`devtools.${prop}`, JSON.stringify(propNewValue));
    }

    return {
        ...state,
        [prop]: propNewValue,
    };
};

function devToolsReducer(state: DevToolsState, action: DevToolsAction): DevToolsState {
    const { type } = action;

    switch (action.type) {
        case ToggleType.TOGGLE_DEBUG_SUBSCRIPTIONS: {
            return toggleProp(state, 'show_socket_subscriptions');
        }

        case ToggleType.TOGGLE_DEBUG_SUBSCRIPTIONS_LOGS: {
            return toggleProp(state, 'show_socket_subscriptions_logs');
        }

        case ToggleType.TOGGLE_WEBSOCKET_LOGS: {
            return toggleProp(state, 'show_socket_logs');
        }

        case ToggleType.TOGGLE_DEBUG_BANNERS: {
            return toggleProp(state, 'debug_banners');
        }

        case ToggleType.TOGGLE_QUERY_DEBUG_TOOL: {
            return toggleProp(state, 'query_debug_tool');
        }

        default: {
            throw new Error(`Unhandled action type: ${type}`);
        }
    }
}

const defaultState: DevToolsState = {
    show_socket_subscriptions: false,
    show_socket_subscriptions_logs: false,
    debug_banners: false,
    query_debug_tool: false,
    show_socket_logs: false,
};

const WS_SUBSCRIPTION_KEY = 'show_socket_subscriptions';

export function DevToolsProvider(props: PropsWithChildren<{ initState?: Partial<DevToolsState> }>) {
    const bannersDebugOn = buildStorageService<boolean>('devtools.debug_banners').getItem();
    const socketSubscribeDebugOn = buildStorageService<boolean>(`devtools.${WS_SUBSCRIPTION_KEY}`).getItem();
    const socketSubscribeLogsDebugOn = buildStorageService<boolean>(`devtools.${WS_SUBSCRIPTION_KEY}_logs`).getItem();
    const socketMessagesDebugOn = buildStorageService<boolean>('devtools.show_socket_logs').getItem();
    const queryDebugToolOn = buildStorageService<boolean>('devtools.query_debug_tool').getItem();
    const stateFromLocalStorage: Partial<Record<keyof DevToolsState, boolean>> = {};

    if (bannersDebugOn !== null) {
        stateFromLocalStorage.debug_banners = bannersDebugOn;
    }

    if (socketSubscribeDebugOn !== null) {
        stateFromLocalStorage.show_socket_subscriptions = socketSubscribeDebugOn;
    }

    if (socketSubscribeLogsDebugOn !== null) {
        stateFromLocalStorage.show_socket_subscriptions_logs = socketSubscribeLogsDebugOn;
    }

    if (socketMessagesDebugOn !== null) {
        stateFromLocalStorage.show_socket_logs = socketMessagesDebugOn;
    }

    if (queryDebugToolOn !== null) {
        stateFromLocalStorage.query_debug_tool = queryDebugToolOn;
    }

    const allSate = mergeWith({}, defaultState, stateFromLocalStorage, props.initState, (a: unknown, b: unknown) =>
        b === null ? a : undefined,
    ) as DevToolsState;

    const [state, dispatch] = useReducer(devToolsReducer, allSate);

    const toggle = (type: ToggleType) => dispatch({ type });
    const value = useMemo(() => ({ state, toggle }), [state]);

    return <DevToolsContext.Provider value={value}>{props.children}</DevToolsContext.Provider>;
}
