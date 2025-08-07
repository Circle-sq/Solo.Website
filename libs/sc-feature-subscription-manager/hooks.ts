import React, { useContext } from 'react';
import type { PubSubContextType } from './types';

export const PubSubContext = React.createContext<PubSubContextType | null>(null);

export const useSubUnsubContext = (usageSrc?: string): PubSubContextType => {
    const pubSubContext = useContext(PubSubContext);

    if (pubSubContext === null) {
        throw new Error(`${usageSrc} must be used within a WebsocketSubscriptionProvider`);
    }

    return pubSubContext;
};
