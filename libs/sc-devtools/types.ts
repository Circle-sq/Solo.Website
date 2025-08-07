export interface DevToolsState {
    show_socket_subscriptions_logs: boolean;
    show_socket_subscriptions: boolean;
    debug_banners: boolean;
    show_socket_logs: boolean;
    query_debug_tool: boolean;
}
export interface DevToolsContextType {
    toggle: (type: ToggleType) => void;
    state: DevToolsState;
}
export enum ToggleType {
    TOGGLE_DEBUG_SUBSCRIPTIONS_LOGS = 'TOGGLE_DEBUG_WS_SUBSCRIPTIONS_LOGS',
    TOGGLE_DEBUG_SUBSCRIPTIONS = 'TOGGLE_DEBUG_WS_SUBSCRIPTIONS',
    TOGGLE_DEBUG_BANNERS = 'TOGGLE_DEBUG_BANNERS',
    TOGGLE_WEBSOCKET_LOGS = 'TOGGLE_WEBSOCKET_LOGS',
    TOGGLE_QUERY_DEBUG_TOOL = 'TOGGLE_QUERY_DEBUG_TOOL',
}
export interface DevToolsAction {
    type: ToggleType;
}
