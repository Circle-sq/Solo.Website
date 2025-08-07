import normalize from '../helpers/parse';

export function update(id, competition) {
    competition.id = id;

    return bulk([competition]);
}

export function bulk(competitions) {
    return {
        type: 'COMPETITIONS_UPDATE',
        competitions: competitions.map(normalize),
    };
}
