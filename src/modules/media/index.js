import initStreamEffects from './effects/stream';
import * as media from './reducers/media';
import * as streams from './reducers/stream';

export const reducers = {
    ...media,
    ...streams,
};

export function init(saga, app) {
    return [].concat(initStreamEffects).map((init) => init(saga, app));
}
