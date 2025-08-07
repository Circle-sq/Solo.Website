import { useAtomValue } from 'jotai';

import {
    asianInPlayHandicapLineFlagAtom,
    asianViewFlagAtom,
    betLinkGolfFlagAtom,
    chineseLangSupportFlagAtom,
    japaneseLangSupportFlagAtom,
    speedBetFlagAtom,
    inPlayLHNFlagAtom,
} from './store/featureFlags';

export const useAsianInPlayHandicapLineFlag = () => useAtomValue(asianInPlayHandicapLineFlagAtom);

export const useAsianViewFlag = () => useAtomValue(asianViewFlagAtom);

export const useBetLinkGolfFlag = () => useAtomValue(betLinkGolfFlagAtom);

export const useChineseLangSupportFlag = () => useAtomValue(chineseLangSupportFlagAtom);

export const useJapaneseLangSupportFlag = () => useAtomValue(japaneseLangSupportFlagAtom);

export const useSpeedBetFlag = () => useAtomValue(speedBetFlagAtom);

export const useInPlayLHNFlag = () => useAtomValue(inPlayLHNFlagAtom);
