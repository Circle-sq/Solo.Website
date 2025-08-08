import { atom } from 'recoil';

import type { Problem } from '@solo-betslip/api/types/problem';

import type { SportType } from 'src/common/enums';
import type { EventItem } from 'src/common/types/event';

import { DEFAULT_STAKE } from '../constants';
import { AlertType, SpeedBetTab } from '../enums';
import type { SpeedBetMarkets, SpeedBetAlertType, SpeedBetMarketSelection } from '../types';

export const speedBetMarketsDefaultValue: SpeedBetMarkets = {
    ids: new Set(),
    markets: [],
};

export const speedBetActiveTabAtom = atom<SpeedBetTab>({
    key: 'speedBetActiveTabAtom',
    default: SpeedBetTab.SpeedBet,
});

export const speedBetSportAtom = atom<SportType>({
    key: 'speedBetSportAtom',
    default: undefined,
});

export const speedBetEventAtom = atom<Partial<EventItem | undefined>>({
    key: 'speedBetEventAtom',
    default: undefined,
});

export const speedBetMarketsAtom = atom<SpeedBetMarkets>({
    key: 'speedBetMarketsAtom',
    default: speedBetMarketsDefaultValue,
});

export const speedBetSelectedMarketAtom = atom<SpeedBetMarketSelection | null>({
    key: 'speedBetSelectedMarketAtom',
    default: null,
});

export const speedBetStakeAtom = atom<string>({
    key: 'speedBetStakeAtom',
    default: DEFAULT_STAKE,
});

export const previousSpeedBetStakeAtom = atom<string>({
    key: 'previousSpeedBetStakeAtom',
    default: '',
});

export const speedBetAlertAtom = atom<SpeedBetAlertType>({
    key: 'speedBetAlertAtom',
    default: {
        open: false,
        type: AlertType.Default,
    },
});

export const possibleBetsAtom = atom({
    key: 'possibleBetsAtom',
    default: {},
});

export const isDisabledNumpadAtom = atom({
    key: 'isDisabledNumpad',
    default: false,
});

export const speedBetBetslipErrorListAtom = atom<Problem[]>({
    key: 'speedBetBetslipErrorListAtom',
    default: [],
});

export const isPossibleBetsLoadingAtom = atom<boolean>({
    key: 'isPossibleBetsLoadingAtom',
    default: false,
});
