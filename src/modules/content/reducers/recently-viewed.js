import { fromJS, List } from 'immutable';
const ALLOWED_ROUTES = ['event', 'sport'];
const ALLOWED_PARAMS = ['slug', 'id', 'eventId'];

export function CONTENT_RECENTLY_VIEWED_ADD(_state, { label, route, params }) {
    let state = _state;

    if (ALLOWED_ROUTES.indexOf(route) !== -1 && label) {
        const link = {
            label,
            route,
            params: {},
        };

        for (const param of ALLOWED_PARAMS) {
            link.params[param] = params[param];
        }

        const recent = state
            .get('recentlyViewed', new List())
            .filter((x) => {
                const isDifferent =
                    x.get('route') !== link.route || JSON.stringify(link.params) !== JSON.stringify(x.get('params'));

                if (!isDifferent && !link.label) {
                    link.label = x.get('label');
                }

                return isDifferent;
            })
            .unshift(fromJS(link))
            .slice(0, 10);

        state = state.set('recentlyViewed', recent);
    }

    return state;
}
