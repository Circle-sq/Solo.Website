export function setEventFilter(name, value) {
    return {
        type: 'SET_EVENT_FILTER',
        name,
        value,
    };
}
