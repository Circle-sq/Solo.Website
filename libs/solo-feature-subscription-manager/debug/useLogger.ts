import { useSubscriptionDevTool } from '@solo-devtools/hooks';

import { loggers } from './configs';

export const useLogger = (namespace: string) => {
    const { show_logs } = useSubscriptionDevTool();

    return show_logs ? loggers(namespace) : null;
};
