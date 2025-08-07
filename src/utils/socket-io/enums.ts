export enum AuthStatus {
    Ok = 'ok',
    Error = 'error',
}

export enum ConnectionStatus {
    Disconnected = 'disconnected',
    Connecting = 'connecting',
    Connected = 'connected',
    Error = 'error',
}

export enum EventName {
    Auth = 'auth',
    AuthError = 'auth_error',
    Connect = 'connect',
    Disconnect = 'disconnect',
    Error = 'error',
    Reconnect = 'reconnect',
    ReconnectAttempt = 'reconnect_attempt',
    ReconnectError = 'reconnect_error',
    ReconnectFailed = 'reconnect_failed',
    Subscribe = 'subscribe',
    Unsubscribe = 'unsubscribe',
    Typing = 'typing',
}

export enum WsChannel {
    Cashout = '*:Cashout',
    Event = '*:Event',
    Market = '*:Market',
    Stream = '*:Stream',
    Bets = 'Bets',
    ReferredBets = 'RefBet',
    Wallet = 'Wallet',
}

export enum WsMessageType {
    EventFeedStatisticsUpdate = 'EventFeedStatisticsUpdate',
    EventMarketCreated = 'EventMarketCreated',
    EventMarketMainLineUpdate = 'EventMarketMainLineUpdate',
    EventMediaUpdate = 'EventMediaUpdate',
    EventStatusUpdate = 'EventStatusUpdate',
    EventStreamUpdate = 'EventStreamUpdate',
    EventTagUpdate = 'EventTagUpdate',
    EventTimeSettingsUpdate = 'EventTimeSettingsUpdate',
    MarketBetLimits = 'MarketBetLimits',
    MarketCashoutSettingsUpdate = 'MarketCashoutSettingsUpdate',
    MarketDisplayOrderUpdate = 'MarketDisplayOrderUpdate',
    MarketEachWayUpdate = 'MarketEachWayUpdate',
    MarketFeedSettingsUpdate = 'MarketFeedSettingsUpdate',
    MarketInPlaySettings = 'MarketInPlaySettings',
    MarketSettingsUpdate = 'MarketSettingsUpdate',
    MarketStatusUpdate = 'MarketStatusUpdate',
    MarketTagUpdate = 'MarketTagUpdate',
    SelectionCreated = 'SelectionCreated',
    SelectionFeedSettingsUpdate = 'SelectionFeedSettingsUpdate',
    SelectionPriceChange = 'SelectionPriceChange',
    SelectionStatusUpdate = 'SelectionStatusUpdate',
    SelectionTagUpdate = 'SelectionTagUpdate',
    SelectionsBetLimitsUpdate = 'SelectionsBetLimitsUpdate',
    Update = 'UPDATE',
}

export enum SocketHostKey {
    General = 'websocket_host',
    Cashout = 'cashout_websocket_host',
}

export enum SocketHostType {
    General = 'General',
    Cashout = 'Cashout',
}
