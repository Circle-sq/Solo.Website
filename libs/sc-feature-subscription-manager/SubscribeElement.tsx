import type { CSSProperties, PropsWithChildren } from 'react';

import { useSubscriptionDevTool } from '@sc-devtools/hooks';

import { DebugSubscribableElement } from './debug/DebugSubscribableElement';
import type { SubKey } from './subKeys';
import { useSimpleSubUnsub } from './useSubUnsubHooks';

interface Props {
    id?: number;
    parentId?: number;
    revision: number;
    subKey: SubKey;
    style?: CSSProperties;
}

export const SubscribeElement = ({ id, parentId, subKey, revision, children, style }: PropsWithChildren<Props>) => {
    const { show_socket_subscriptions } = useSubscriptionDevTool();

    useSimpleSubUnsub(id, subKey, parentId, revision);

    if (!show_socket_subscriptions) {
        return <>{children}</>;
    }

    return (
        <DebugSubscribableElement id={id} subKey={subKey} revision={revision} style={style}>
            {children}
        </DebugSubscribableElement>
    );
};
