import some from 'lodash/some';
import { useEffect, useMemo, useCallback, useRef } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';
import usePriceChange from 'src/utils/hooks/usePriceChange';

import { AlertType } from '../../../../enums';
import {
    speedBetBetslipErrorListAtom,
    speedBetSelectedMarketAtom,
    speedBetMarketsAtom,
    speedBetStakeAtom,
} from '../../../../store/atoms';
import { closeSpeedBetAlertTask, openSpeedBetAlertTask, resetSpeedBetMarketTask } from '../../../../store/tasks';
import { isMarketVisible } from '../../SpeedBetCards/utils';

import { alertMessages } from './alertMessages';
import { getAlertParams, isMarketsIdentical } from './utils';

const persistentErrorTypes = [AlertType.BalanceWarning];
const autoHideErrorTypes = [
    AlertType.BetSuccess,
    AlertType.BetError,
    AlertType.BetInfo,
    AlertType.MarketSuspension,
    AlertType.BetUpdated,
    AlertType.Default,
];

export const useSpeedBetAlertHandler = (type: AlertType) => {
    const betslipErrorList = useRecoilValue(speedBetBetslipErrorListAtom);
    const selectedMarket = useRecoilValue(speedBetSelectedMarketAtom);
    const speedBetMarkets = useRecoilValue(speedBetMarketsAtom);

    const prevSpeedBetMarketsRef = useRef(speedBetMarkets);

    const resetSpeedBetMarket = useRecoilCallback(resetSpeedBetMarketTask, []);
    const resetSpeedBetStake = useSetRecoilState(speedBetStakeAtom);
    const { priceDirection } = usePriceChange(selectedMarket?.selection?.price?.d);

    const openSpeedBetAlert = useRecoilCallback(openSpeedBetAlertTask, []);
    const closeSpeedBetAlert = useRecoilCallback(closeSpeedBetAlertTask, []);

    const setSpeedBetBetslipErrors = useSetRecoilState(speedBetBetslipErrorListAtom);

    const translatedCurrency = useTranslatedCurrency();

    const persistentErrors = betslipErrorList.filter((error) => persistentErrorTypes.includes(error.code as AlertType));

    const primaryError = persistentErrors[0];

    const isPersistentError = Boolean(primaryError);

    const hasVisibleMarkets = useMemo(() => some(speedBetMarkets.markets, isMarketVisible), [speedBetMarkets.markets]);

    const handleMarketSuspension = useCallback(() => {
        resetSpeedBetMarket();
        resetSpeedBetStake('');
        openSpeedBetAlert(AlertType.MarketSuspension);
    }, [resetSpeedBetMarket, resetSpeedBetStake, openSpeedBetAlert]);

    useEffect(() => {
        const prevSpeedBetMarkets = prevSpeedBetMarketsRef.current;

        // Display alert if current selected market is no longer available ( 1 market )
        if (selectedMarket !== null && !hasVisibleMarkets) {
            handleMarketSuspension();
        }

        // Display alert if current selected market is no longer available ( > 1 markets )
        if (
            selectedMarket !== null &&
            !isMarketsIdentical(speedBetMarkets?.markets, prevSpeedBetMarkets?.markets, selectedMarket.market?.id)
        ) {
            handleMarketSuspension();
        }

        prevSpeedBetMarketsRef.current = speedBetMarkets;
    }, [speedBetMarkets.markets]);

    useEffect(() => {
        if (priceDirection != null) {
            openSpeedBetAlert(AlertType.BetUpdated);
        }
    }, [priceDirection, openSpeedBetAlert]);

    useEffect(() => {
        if (selectedMarket === null && isPersistentError) {
            // Close only persistent alerts when no market is selected
            if (isPersistentError) {
                closeSpeedBetAlert();

                setSpeedBetBetslipErrors([]);

                return;
            }
        }

        if (primaryError) {
            const { code } = primaryError;

            if (persistentErrorTypes.includes(code as AlertType) || autoHideErrorTypes.includes(code as AlertType)) {
                // Open persistent or auto-hide alerts
                openSpeedBetAlert(code as AlertType);
            }
        } else if (!autoHideErrorTypes.includes(type)) {
            // Close all alerts if there are no errors and the alert is not auto-hide
            closeSpeedBetAlert();
        }
    }, [selectedMarket, primaryError, type, openSpeedBetAlert, closeSpeedBetAlert, isPersistentError]);

    const alertConfig = useMemo(() => {
        const { variant, label, message, icon, getParams } = alertMessages[type];
        const params = primaryError ? getAlertParams(primaryError, translatedCurrency, getParams) : {};

        return {
            variant,
            label,
            message,
            icon,
            params,
            isPersistentError,
            autoHide: autoHideErrorTypes.includes(type),
        };
    }, [isPersistentError, primaryError, translatedCurrency, type]);

    return { alertConfig };
};
