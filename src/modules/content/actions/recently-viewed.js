export function add({ label, route, params }) {
    return {
        type: 'CONTENT_RECENTLY_VIEWED_ADD',
        params,
        label,
        route,
    };
}
