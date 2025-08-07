import { selector, selectorFamily } from 'recoil';

import type { SportCount } from 'src/appState/sportsList/types';
import type { RequestStatus } from 'src/common/enums';

import { eventsAtom } from '../atoms';

export const eventsCollectionsSelector = selector({
    key: 'eventsCollectionsSelector',
    get: ({ get: getRecoilValue }) => {
        const events = getRecoilValue(eventsAtom);

        return events?.get('collections');
    },
});

export const collectionCounterSelector = selectorFamily<SportCount[] | undefined, string>({
    key: 'collectionCounterSelector',
    get:
        (collectionId) =>
        ({ get: getRecoilValue }) => {
            const collections = getRecoilValue(eventsCollectionsSelector);

            return collections?.getIn([collectionId, 'counters'])?.toJS();
        },
});

export const collectionTotalSelector = selectorFamily<number | undefined, string>({
    key: 'collectionTotalSelector',
    get:
        (collectionId) =>
        ({ get: getRecoilValue }) => {
            const collections = getRecoilValue(eventsCollectionsSelector);

            return collections?.getIn([collectionId, 'total']);
        },
});

export const collectionStateSelector = selectorFamily<RequestStatus | undefined, string>({
    key: 'collectionStateSelector',
    get:
        (collectionId) =>
        ({ get: getRecoilValue }) => {
            const collections = getRecoilValue(eventsCollectionsSelector);

            return collections?.getIn([collectionId, '_state']);
        },
});

export const collectionItemsSelector = selectorFamily({
    key: 'collectionItemsSelector',
    get:
        (collectionId: string) =>
        ({ get: getRecoilValue }) => {
            const collections = getRecoilValue(eventsCollectionsSelector);

            return collections?.getIn([collectionId, 'items']);
        },
});

export const collectionItemsCountSelector = selectorFamily<number, string>({
    key: 'collectionItemsCountSelector',
    get:
        (collectionId) =>
        ({ get: getRecoilValue }) => {
            const collectionItems = getRecoilValue(collectionItemsSelector(collectionId));

            return collectionItems?.size ?? 0;
        },
});
