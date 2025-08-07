export function parseData(data) {
    return {
        sports: data.sports,
        country: data.country,
        competitions: data.competitions,
        total: data.total || 0,
    };
}
