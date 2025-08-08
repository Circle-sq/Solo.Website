export enum BetslipErrorCode {
    Related = 'related',
    SinglesOnly = 'singles-only',
    Started = 'started',
    Suspended = 'suspended',
    MinimumActiveSelectionsSingleTab = 'minimum-active-selections-single',
    MinimumActiveSelectionsMultiTab = 'minimum-active-selections-multi',
    OfferReferredToTrader = 'referred-bet-trader',
    OfferRejectedByTrader = 'rejected-bet-trader',
    OfferRejectedByCustomer = 'rejected-bet-customer',
    OddsChange = 'oddsChange',
    AcceptOdds = 'accept-odds',
    BalanceWarning = 'balance-warning',
    PanicModeEnabled = 'panic-mode-enabled',
    BuildABetMaximumSelections = 'build-a-bet-maximum-selections',
    BuildABetInPlayNotAllowed = 'buildABet-inPlay-not-allowed',
    InternalServerError = 'internal-server-error',
}

export enum MinMaxErrorCode {
    BelowMinimum = 'bet-stake-below-minimum',
    MaxPayout = 'bet-exceeds-max-payout',
    TooHigh = 'bet-stake-too-high',
}

export enum PriceErrorCode {
    Decreased = 'price-decreased',
    Increased = 'price-increased',
    ExternalPriceMissing = 'external-price-missing',
    ZeroWinExpectation = 'zero-win-expectation',
}

export enum SportsbookProviderErrorCode {
    AlreadyProcessed = 'already-processed',
    DifferentCurrencies = 'different-currencies',
    FailedToUpdateData = 'failed-to-update-data',
    GamingLimitsIssue = 'gaming-limits-issue',
    GeneralSystemError = 'general-system-error',
    InsufficientFunds = 'insufficient-funds',
    InvalidPlayer = 'invalid-player',
    InvalidPlayerIdAndFreeBetAmount = 'invalid-player-id-and-free-bet-amount',
    InvalidRequestParameters = 'invalid-request-parameters',
    InvalidUser = 'invalid-user',
    SessionExpiration = 'session-expiration',
    UserNotFound = 'user-not-found',
}

export enum ErrorResource {
    Account = 'Account',
    Cashout = 'Cashout',
    FreebetCredit = 'FreebetCredit',
    Bet = 'Bet',
    Leg = 'Leg',
    Event = 'Event',
    Market = 'Market',
    Selection = 'Selection',
    Wallet = 'Wallet',
}

export enum ErrorStartPointer {
    Bets = 'bets',
    Legs = 'legs',
    SelectedBets = 'selectedBets',
    Selection = 'selection',
    ValidForReferral = 'valid-for-referral',
}
