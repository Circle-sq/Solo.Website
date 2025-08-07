/* eslint-disable @typescript-eslint/no-magic-numbers */
import { useEffect, useState } from 'react';

const enableLogging = false;

const useIsAppRenderDone = (reInitParam: boolean) => {
    const [appFullyRendered, setAppFullyRendered] = useState(false);
    const [prevLoadingCount, setPrevLoadingCount] = useState<number>(0);

    useEffect(() => {
        if (appFullyRendered) {
            return;
        }

        const checkAppRendered = () => {
            const loadingElements = document.querySelectorAll('.loading__standalone').length;

            if (loadingElements !== prevLoadingCount) {
                if (loadingElements === 0) {
                    if (enableLogging) {
                        console.error(`Number of elements with class 'loading__standalone': ${loadingElements}`);
                    }
                    setAppFullyRendered(true);
                } else {
                    if (enableLogging) {
                        console.info(`Number of elements with class 'loading__standalone': ${loadingElements}`);
                    }
                }
            }

            setPrevLoadingCount(loadingElements);
        };

        checkAppRendered();

        const intervalId = setInterval(checkAppRendered, 100);

        return () => clearInterval(intervalId);
    }, [appFullyRendered, prevLoadingCount]);

    useEffect(() => {
        if (!reInitParam) {
            return;
        }

        setAppFullyRendered(false);
        setPrevLoadingCount(0);

        if (enableLogging) {
            console.info('reinit observer in useIsAppRenderDone');
        }
    }, [reInitParam]);

    return appFullyRendered;
};

export default useIsAppRenderDone;
