export enum AppLocals {
    X_ANCESTOR_ORIGINS = 'x-ancestorOrigins',
}

export enum PlatformIdTypes {
    Sportsbook = 'sportsbook',
    SomePlatformId = 'someplatformid',
}

export enum Endpoints {
    any = '*',
    root = '/',
    SportsbookLogin = '/loginSportsbook',
}

export enum HttpStatusCode {
    INTERNAL_SERVER_ERROR = 500,
    Unauthorized = 401,
}

export enum ResponseHeaders {
    ContentSecurityPolicy = 'Content-Security-Policy',
}
