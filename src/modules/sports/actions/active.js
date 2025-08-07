export function request() {
    return {
        type: 'SPORTS_GET_ACTIVE_REQUEST',
        async: 'start',
    };
}

export function error(errors) {
    return {
        type: 'SPORTS_GET_ACTIVE_ERROR',
        async: 'end',
        errors,
    };
}

export function finish(sports) {
    return {
        type: 'SPORTS_GET_ACTIVE_FINISH',
        async: 'end',
        sports,
    };
}
