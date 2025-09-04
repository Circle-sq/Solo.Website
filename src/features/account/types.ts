import type { BetslipCashout, BetslipOdds, OddsFormat, OddsFormatLong } from 'src/common/enums';
import type { CurrencyType } from 'src/config/types';

export interface SessionPayload {
    email?: string;
    password?: string;
    externalToken?: string;
    externalJwt?: string;
    platformId?: string;
}

export interface Session {
    token: string;
    refresh_token: string;
    expires?: string;
}

export interface UserCurrenciesData {
    account: Account;
    balances: Wallet[];
    brandId: string | null;
    code: string;
    createdAt: string;
    externalId: string;
    firstBetPlaced: boolean;
    id: number;
    lastBetAt: string;
    universe: string;
    updatedAt: string;
}

export interface Wallet {
    balance: number;
    createdAt: string;
    currency: CurrencyType;
    fundsLocked: number;
    id: number;
    operatorAccumulatedProfit: number;
    operatorBalance: number;
    operatorExternalProfit: number;
    operatorProfit: number;
    playableBalance: number;
    profit: number;
    updatedAt: string;
    withdrawableBalance: number;
}

export interface UserData {
    brandId: string | null;
    brandName: string | null;
    cashoutAcceptMode: BetslipCashout;
    cashoutEnabled: boolean;
    country: string;
    crossInfoDismiss: boolean;
    currency: string;
    externalId: string;
    id: number;
    loggedTime: number;
    oddsFormat: OddsFormatLong;
    oddsUpdate: BetslipOdds;
    openBets: number;
    wallet: Wallet;
}

export interface Account {
    addressLine1: string;
    addressLine2: string | null;
    affiliate: string | null;
    birthDate: string;
    brandId: string | null;
    brandName: string | null;
    city: string;
    commission: boolean;
    country: string;
    county: string | null;
    coupon: boolean;
    email: string;
    externalId: string;
    firstName: string;
    id: number;
    incomeaccess: string | null;
    name: string;
    platformId: string;
    postCode: string;
    stakeFactor: number;
    status: string;
    surname: string;
    title: string;
    type: string;
}

export interface FreebetBonusCredit {
    amount: number;
    description: string;
    expiryDate: string;
    id: number;
    languageDescription: string;
}

export interface FreebetCredits {
    bonusCredits: FreebetBonusCredit[];
    totalAmount: number;
}

export interface UserSettings {
    balanceInHeader: boolean;
    oddsFormat: OddsFormat;
    dateFormat: string;
    shortDateFormat: string;
    language?: string;
}
