import isEmpty from 'lodash/isEmpty';

import { useSubscriptions } from '@sc-data/subscriptions-storage';
import { DevToolWrapper } from '@sc-features/subscription-manager/DevToolWrapper';
import { WebsocketSubscriptionsDisplay } from '@sc-features/subscription-manager/WebsocketSubscriptionsDisplay';

import { WebsocketNamespace } from 'src/utils/socket-io/types';

export function WebsocketSubscriptionsInspector({ inline = false }: { inline?: boolean }) {
    const { subscriptions } = useSubscriptions();

    return (
        <DevToolWrapper inline={inline}>
            <WebsocketSubscriptionsDisplay
                inline={inline}
                subscriptions={subscriptions[WebsocketNamespace.DEAD]}
                namespace={WebsocketNamespace.DEAD}
                open={false}
            />
            {!isEmpty(subscriptions[WebsocketNamespace.AV]) ? (
                <WebsocketSubscriptionsDisplay
                    inline={inline}
                    subscriptions={subscriptions[WebsocketNamespace.AV]}
                    namespace={WebsocketNamespace.AV}
                />
            ) : null}
            <WebsocketSubscriptionsDisplay
                inline={inline}
                subscriptions={subscriptions[WebsocketNamespace.SB]}
                namespace={WebsocketNamespace.SB}
            />
        </DevToolWrapper>
    );
}
