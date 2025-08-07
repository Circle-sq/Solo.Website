import { useAtomValue } from 'jotai';

import { isAuthenticatedAtom } from '@sc-account/store/atoms';
import { currencySelector } from '@sc-account/store/selectors';

import { useAppStateContext } from 'src/appState/AppState';
import { getCurrencyTranslations } from 'src/appState/translation-helper';
import { guestCurrencyAtom } from 'src/utils/standalone/store/atom';

const useTranslatedCurrency = (): string => {
    const {
        language: { getTranslation },
    } = useAppStateContext();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const guestCurrency = useAtomValue(guestCurrencyAtom);
    const currency = useAtomValue(currencySelector);

    const currencyLabel = getCurrencyTranslations(getTranslation);

    const currencyTranslatedLabel = isAuthenticated ? currencyLabel[currency] : currencyLabel[guestCurrency];

    return currencyTranslatedLabel || currency;
};

export default useTranslatedCurrency;
