import React, { useContext } from 'react';
import { ToggleType } from './types';
import { type DevToolsContextType } from './types';

export const DevToolsContext = React.createContext<DevToolsContextType>({} as DevToolsContextType);

export const useSubscriptionDevTool = () => {
    const { state, toggle } = useContext(DevToolsContext);

    return {
        show_logs: state.show_socket_subscriptions_logs,
        show_socket_subscriptions: state.show_socket_subscriptions,
        toggle: () => toggle(ToggleType.TOGGLE_DEBUG_SUBSCRIPTIONS),
        toggleLogs: () => toggle(ToggleType.TOGGLE_DEBUG_SUBSCRIPTIONS_LOGS),
    };
};

export const useBannersDevTool = () => {
    const { state, toggle } = useContext(DevToolsContext);

    return {
        debug_banners: state.debug_banners,
        toggle: () => toggle(ToggleType.TOGGLE_DEBUG_BANNERS),
    };
};

export const useWebsocketLogsDevTool = () => {
    const { state, toggle } = useContext(DevToolsContext);

    return {
        show_socket_logs: state.show_socket_logs,
        toggle: () => toggle(ToggleType.TOGGLE_WEBSOCKET_LOGS),
    };
};

export const useQueryDebugTool = () => {
    const { state, toggle } = useContext(DevToolsContext);

    return {
        query_debug_tool: state.query_debug_tool,
        toggle: () => toggle(ToggleType.TOGGLE_QUERY_DEBUG_TOOL),
    };
};
