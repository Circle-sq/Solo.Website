import { isStandalone } from 'src/infra.client';

import type Router from '../Router';

export enum IFRAME_ACTION_TYPE {
    push = 'CF_SI_CHILD_PUSH',
    receive = 'CF_SI_CHILD_RECEIVE',
    info = 'CF_SI_CHILD_INFO',
}

export const LogStandaloneMessage = (action: IFRAME_ACTION_TYPE, message: string): void => {
    const standalone_logs = localStorage.getItem('standalone_logs');
    const standalone_logs_height = localStorage.getItem('standalone_logs_height');

    if (message.indexOf('_height') >= 0 && standalone_logs_height === 'false') {
        return;
    }

    if (standalone_logs === 'true') {
        console.info(`${action}, ${message}`);
    }
};

export const getBackToParentParam = (router: Router) => {
    const params: Record<string, string> = {};

    if (isStandalone() && router.route.params['backToParent']) {
        params.backToParent = 'true';
    }

    return params;
};
