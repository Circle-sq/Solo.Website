import { UnleashClient } from '@unleash/proxy-client-react';

export const unleashClient = new UnleashClient({
    appName: 'website',
    refreshInterval: 15,
    clientKey: process.env.FEATURE_TOGGLING_PROXY_TOKEN ?? JSON.parse(window.$appStateInit).featureTogglingProxyToken,
    url: process.env.FEATURE_TOGGLING_PROXY_URI ?? JSON.parse(window.$appStateInit).featureTogglingProxyUri,
});
