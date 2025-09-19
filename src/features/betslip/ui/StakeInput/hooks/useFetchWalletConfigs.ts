import { useQuery } from '@tanstack/react-query';
import get from 'lodash/get';

import { api } from '@solo-api/api';

import { Currency } from 'src/common/enums';

export enum CurrencyType {
    Fiat = 'fiat',
    Crypto = 'crypto',
}

interface CurrencyData {
    precision: number;
    roundingMode: string;
    active: boolean;
    currencyType: CurrencyType;
}

interface CurrencyConfig {
    [key: string]: CurrencyData;
}

export interface WalletConfig {
    currency: string;
    currencyConfig: CurrencyConfig;
}

const useFetchWalletConfigs = (currency = Currency.GBP) => {
    const getWalletConfigs = async () => {
        return api.get<WalletConfig>('/wallet-configs');
    };

    const { data: walletConfigs, isLoading } = useQuery<WalletConfig>({
        queryKey: ['wallet-configs'],
        queryFn: getWalletConfigs,
    });

    const currencyDecimalPrecision = get(walletConfigs, ['currencyConfig', currency, 'precision']);
    const currencyType = get(walletConfigs, ['currencyConfig', currency, 'currencyType']);

    return { walletConfigs, isLoading, currencyDecimalPrecision, currencyType };
};

export default useFetchWalletConfigs;
