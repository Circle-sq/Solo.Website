import get from 'lodash/get';

const isLocal = (): boolean => {
    const host = get(window, '$appState.env.websocket_host', '') as string;

    return host.includes('sandbox') || host.includes('qa') || host.includes('stg-perf') || host.includes('localhost');
};

export default isLocal;
