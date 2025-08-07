import chunk from 'lodash/chunk';
import concat from 'lodash/concat';
import getIn from 'lodash/get';
import keyBy from 'lodash/keyBy';
import reduce from 'lodash/reduce';

import { api } from '@sc-api/api';

import { buildCacheUrl } from 'src/appState/utils';
import { remapEventsSport } from 'src/utils/sportRemapping';

export function parseData(data) {
    const aggregations = {
        competition: [],
        sport: [],
        country: [],
        region: [],
    };

    for (const sport of data.sports) {
        aggregations.sport.push({
            id: sport.id,
            name: sport.name,
        });
    }

    if (data.tags) {
        for (const tag of ['country', 'region']) {
            for (const value of data.tags[tag]) {
                aggregations[tag].push({
                    id: value,
                });
            }
        }
    }

    // FIXME: Remove when handicap selection name will be passed with "+"
    data.selections.forEach((selection) => {
        if (getIn(selection, 'template.marketTemplateId') === 'asian-handicap') {
            selection.name = getIn(selection, 'platformObject.name', selection.name);
        }
    });

    const selections = keyBy(data.selections, 'id');
    const markets = {};
    const events = [];

    data.markets.forEach((market) => {
        markets[market.id] = {
            ...market,
            selections: market.selections.map((id) => selections[id]),
        };
    });

    // FIXME: Until API will stop to normalize participants we have to do it this way
    const participants = keyBy(data.participants, 'id');

    data.events &&
        data.events.forEach((event) => {
            events.push({
                ...event,
                markets: event.markets.map((id) => markets[id]),
                participants: event.participants.map((p) => {
                    return {
                        ...participants[p.id],
                        role: p.role,
                    };
                }),
            });
        });

    for (const competition of data.competitions) {
        aggregations.competition.push({
            id: competition.id,
            name: competition.name,
            displayOrder: competition.displayOrder,
            globalDisplayOrder: competition.globalDisplayOrder,
            tags: competition.tags,
            platformObject: competition.platformObject,
        });
    }

    return {
        events,
        aggregations,
        competitions: data.competitions,
        sports: data.sports,
        tags: data.tags,
        total: data.total || events.length,
    };
}

export function parseMarketData(data) {
    data.selections.forEach((selection) => {
        if (getIn(selection, 'template.marketTemplateId') === 'asian-handicap') {
            selection.name = getIn(selection, 'platformObject.name', selection.name);
        }
    });

    const selections = keyBy(data.selections, 'id');

    return data.markets.map((market) => ({
        ...market,
        selections: market.selections.map((id) => selections[id]),
    }));
}

export function getOne(id, shouldExtractMarkets = true) {
    const fetchMarketsGroupSize = window.$appState.env.fetchMarketsGroupSize;

    return api
        .get(buildCacheUrl(`/events/${id}/with-market-ids`), void 0, { cache: 500 })
        .then((it) => remapEventsSport(it))
        .then((eventData) => {
            if (!eventData.events?.length) {
                return eventData;
            }

            const event = eventData.events[0];
            const marketGroups = chunk(event.markets, fetchMarketsGroupSize);

            if (shouldExtractMarkets) {
                const promises = marketGroups.map((mIds) => {
                    return api.post(
                        buildCacheUrl(`/events/${id}/markets-by-ids`),
                        {
                            eventId: id,
                            eventTranslationData: event.translationData,
                            marketIds: mIds,
                        },
                        { cache: 500 },
                    );
                });

                return Promise.all(promises).then((allMarkets) => {
                    const marketsData = reduce(
                        allMarkets,
                        function (acc, m) {
                            return {
                                markets: concat(acc.markets, m.markets),
                                selections: concat(acc.selections, m.selections),
                            };
                        },
                        { markets: [], selections: [] },
                    );

                    eventData.markets = marketsData.markets;
                    eventData.selections = marketsData.selections;

                    return eventData;
                });
            } else {
                return eventData;
            }
        })
        .then(parseData)
        .then((r) => {
            r.event = r.events[0];

            return r;
        });
}

export function getMarketById(eventId, marketId, translationData) {
    return api
        .post(
            buildCacheUrl(`/events/${eventId}/markets-by-ids`),
            {
                eventId: eventId,
                eventTranslationData: translationData,
                marketIds: [marketId],
            },
            { cache: 500 },
        )
        .then(parseMarketData);
}
