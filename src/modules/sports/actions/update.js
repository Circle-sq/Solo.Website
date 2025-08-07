export function update(id, sport) {
    sport.id = id;

    return bulk([sport]);
}

export function bulk(sports) {
    return {
        type: 'SPORTS_UPDATE',
        sports,
    };
}
