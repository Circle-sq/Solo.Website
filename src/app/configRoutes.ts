const routes = Object.freeze({
    '/': 'homepage',

    '/account/:account/:static': 'homepage',
    '/account/:account': 'homepage',

    '/my-bets': 'my-bets',

    '/event/:id/:slug': 'event',
    '/event/:id': 'event',
    '/event/:id/:slug/:market': 'event',

    '/event/:id/:eventId/:slug/:type': 'sport',
    '/event/:id/:eventId/:slug': 'sport',
    '/event/:id/:eventId': 'sport',

    '/sport/:id/:type': 'sport',
    '/sport/:id': 'sport',

    '/country/:sportId/:countryId/:competitionId': 'country',
    '/country/:sportId/:countryId': 'country',

    '/competition/:id/:slug': 'competition',
    '/competition/:id': 'competition',

    '/allcountries/:sportId': 'allcountries',

    '/inplay/:id': 'inplay',

    '/page/:id': 'page',
    '/error/:code': 'error',

    '/home': 'landing-home',

    '/asianview': 'asian-view',
} as const);

export default routes;
