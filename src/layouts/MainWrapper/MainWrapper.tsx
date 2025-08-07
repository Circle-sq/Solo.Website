import { useWindowWidth } from '@sc-hooks';
import { useAtomValue, useSetAtom } from 'jotai';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

import { useWalletSubscribe } from '@sc-account/hooks/useWalletSubscribe';
import { isAuthenticatedAtom } from '@sc-account/store/atoms';
import { freebetCreditsAtomWithQuery } from '@sc-account/store/queries';
import { useGetBettingConfigsApi } from '@sc-api/configs/queries';
import { useGetCategoriesIconsApi } from '@sc-api/icons/queries';
import { iconCategories } from '@sc-asianView/configs';
import { usePossibleBets } from '@sc-betslip/api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '@sc-betslip/enums';
import useReferredBetslip from '@sc-betslip/hooks/offer/useReferredBetslip';
import useReferredBetsSubscribe from '@sc-betslip/hooks/offer/useReferredBetsSubscribe';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import { routeNameAtom } from 'src/store/common/atoms';
import InitAppLoader from 'src/ui/common/Loader/InitAppLoader';
import { resetLiveTimerTask } from 'src/ui/events/EventPeriod/store/tasks';
import useShowMainLoader from 'src/utils/hooks/useShowMainLoader';

import DesktopMainWrapper from './DesktopMainWrapper';
import TabletMainWrapper from './TabletMainWrapper';

const MainWrapper = () => {
    const {
        router: {
            route: { name: routeName },
        },
    } = useAppStateContext();

    const isAsianView = routeName === RouteName.AsianView;

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const { isFetching: isFetchingFreeBet } = useAtomValue(freebetCreditsAtomWithQuery);
    const { showLoader } = useShowMainLoader();
    const { getExistingOffer } = useReferredBetslip();
    const { getPossibleBets } = usePossibleBets();

    const setRouteName = useSetAtom(routeNameAtom);

    const resetLiveTimer = useRecoilCallback(resetLiveTimerTask, []);

    const isAvailableRefBet = isAuthenticated && !showLoader;

    useEffect(() => {
        if (isAvailableRefBet) {
            getExistingOffer();
        }
    }, [isAvailableRefBet]);

    useEffect(() => {
        setRouteName(routeName as RouteName);
        resetLiveTimer();
    }, [resetLiveTimer, routeName, setRouteName]);

    useReferredBetsSubscribe(isAvailableRefBet);
    useWalletSubscribe();
    useGetBettingConfigsApi();
    useGetCategoriesIconsApi(iconCategories);

    useEffect(() => {
        if (!isFetchingFreeBet) {
            getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.BetslipInit });
        }
    }, [isAuthenticated, isFetchingFreeBet]);

    const { isDesktop } = useWindowWidth();

    if (showLoader) {
        return <InitAppLoader />;
    }

    if (isDesktop || isAsianView) {
        return <DesktopMainWrapper />;
    }

    return <TabletMainWrapper />;
};

export default observer(MainWrapper);
