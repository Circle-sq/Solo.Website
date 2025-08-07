import { http, HttpResponse } from 'msw';

import cmsAsianViewConfigFootballFixture from './fixtures/cms/asian-view-config/football.json';
import cmsAsianViewConfigFixture from './fixtures/cms/asian-view-config/volleyball.json';
import competitionsFixture from './fixtures/competitions/volleyball.json';
import searchAggregationsCompetitionsCountryFixture from './fixtures/events/counter/search_aggregations_competition_country.json';
import eventsCounterSearchSportWithCountriesFixture from './fixtures/events/counter/search_aggregations_sportWithCountries.json';
import eventSearch from './fixtures/events/search/sport_volleyball.json';
import sportsAggregatedFixture from './fixtures/sports/aggregated.json';

export const handlers = [
    http.get('/cms/asian-view-config/:sport', ({ params }) => {
        if (params.sport === 'volleyball') {
            return HttpResponse.json(cmsAsianViewConfigFixture);
        }

        if (params.sport === 'football') {
            return HttpResponse.json(cmsAsianViewConfigFootballFixture);
        }

        return HttpResponse.json({});
    }),
    http.post('/events/search', () => {
        return HttpResponse.json(eventSearch);
    }),
    http.get('/events/counter/search', ({ request }) => {
        const aggregations = new URL(request.url).searchParams.get('aggregations')?.toString();

        if (aggregations === 'competition.country,tags.country') {
            return HttpResponse.json(searchAggregationsCompetitionsCountryFixture);
        }

        if (aggregations === 'sportWithCountries') {
            return HttpResponse.json(searchAggregationsCompetitionsCountryFixture);
        }

        return HttpResponse.json(eventsCounterSearchSportWithCountriesFixture);
    }),
    http.post('/sports/aggregated', () => {
        return HttpResponse.json(sportsAggregatedFixture);
    }),
    http.get('/competitions', ({ request }) => {
        const sport = new URL(request.url).searchParams.get('sport');

        if (sport === 'volleyball') {
            return HttpResponse.json(competitionsFixture);
        }

        return HttpResponse.json([]);
        /*
        if (sport === 'football') {
            return HttpResponse.json(footballCompetitionsFixture);
        }

        if (sport === 'esoccer') {
            return HttpResponse.json(competitionsFixture);
        }*/
    }),
];
