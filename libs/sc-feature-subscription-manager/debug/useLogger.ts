import { useSubscriptionDevTool } from '@sc-devtools/hooks';

import { loggers } from './configs';

export const useLogger = (namespace: string) => {
    const { show_logs } = useSubscriptionDevTool();

    return show_logs ? loggers(namespace) : null;
};
