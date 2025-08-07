export const GET_COMPETITIONS_LOCATION_LIST_REQUEST = 'GET_COMPETITIONS_LOCATION_LIST_REQUEST';
export const GET_COMPETITIONS_LOCATION_LIST_ERROR = 'GET_COMPETITIONS_LOCATION_LIST_ERROR';
export const GET_COMPETITIONS_LOCATION_LIST_FINISH = 'GET_COMPETITIONS_LOCATION_LIST_FINISH';

export function request(query) {
    return {
        type: GET_COMPETITIONS_LOCATION_LIST_REQUEST,
        async: 'start',
        query,
    };
}

export function error(errors) {
    return {
        type: GET_COMPETITIONS_LOCATION_LIST_ERROR,
        async: 'end',
        errors,
    };
}

export function finish(competitionLocations, query) {
    return {
        type: GET_COMPETITIONS_LOCATION_LIST_FINISH,
        competitionLocations,
        query,
    };
}
