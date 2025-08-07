import findIndex from 'lodash/findIndex';
import findLastIndex from 'lodash/findLastIndex';
import slice from 'lodash/slice';
import type { CallbackInterface } from 'recoil';

import type { SpeedBetTab } from '../enums';
import { AlertType } from '../enums';
import type { SpeedBetMarketSelection } from '../types';
import { isMarketVisible } from '../ui/SpeedBet/SpeedBetCards/utils';

import {
    speedBetActiveTabAtom,
    speedBetStakeAtom,
    speedBetAlertAtom,
    speedBetSelectedMarketAtom,
    speedBetMarketsAtom,
    isDisabledNumpadAtom,
    possibleBetsAtom,
    speedBetBetslipErrorListAtom,
} from './atoms';

export const setSpeedBetTabTask =
    ({ set }: CallbackInterface) =>
    (speedBetTab: SpeedBetTab) => {
        set(speedBetActiveTabAtom, speedBetTab);
    };

export const setSpeedBetStakeTask =
    ({ set }: CallbackInterface) =>
    (value: string) =>
        set(speedBetStakeAtom, value);

export const openSpeedBetAlertTask =
    ({ set }: CallbackInterface) =>
    (type: AlertType) => {
        set(speedBetAlertAtom, (state) => ({ ...state, open: true, type }));
    };

export const closeSpeedBetAlertTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(speedBetAlertAtom, (state) => ({ ...state, open: false, type: AlertType.Default }));
    };

export const setSpeedBetMarketTask =
    ({ set }: CallbackInterface) =>
    (market: SpeedBetMarketSelection) => {
        set(speedBetSelectedMarketAtom, market);
    };

export const resetSpeedBetMarketTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(speedBetSelectedMarketAtom, null);
    };

export const resetSpeedBetMarketSelectionTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(speedBetSelectedMarketAtom, null);
        set(speedBetStakeAtom, '');
        set(speedBetAlertAtom, (state) => ({ ...state, open: false, type: AlertType.Default }));
        set(speedBetBetslipErrorListAtom, []);
        set(possibleBetsAtom, {});
    };

export const moveFirstToLastSpeedMarketTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(speedBetMarketsAtom, (prevState) => {
            const { markets } = prevState;

            const firstValidIndex = findIndex(markets, isMarketVisible);

            if (firstValidIndex === -1) {
                return prevState;
            }

            const rotatedMarkets = [...slice(markets, firstValidIndex + 1), ...slice(markets, 0, firstValidIndex + 1)];

            return {
                ...prevState,
                markets: rotatedMarkets,
            };
        });
    };

export const moveLastToFirstSpeedMarketTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(speedBetMarketsAtom, (prev) => {
            const { markets } = prev;

            const lastValidIndex = findLastIndex(markets, isMarketVisible);

            if (lastValidIndex === -1) {
                return prev;
            }

            const rotatedMarkets = [
                markets[lastValidIndex],
                ...slice(markets, 0, lastValidIndex),
                ...slice(markets, lastValidIndex + 1),
            ];

            return { ...prev, markets: rotatedMarkets };
        });
    };

export const setIsDisabledNumpadTask =
    ({ set }: CallbackInterface) =>
    (value: boolean) => {
        set(isDisabledNumpadAtom, value);
    };
