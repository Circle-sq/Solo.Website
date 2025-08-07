import { useEffect } from 'react';

import { useLogger } from './debug/useLogger';
import { useSubUnsubContext } from './hooks';
import type { SubKey } from './subKeys';

export function useSimpleSubUnsub(id: number | undefined, subKey: SubKey, parentId?: number, revision?: number) {
    const { subscribe, unsubscribe } = useSubUnsubContext('useSimpleSubUnsub');
    const logger = useLogger('hooks');

    useEffect(() => {
        if (id === undefined) {
            logger?.noId(subKey, id);

            return;
        }

        const entities = [id];

        logger?.applyForSubscription({ id, revision, subKey });

        subscribe(entities, subKey, parentId, revision);

        return () => {
            logger?.sendUnsub(subKey, id);
            unsubscribe(entities, subKey, revision);
        };
    }, [id, subscribe, unsubscribe, revision]);
}
