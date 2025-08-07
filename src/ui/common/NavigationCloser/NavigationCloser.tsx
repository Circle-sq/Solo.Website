import { useWindowResize } from '@sc-hooks';
import { useAtomValue } from 'jotai';
import { observer } from 'mobx-react-lite';
import type { MouseEvent } from 'react';
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { isAuthenticatedAtom } from '@sc-account/store/atoms';

import { useAppStateContext } from 'src/appState/AppState';
import { showQuickBetSelector } from 'src/ui/betting/store/selectors';
import { closeQuickBetTask } from 'src/ui/betting/store/tasks';

import { FrameAction } from './styled';

const NavigationCloser = () => {
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const showQuickBet = useRecoilValue(showQuickBetSelector);

    const closeQuickBet = useRecoilCallback(closeQuickBetTask, []);

    const { router, translationsStore } = useAppStateContext();
    const { getTranslation } = translationsStore.language;
    const {
        name,
        params: { account, ...remainingParams },
    } = router.route;

    const closeTitle = getTranslation('navigation.frame.title.close', 'Click to close');

    const accountClean = (event?: MouseEvent<HTMLAnchorElement>) => {
        const { name, params } = router.route;

        if (params.account !== undefined || isAuthenticated) {
            router.redirect(name, { ...params, account: null });
        }

        if (event !== undefined) {
            event.preventDefault();

            if (showQuickBet) {
                closeQuickBet();
            }
        }
    };

    useWindowResize(accountClean);

    useEffect(accountClean, [isAuthenticated]);

    return (
        <FrameAction
            onClick={accountClean}
            title={closeTitle}
            route={name}
            params={remainingParams}
            visible={showQuickBet ? 'on' : 'off'}
        />
    );
};

export default observer(NavigationCloser);
