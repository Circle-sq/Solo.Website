import { useCallback, useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';

import { useAppStateContext } from 'src/appState/AppState';

import useTimer from './useTimer';

const useShowMainLoader = () => {
    const [isLoading, setIsLoading] = useState(true);

    const {
        sportsList: { sportsLinks },
    } = useAppStateContext();

    const hideLoader = useCallback(() => {
        setIsLoading(false);
    }, []);

    useTimer({
        autoStart: true,
        endTime: 1,
        onTimeOver: hideLoader,
    });

    const hasSportsLinks = !isEmpty(sportsLinks);

    useEffect(() => {
        if (hasSportsLinks && isLoading) {
            hideLoader();
        }
    }, [hasSportsLinks]);

    return { showLoader: isLoading };
};

export default useShowMainLoader;
