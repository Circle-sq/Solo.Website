import { useEffect, useRef } from 'react';

import { useAppStateContext } from 'src/appState/AppState';

export const useSubscribeParams = (callback: (params: Readonly<Record<string, string>>) => void) => {
    const {
        router: {
            route: { params },
        },
    } = useAppStateContext();

    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        callbackRef.current(params);
    }, [params]);
};
