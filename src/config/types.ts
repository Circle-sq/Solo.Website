import type { CryptoCurrency, Currency } from '../common/enums';

export type CurrencyType = CryptoCurrency | Currency;

export interface CountriesById {
    [countryCode: string]: string;
}

export interface SportIcons {
    [sportName: string]: string;
}
