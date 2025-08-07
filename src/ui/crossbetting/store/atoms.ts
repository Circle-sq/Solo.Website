import { atom } from 'recoil';

import { PersistKey, recoilPersist } from 'src/common/recoil/persist';
import { MARKET_TEMPLATE } from 'src/utils/constants';

const { persistAtom } = recoilPersist(PersistKey.CrossBetPage);

export const showCrossBetMobileFiltersAtom = atom<boolean>({
    key: 'showCrossBetMobileFiltersAtom',
    default: false,
    effects: [persistAtom],
});

export const isLoadingFiltersEventsAtom = atom<boolean>({
    key: 'isLoadingFiltersEventsAtom',
    default: false,
});

export const selectedDayAtom = atom<number | null>({
    key: 'selectedDay',
    default: null,
});

export const selectedSportAtom = atom({
    key: 'selectedSport',
    default: '',
});

export const selectedMarketTypeAtom = atom<string[]>({
    key: 'selectedMarketType',
    default: [MARKET_TEMPLATE.default],
});

export const specialsToggleAtom = atom<boolean>({
    key: 'specialsMarketToggle',
    default: true,
});

export const hasSpecificSportEventAtom = atom<boolean>({
    key: 'hasSpecificSportEventAtom',
    default: false,
});

export const selectedEventCardMarketTypeAtom = atom<string[]>({
    key: 'selectedEventCardMarketType',
    default: [MARKET_TEMPLATE.default],
});

export interface MarketTypeOption {
    id: string[];
    label: string;
    isDisabled: boolean;
    hasEvents: boolean;
}

const marketTypeOptions = [
    { id: [MARKET_TEMPLATE.default], label: 'All', isDisabled: false, hasEvents: true },
    {
        id: [MARKET_TEMPLATE.twoWayWinner, MARKET_TEMPLATE.threeWayWinner],
        label: 'Winner',
        isDisabled: false,
        hasEvents: true,
    },
    {
        id: [MARKET_TEMPLATE.twoWayHandicap, MARKET_TEMPLATE.threeWayHandicap],
        label: 'Handicap',
        isDisabled: false,
        hasEvents: true,
    },
    { id: [MARKET_TEMPLATE.overunder], label: 'Over/Under', isDisabled: false, hasEvents: true },
];

export const marketTypeOptionsAtom = atom<MarketTypeOption[]>({
    key: 'marketTypeOptions',
    default: [...marketTypeOptions],
});

export const sportTypeAtom = atom<string>({
    key: 'sportType',
    default: '',
});
