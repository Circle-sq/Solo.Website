import { atom } from 'jotai';

import { BetslipCashout, BetslipOdds, Currency, OddsFormat, OddsFormatLong } from 'src/common/enums';
import { getLongOddsFormat } from 'src/utils/common';

import { userDataAtom, userSettingsAtom } from './atoms';

export const userIdSelector = atom((get) => {
    const userData = get(userDataAtom);

    return userData?.id ?? null;
});

export const brandNameSelector = atom((get) => {
    const userData = get(userDataAtom);

    return userData?.brandName ?? null;
});

export const cashoutAcceptModeSelector = atom((get) => {
    const userData = get(userDataAtom);

    return userData?.cashoutAcceptMode ?? BetslipCashout.HigherCashout;
});

export const cashoutEnabledSelector = atom((get) => {
    const userData = get(userDataAtom);

    return userData?.cashoutEnabled ?? false;
});

export const oddsFormatSelector = atom((get) => {
    const userData = get(userDataAtom);
    const userSettings = get(userSettingsAtom);
    const defaultFormat = getLongOddsFormat(userSettings?.oddsFormat ?? OddsFormat.Decimal);

    return userData?.oddsFormat ?? defaultFormat;
});

export const isDecimalOddsFormatSelector = atom((get) => {
    const oddsFormat = get(oddsFormatSelector);

    return oddsFormat === OddsFormatLong.Decimal;
});

export const isFractionalOddsFormatSelector = atom((get) => {
    const oddsFormat = get(oddsFormatSelector);

    return oddsFormat === OddsFormatLong.Fractional;
});

export const oddsUpdateSelector = atom((get) => {
    const userData = get(userDataAtom);

    return userData?.oddsUpdate ?? BetslipOdds.AcceptOdds;
});

export const walletSelector = atom((get) => {
    const userData = get(userDataAtom);

    return userData?.wallet ?? null;
});

export const currencySelector = atom((get) => {
    const wallet = get(walletSelector);

    return wallet?.currency ?? Currency.GBP;
});

export const playableBalanceSelector = atom((get) => {
    const wallet = get(walletSelector);

    return wallet?.playableBalance ?? 0;
});

export const balanceInHeaderSelector = atom((get) => {
    const userSettings = get(userSettingsAtom);

    return userSettings?.balanceInHeader ?? true;
});
