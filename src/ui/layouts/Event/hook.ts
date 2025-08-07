import { useEffect, useRef } from 'react';

import type { ValueStorage } from 'src/utils/StorageService';
import buildLocalStorageService from 'src/utils/StorageService';

import type { OnGoBackButtonClick, StorageGoBackBetSlipCounterValue } from './types';

export const useGoBack = ({ name, market }: OnGoBackButtonClick) => {
    const storageGoBackBetSlipCounter = window.localStorage;
    const storageGoBackBetSlipCounterValue =
        storageGoBackBetSlipCounter.getItem('goBackBetSlipCounter') &&
        JSON.parse(storageGoBackBetSlipCounter.getItem('goBackBetSlipCounter')!);
    const refBackBetSlipCounterStorage = useRef<ValueStorage<StorageGoBackBetSlipCounterValue>>();

    useEffect(() => {
        refBackBetSlipCounterStorage.current =
            buildLocalStorageService<StorageGoBackBetSlipCounterValue>('goBackBetSlipCounter');

        if (!storageGoBackBetSlipCounterValue || !market) {
            refBackBetSlipCounterStorage.current.setItem({
                routerName: name,
                selectedMarket: market,
                routerCounter: 2,
            });
        }
    }, []);

    useEffect(() => {
        if (market && market !== storageGoBackBetSlipCounterValue.selectedMarket) {
            refBackBetSlipCounterStorage.current?.setItem({
                routerName: name,
                selectedMarket: market,
                routerCounter: storageGoBackBetSlipCounterValue.routerCounter + 1,
            });
        }
    }, [name, market]);

    useEffect(() => {
        if (name && name !== 'event') {
            window.localStorage.setItem('cameFromRouteName', name);
        }
    }, [name]);
};
