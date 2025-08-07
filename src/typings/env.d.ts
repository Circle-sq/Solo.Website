declare namespace NodeJS {
    interface ProcessEnv {
        API_PASSWORD?: string;
        API_URL?: string;
        API_USERNAME?: string;
        CASHOUT_WEBSOCKET_HOST?: string;
        DISABLE_CACHE_PROXY?: string;
        FEATURE_TOGGLING_CLIENT_API_TOKEN?: string;
        FEATURE_TOGGLING_CLIENT_API_URI?: string;
        HTTP_INTERFACE?: string;
        HTTP_PORT?: string;
        IFRAME_HOST?: string;
        IMG_API_URL?: string;
        LOG_FORMAT?: string;
        LOG_LEVEL?: string;
        LOG_CONFIGS?: 'true' | 'false';
        LOG_API_REQUESTS_AS_CURL?: 'true' | 'false';
        MAINTENANCE_PAGE?: string;
        NODE_ENV?: 'development' | 'production' | 'test';
        OPERATOR?: string;
        PORTAL_HOST?: string;
        REACT_APP_REFRESH_TIMEOUT?: string;
        REDIS_STORE_TYPE?: string;
        STANDALONE?: 'true' | 'false';
        TRANSLATIONS_CACHE_TTL?: string;
        UNIVERSE?: string;
        WEBSOCKET_HOST?: string;
        WEBSOCKET_HOST_V2?: string;
    }
}
