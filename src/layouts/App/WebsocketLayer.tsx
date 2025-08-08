import { useAsianViewFlag } from '@solo-feature-flags';
import { useFlagsStatus } from '@unleash/proxy-client-react';
import { observer } from 'mobx-react-lite';
import { type PropsWithChildren, useEffect } from 'react';

import {
    type ModelService,
    ModelSubscribeBridgeService,
} from '@solo-features/subscription-manager/ModelSubscribeBridgeService';
import { WebsocketSubscriptionProvider } from '@solo-features/subscription-manager/WebsocketSubscriptionProvider';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import InitAppLoader from 'src/ui/common/Loader/InitAppLoader';
import { WebsocketNamespace } from 'src/utils/socket-io/types';

const WebsocketLayer = ({ children }: PropsWithChildren) => {
    const { flagsReady } = useFlagsStatus();
    const asianViewFlag = useAsianViewFlag();
    const { models, router, websocket } = useAppStateContext();

    const isAsianViewPage = router.route.name === RouteName.AsianView;
    const asianViewRouteForbidden = flagsReady && !asianViewFlag && isAsianViewPage;

    useEffect(() => {
        if (asianViewRouteForbidden) {
            router.redirect(RouteName.Homepage, {});
        }
    }, [asianViewRouteForbidden]);

    if (!flagsReady) {
        return <InitAppLoader />;
    }

    const { subscribeTo, unsubscribeFrom } = ModelSubscribeBridgeService(websocket, models as ModelService);

    return (
        <WebsocketSubscriptionProvider
            subscribeTo={subscribeTo}
            unsubscribeFrom={unsubscribeFrom}
            namespace={WebsocketNamespace.SB}
        >
            {children}
        </WebsocketSubscriptionProvider>
    );
};

export default observer(WebsocketLayer);
