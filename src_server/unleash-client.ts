import { initialize } from 'unleash-client';

const getConfig = () => {
    const { FEATURE_TOGGLING_CLIENT_API_URI, FEATURE_TOGGLING_CLIENT_API_TOKEN } = process.env;

    if (typeof FEATURE_TOGGLING_CLIENT_API_URI !== 'string') {
        throw Error('Missing process.env.FEATURE_TOGGLING_CLIENT_API_URI');
    }

    if (typeof FEATURE_TOGGLING_CLIENT_API_TOKEN !== 'string') {
        throw Error('Missing process.env.FEATURE_TOGGLING_CLIENT_API_TOKEN');
    }

    return {
        url: FEATURE_TOGGLING_CLIENT_API_URI,
        appName: 'website',
        customHeaders: { Authorization: FEATURE_TOGGLING_CLIENT_API_TOKEN },
        refreshInterval: 15000,
    };
};

export const unleash = initialize(getConfig());

export const unleashInit = async () => {
    await unleash.start();

    unleash.on('changed', (data) => console.info('[changed]', JSON.stringify(data)));
};
