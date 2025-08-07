import type { ReduxState } from '../redux/ReduxState';
import type { ApiWrapper } from '../ApiWrapper';

import type { EventsCollectionQuery } from './types';
import { EventsCounterList } from './EventsCounterList';
import { getQueryList } from './getCounterQueryList';

export interface ConfigsParams {
    isTemplateBased?: boolean;
    isTemplateListBased?: boolean;
    disableMountLoad?: boolean;
}

interface GetType {
    collectionId: string;
    configs?: ConfigsParams;
    query: EventsCollectionQuery;
    autorefresh?: number;
    currentPage?: number;
}

export class EventsCounterState {
    private readonly reduxState: ReduxState;
    private readonly apiWrapper: ApiWrapper;

    constructor(reduxState: ReduxState, apiWrapper: ApiWrapper) {
        this.reduxState = reduxState;
        this.apiWrapper = apiWrapper;
    }

    get = (params: GetType): EventsCounterList => {
        return new EventsCounterList({
            reduxState: this.reduxState,
            apiWrapper: this.apiWrapper,
            collectionId: params.collectionId,
            eventQuery: params.query,
            autorefresh: params.autorefresh,
            configs: params.configs,
        });
    };

    getEventsCounterList(
        collectionId: string,
        queryParams: EventsCollectionQuery,
        configs?: ConfigsParams,
    ): EventsCounterList {
        return this.get({
            collectionId,
            query: {
                ...getQueryList(collectionId),
                ...queryParams,
            },
            configs,
            autorefresh: 1800000,
        });
    }
}
