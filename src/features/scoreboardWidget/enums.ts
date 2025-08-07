export enum SpeedBetStatus {
    ComingSoon = 'coming-soon',
    NotAvailable = 'not-available',
}

export enum SpeedBetTab {
    SpeedBet = 'speed_bet',
    Statistics = 'statistics',
}

export enum AlertType {
    BetSuccess = 'success',
    BetError = 'error',
    BetInfo = 'info',
    BetUpdated = 'updated',
    Default = 'default',
    BalanceWarning = 'minimum',
    MarketSuspension = 'market_suspension',
}

export enum MinMaxErrorCode {
    BelowMinimum = 'bet-stake-below-minimum',
    TooHigh = 'bet-stake-too-high',
    MaxPayout = 'bet-exceeds-max-payout',
}

export enum AlertVariant {
    Success = 'success',
    Error = 'error',
    Info = 'info',
    Default = 'default',
}

export enum PresetActions {
    Previous = 'previous',
    Double = 'double',
    Max = 'max',
}

export enum Direction {
    Next = 'next',
    Previous = 'previous',
}
