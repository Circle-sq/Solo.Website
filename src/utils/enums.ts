export enum ErrorCodes {
    InvalidExternalToken = 'invalid-external-token',
    InvalidRefreshToken = 'invalid-refresh-token',
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export enum BettingEventTime {
    CurrentDay = 'current-day',
    InPlay = 'in-play',
    NextOff = 'next-off',
    Upcoming = 'upcoming',
}
