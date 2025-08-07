export function request() {
    return {
        type: 'SPORTS_GET_LIST_REQUEST',
        async: 'start',
    };
}

export function error(errors) {
    return {
        type: 'SPORTS_GET_LIST_ERROR',
        async: 'end',
        errors,
    };
}

export function finish(sports) {
    return {
        type: 'SPORTS_GET_LIST_FINISH',
        async: 'end',
        sports,
    };
}
