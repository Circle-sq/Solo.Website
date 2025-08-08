import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';

import { currencySelector, userIdSelector } from '@solo-account/store/selectors';

import { useAppStateContext } from 'src/appState/AppState';
import { LANGUAGES } from 'src/utils/constants';

import { ImgBetlinkIntegration } from './ImgBetlinkIntegration';
import { useBetlinkGolf } from './useBetlinkGolfFlag';

const Golf = () => {
    const { router, language } = useAppStateContext();
    const userId = useAtomValue(userIdSelector);
    const currency = useAtomValue(currencySelector);

    const { name, params } = router.route;

    const [prevPageRoute, setPrevPageRoute] = useState({ name: 'homepage', params: {} });

    const { isModalOpen, closeBetlinkGolf } = useBetlinkGolf();

    const [redirectToSamePage, setRedirectToSamePage] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (!isModalOpen) {
            setPrevPageRoute({ name, params: { ...params } });

            if (redirectToSamePage) {
                setRedirectToSamePage(false);
            }

            return;
        }

        if (!isEqual(prevPageRoute, { name, params }) || redirectToSamePage) {
            closeBetlinkGolf();
        } else {
            setRedirectToSamePage(true);
        }
    }, [name, params, isModalOpen]);

    const goToPreviousPage = useCallback(() => {
        router.redirect(prevPageRoute.name, prevPageRoute.params);
        closeBetlinkGolf();
    }, [prevPageRoute]);

    if (!isModalOpen) {
        return null;
    }

    const userLang = get(language, 'userLang') ?? LANGUAGES.ko;

    return (
        <ImgBetlinkIntegration
            accountId={userId?.toString()}
            currency={currency}
            userLang={userLang}
            onClose={goToPreviousPage}
        />
    );
};

export default observer(Golf);
