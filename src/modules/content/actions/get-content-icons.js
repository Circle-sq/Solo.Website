export const CONTENT_ICONS_REQUEST = 'CONTENT_ICONS_REQUEST';
export const CONTENT_ICONS_ERROR = 'CONTENT_ICONS_ERROR';
export const CONTENT_ICONS_FINISH = 'CONTENT_ICONS_FINISH';

export function request(category) {
    return {
        type: CONTENT_ICONS_REQUEST,
        async: 'start',
        category,
    };
}

export function error(category, id, errors) {
    return {
        type: CONTENT_ICONS_ERROR,
        async: 'end',
        category,
        errors,
        id,
    };
}

export function finish(category, items) {
    return {
        type: CONTENT_ICONS_FINISH,
        async: 'end',
        category,
        items,
    };
}
