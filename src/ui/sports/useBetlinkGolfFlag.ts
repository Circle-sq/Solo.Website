import { useBetLinkGolfFlag } from '@sc-feature-flags';
import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

import { isAuthenticatedAtom } from '@sc-account/store/atoms';

import { useAppStateContext } from 'src/appState/AppState';
import { relogin } from 'src/utils/portal-commands';
import { isStandAlone } from 'src/utils/stand-alone-detector';

const betlinkGolfAtom = atom({
    key: 'BetlinkGolf',
    default: false,
});

export const useBetlinkGolf = () => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    const [isBetlinkGolfOpen, setBetlinkGolf] = useRecoilState(betlinkGolfAtom);
    const betLinkGolfFlag = useBetLinkGolfFlag();

    const i18nGolfOutrights = getTranslation('sport-name.golf', 'Golf Outrights');
    const i18nGolf = getTranslation('sport-name.betlink-golf', 'Golf');

    const openBetlinkGolf = useCallback(() => {
        if (!isAuthenticated && !isStandAlone()) {
            relogin();

            return;
        }
        setBetlinkGolf(true);
    }, [isAuthenticated]);

    const closeBetlinkGolf = () => {
        setBetlinkGolf(false);
    };

    return {
        enabled: betLinkGolfFlag,
        isModalOpen: isBetlinkGolfOpen && betLinkGolfFlag,
        openBetlinkGolf,
        closeBetlinkGolf,
        i18nGolfOutrights,
        i18nGolf,
    };
};
