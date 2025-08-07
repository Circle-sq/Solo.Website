export enum BettingTab {
    Betslip = 'betslip',
    MyBets = 'my_bets',
}

export enum BetslipTab {
    Single = 'single',
    Multi = 'multi',
    System = 'system',
}

export enum Currency {
    EUR = 'EUR',
    GBP = 'GBP',
    KRW = 'KRW',
    USD = 'USD',
    XTS = 'XTS',
    JPY = 'JPY',
}

export enum CryptoCurrency {
    BTC = 'BTC',
    ETH = 'ETH',
    USDT = 'USDT',
    USDC = 'USDC',
    LTC = 'LTC',
    BCH = 'BCH',
    XRP = 'XRP',
    METH = 'mETH',
    MBTC = 'mBTC',
    MBCH = 'mBCH',
    UBTC = 'uBTC',
    MLTC = 'mLTC',
}

export enum CurrencySymbol {
    EUR = '€',
    GBP = '£',
    KRW = '₩',
    NZD = '$',
    CAD = '$',
    USD = '$',
    XTS = 'X',
    JPY = '¥',
    BTC = '₿',
    ETH = 'Ξ',
    USDT = 'USDT',
    USDC = 'USDC',
    LTC = 'Ł',
    BCH = 'BCH',
    XRP = 'XRP',
    METH = 'mETH',
    MBTC = 'mBTC',
    MBCH = 'mBCH',
    UBTC = 'uBTC',
    MLTC = 'mLTC',
}

export enum BetType {
    Single = 'SGL',
    Double = 'DBL',
    Treble = 'TBL',
}

export enum PlacedBetType {
    Single = 'single',
    Multi = 'multi',
    System = 'system',
}

export enum LegType {
    BuildABet = 'buildABet',
    CrossBet = 'crossBet',
    Standard = 'standard',
}

export enum CastBetType {
    FC = 'FC',
    RFC = 'RFC',
    CFC = 'CFC',
    TC = 'TC',
    CTC = 'CTC',
}

export enum MyBetsTab {
    Live = 'live',
    CashOut = 'cash_out',
    Settled = 'settled',
}

export enum BetStatus {
    Open = 'open',
    Settled = 'settled',
    Cancelled = 'cancelled',
    CashOut = 'cash_out',
    Lose = 'lose',
    Lost = 'lost',
    Resulted = 'resulted',
    HalfWon = 'halfwon',
    HalfLost = 'halflost',
    Void = 'void',
    Push = 'push',
    Won = 'won',
    Parked = 'parked',
    Failed = 'failed',
    Unsettled = 'unsettled',
}

export enum OddsFormat {
    Decimal = 'd',
    Fractional = 'f',
}

export enum OddsFormatLong {
    Decimal = 'decimal',
    Fractional = 'fractional',
}

export enum BetslipOdds {
    AcceptOdds = 'accept-odds',
    AcceptHigherOdds = 'accept-higher-odds',
    DontAcceptOdds = 'dont-accept-odds',
}

export enum BetslipCashout {
    HigherCashout = 'accept-higher-cashout',
    AnyCashout = 'accept-any-cashout',
}

export enum OfferUser {
    Customer = 'customer',
    Staff = 'staff',
}

export enum OfferStatus {
    Request = 'request',
    Assigned = 'assigned',
    Offered = 'offered',
    Accept = 'accept',
    Reject = 'reject',
    Timeout = 'timeout',
    Offer = 'offer',
}

export enum RequestStatus {
    InProgress = 'IN_PROGRESS',
    Progress = 'PROGRESS',
    Error = 'ERROR',
    Ready = 'READY',
}

export enum SportType {
    All = 'all',
    Football = 'football',
    Baseball = 'baseball',
    Basketball = 'basketball',
    Tennis = 'tennis',
    AmericanFootball = 'americanfootball',
    Archery = 'archery',
    Athletics = 'athletics',
    IceHockey = 'icehockey',
    Volleyball = 'volleyball',
    Snooker = 'snooker',
    Handball = 'handball',
    TableTennis = 'tabletennis',
    Taekwondo = 'taekwondo',
    Darts = 'darts',
    Golf = 'golf',
    BetlinkGolf = 'betlinkgolf',
    HorseRacing = 'horseracing',
    Badminton = 'badminton',
    BeachVolleyball = 'beachvolleyball',
    Boxing = 'boxing',
    CombatSports = 'combatsports',
    FormulaOne = 'formulaone',
    Futsal = 'futsal',
    MotorBikes = 'motorbikes',
    RugbyLeague = 'rugbyleague',
    RugbyUnion = 'rugbyunion',
    OlympicGames = 'olympicgames',
    Specials = 'specials',
    CsGo = 'csgo',
    Dota2 = 'dota2',
    LeagueOfLegends = 'lol',
    StarCraft = 'starcraft',
    ESoccer = 'esoccer',
}

export const SpecialMarketsSports = [SportType.Football, SportType.Baseball, SportType.Basketball];

export enum RouteName {
    Homepage = 'homepage',
    AsianView = 'asian-view',
    Sport = 'sport',
    CrossBetting = 'crossbetting',
    InPlay = 'inplay',
    MyBets = 'my-bets',
    Country = 'country',
    Competition = 'competition',
    Event = 'event',
    Betting = 'betting',
    LiveStream = 'live-stream',
    AllCountries = 'allcountries',
    Error = 'error',
}

export enum TypeLineName {
    uniform = 'uniform',
    default = 'default',
}

export enum IconPositionTypes {
    TOP = 'top',
    CENTER = 'center',
    BOTTOM = 'bottom',
}

export enum IconCategory {
    Competitions = 'competitions',
    CompetitionLocations = 'competition-locations',
    Sports = 'sports',
}

export enum SelectionIdentifier {
    Home = 'H',
    Away = 'A',
    Draw = 'D',
    Over = 'O',
    Under = 'U',
    Goal = 'G',
    Yes = 'Y',
    No = 'N',
    Spread = 'spread',
    MoneyLine = 'money-line',
    Total = 'total',
}

export enum PriceChange {
    Up = 'up',
    Down = 'down',
}

export enum StreamProviders {
    Img = 'img',
    Perform = 'perform',
    BetRadar = 'bet-radar',
    GLive = 'g-live',
    BetGenius = 'bet-genius',
    Bayes = 'bayes',
}

export enum TurnValue {
    Team01 = 'Team01',
    Team02 = 'Team02',
}

export enum LiveTrackerProviders {
    BetRadar = 'betradar',
    Bayes = 'bayes',
    LSports = 'lsports',
}

export enum DeviceType {
    DESKTOP = 'DESKTOP',
    TABLET = 'TABLET',
    MOBILE = 'MOBILE',
}

export enum NotificationType {
    Banner = 'banner',
    Popup = 'pop-up',
}

export enum NotificationTitle {
    Cash = 'cash',
    FunMode = 'fun_mode',
    Both = 'both',
}

export enum ModalRouteName {
    GroupedSports = 'grouped-sports',
    LiveGroupedSports = 'live-grouped-sports',
    LiveGroupedSportsTennisTour = 'live-grouped-sports-tennis-tour',
    Betfinder = 'betfinder',
    MyBets = 'my-bets',
    Betslip = 'betslip',
    InPlayStreamsCount = 'in-play-streams-count',
}

export enum ThemeNames {
    Dark = 'dark',
    Dark2 = 'dark2',
    Media = 'media',
}

export enum DropdownMenuPlacement {
    Bottom = 'bottom',
    Top = 'top',
    Auto = 'auto',
}

export enum SportTab {
    Sports = 'sport',
    Cross = 'crossbetting',
    Live = 'inplay',
}

export enum NavigatorPlatforms {
    iphone = 'iPhone',
}

export enum NavPanels {
    Sports = 'sports',
    Highlights = 'popular',
    Countries = 'sports-countries',
}
