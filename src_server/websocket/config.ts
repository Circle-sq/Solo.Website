const getEnvParam = (name: string): string => {
    const value = process.env[name];

    if (typeof value === 'string') {
        return value;
    }

    throw Error(`Missing parameter process.env.${name}`);
};

export const getTimeout = (): string => {
    try {
        return getEnvParam('CONNECTION_TIMEOUT');
    } catch (_e) {
        return '10s';
    }
};
