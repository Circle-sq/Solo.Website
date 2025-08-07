export enum AppLocals {
    X_ANCESTOR_ORIGINS = 'x-ancestorOrigins',
}

export enum PlatformIdTypes {
    Comtrade = 'comtrade',
    Xyz = 'xyz',
    SkyHub = 'skyhub',
}

export enum Endpoints {
    any = '*',
    root = '/',
    comtradeLogin = '/loginComtrade',
    xyzLogin = '/loginXYZ',
    skyHubLogin = '/loginSkyHUB',
}

export enum HttpStatusCode {
    INTERNAL_SERVER_ERROR = 500,
    Unauthorized = 401,
}

export enum ResponseHeaders {
    ContentSecurityPolicy = 'Content-Security-Policy',
}
