import isNull from 'lodash/isNull';
import {
    createContext,
    useState,
    useContext,
    type PropsWithChildren,
    type Dispatch,
    type SetStateAction,
    useMemo,
} from 'react';

import { WebsocketNamespace } from 'src/utils/socket-io/types';

type ChannelName = string;
type ListenerId = string;
// if no listeners (ListenerIds) and Date.now() - SubscriptionTimestamp > 10s
// than we shall unsubscribe from  ChannelName
type SubscriptionTimestamp = number;

export interface Subscriptions {
    [key: ChannelName]: Record<ListenerId, SubscriptionTimestamp>;
}

type NamespacedSubscriptions = Record<WebsocketNamespace, Subscriptions>;
interface SubscriptionsContextType {
    subscriptions: NamespacedSubscriptions;
    setSubscriptions: Dispatch<SetStateAction<NamespacedSubscriptions>>;
}

const SubscriptionsContext = createContext<SubscriptionsContextType | null>(null);

export const useSubscriptions = (): SubscriptionsContextType => {
    const context = useContext(SubscriptionsContext);

    if (isNull(context)) {
        throw new Error('useSubscriptions must be used within a SubscriptionsStorageProvider');
    }

    return context;
};

export const SubscriptionsStorageProvider = ({ children }: PropsWithChildren) => {
    const [subscriptions, setSubscriptions] = useState<NamespacedSubscriptions>({
        [WebsocketNamespace.AV]: {},
        [WebsocketNamespace.SB]: {},
        [WebsocketNamespace.DEAD]: {},
    });

    const value = useMemo(() => ({ subscriptions, setSubscriptions }), [subscriptions, setSubscriptions]);

    return <SubscriptionsContext.Provider value={value}>{children}</SubscriptionsContext.Provider>;
};
