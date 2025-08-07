import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';

import { unleashClient } from '../client';

import { unleashClientAtom } from './unleashClientAtom';
import { type FeatureFlags, getFeatureFlags } from './utils';

export const featureFlagsAtom = atomWithDefault<FeatureFlags>((get) => {
    const client = get(unleashClientAtom);

    return getFeatureFlags(client);
});

featureFlagsAtom.onMount = (setSelf) => {
    const updateFeatureFlags = () => {
        setSelf(getFeatureFlags(unleashClient));
    };

    unleashClient.on('update', updateFeatureFlags);

    return () => {
        unleashClient.off('update', updateFeatureFlags);
    };
};

export const asianInPlayHandicapLineFlagAtom = atom((get) => {
    const { asianInPlayHandicapLineFlag } = get(featureFlagsAtom);

    return asianInPlayHandicapLineFlag;
});

export const asianViewFlagAtom = atom((get) => {
    const { asianViewFlag } = get(featureFlagsAtom);

    return asianViewFlag;
});

export const betLinkGolfFlagAtom = atom((get) => {
    const { betLinkGolfFlag } = get(featureFlagsAtom);

    return betLinkGolfFlag;
});

export const chineseLangSupportFlagAtom = atom((get) => {
    const { chineseLangSupportFlag } = get(featureFlagsAtom);

    return chineseLangSupportFlag;
});

export const japaneseLangSupportFlagAtom = atom((get) => {
    const { japaneseLangSupportFlag } = get(featureFlagsAtom);

    return japaneseLangSupportFlag;
});

export const searchFlagSelector = atom((get) => {
    const { searchFlag } = get(featureFlagsAtom);

    return searchFlag;
});

export const speedBetFlagAtom = atom((get) => {
    const { speedBetFlag } = get(featureFlagsAtom);

    return speedBetFlag;
});

export const inPlayLHNFlagAtom = atom((get) => {
    const { inPlayLHNFlag } = get(featureFlagsAtom);

    return inPlayLHNFlag;
});
