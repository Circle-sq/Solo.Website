import get from 'lodash/get';
import keyBy from 'lodash/keyBy';

function parseSet(_set) {
    let set = _set;

    if (!set) {
        return null;
    }

    set = set.toString();

    switch (true) {
        case /([2-9|0][$1])|^1$/.test(set):
            return `${set}st`;

        case /([2-9|0][$2])|^2$/.test(set):
            return `${set}nd`;

        case /([2-9|0][$3])|^3$/.test(set):
            return `${set}rd`;

        default:
            return `${set}th`;
    }
}

export function parseScore(event) {
    // handle tennis
    const tennisScore = get(event, 'statistics.match-status.value');

    if (tennisScore) {
        const set = get(event, 'statistics.set.value');
        let homeSets = 0;
        let awaySets = 0;
        const value = tennisScore.split(' ').map((el) => {
            const scoreArray = el.split('-');

            return { home: parseInt(scoreArray[0]), away: parseInt(scoreArray[1]) };
        });

        value.forEach((accumulator, index) => {
            if (index + 1 < set) {
                return parseInt(accumulator.home) > parseInt(accumulator.away) ? homeSets++ : awaySets++;
            }
        });

        return {
            formatted: tennisScore,
            value: [{ home: homeSets, away: awaySets }, value[set - 1]],
            set: parseSet(set),
        };
    }

    // handle other sports
    const score = get(event, 'statistics.score', {});
    const { home, away } = score;

    if (home !== undefined && away !== undefined) {
        return {
            formatted: `${home} - ${away}`,
            value: [{ home, away }],
        };
    }

    return null;
}

export default function parse(event) {
    if (event.id) {
        event.id = +event.id;
    }

    if (event.competition) {
        event.competition = +event.competition;
    }

    if (event.template && event.template.id) {
        event.template = event.template.id;
    }

    if (event.participants) {
        event.participants.forEach((x) => {
            x.id = +x.id;

            if (x.metadata && x.metadata.score) {
                x.metadata.score = +x.metadata.score;
            }
        });

        event.participants = keyBy(event.participants, 'id');
    }

    if (event.statistics) {
        event.score = parseScore(event);
    }

    if (event.markets) {
        event.markets.forEach((market) => {
            if (market.selections.length) {
                market.selections.forEach((selection) => {
                    selection.eventId = event.id;

                    selection.marketId = market.id;

                    selection.sp = market.sp;
                });

                market.selections = keyBy(market.selections, 'id');
            }
        });

        event.markets = keyBy(event.markets, 'id');
    }

    return event;
}
