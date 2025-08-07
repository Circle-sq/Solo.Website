import { useAtom } from 'jotai';
import { useEffect } from 'react';

import useIsAppRenderDone from './hooks/useIsAppRenderDone';
import { reInitTrackRenderDoneAtom } from './store/atom';

type AppRenderDone = () => void;

interface SendPostMessageWhenAllIsLoadedProps {
    appRenderDone: AppRenderDone;
}

const SendPostMessageWhenAllIsLoaded = ({ appRenderDone }: SendPostMessageWhenAllIsLoadedProps) => {
    const [reInitParam, setReinitParam] = useAtom(reInitTrackRenderDoneAtom);
    const isAppRenderDone = useIsAppRenderDone(reInitParam);
    useEffect(() => {
        if (isAppRenderDone) {
            appRenderDone();
            setReinitParam(false);
        }
    }, [isAppRenderDone, appRenderDone, setReinitParam]);

    return null;
};

export default SendPostMessageWhenAllIsLoaded;
