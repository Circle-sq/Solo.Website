import { SportType } from 'src/common/enums';
import { LHN_SPORTS_ORDER } from 'src/utils/constants';

import type { ApiWrapper } from '../ApiWrapper';
import type { EventModel } from '../models/models/EventModel';
import type { ModelsState } from '../models/ModelsState';
import type { ReduxState } from '../redux/ReduxState';

import { EventsCollectionList } from './EventsCollectionList';
import { getQueryList } from './getQueryList';
import type { EventsCollectionQuery } from './types';

const prepareId = (query: EventsCollectionQuery): string => {
    //TODO - add sort params for deduplication query
    return JSON.stringify(query);
};

export interface ConfigsParams {
    isTemplateBased?: boolean;
    isTemplateListBased?: boolean;
    disableMountLoad?: boolean;
}

interface GetType {
    collectionId: string;
    configs?: ConfigsParams;
    query: EventsCollectionQuery;
    extraFilter?: (event: EventModel) => boolean;
    autorefresh?: number;
    currentPage?: number;
}

//TODO - dorobić autorefresha
//TODO - jak wróci sieć, to ma zostać pobrana ponownie ta lista

export class EventsCollectionState {
    private readonly reduxState: ReduxState;
    private readonly apiWrapper: ApiWrapper;
    private readonly modelsState: ModelsState;

    private readonly lists: Map<string, EventsCollectionList>;

    constructor(reduxState: ReduxState, apiWrapper: ApiWrapper, modelsState: ModelsState) {
        this.reduxState = reduxState;

        this.apiWrapper = apiWrapper;

        this.modelsState = modelsState;

        this.lists = new Map();
    }

    get = (params: GetType): EventsCollectionList => {
        const id = prepareId(params.query);

        const list = this.lists.get(id);

        const resetCollection =
            params.currentPage !== undefined &&
            list &&
            list.getCurrentLoadedPage !== undefined &&
            params.currentPage !== list.getCurrentLoadedPage;

        if (list !== undefined && !resetCollection && list.getCollectionId === params.collectionId) {
            list.loadMore({ page: list.getCurrentLoadedPage });

            return list;
        } else {
            this.lists.delete(id);
        }

        const newList = new EventsCollectionList({
            reduxState: this.reduxState,
            apiWrapper: this.apiWrapper,
            modelsState: this.modelsState,
            collectionId: params.collectionId,
            eventQuery: params.query,
            extraFilter: params.extraFilter,
            autorefresh: params.autorefresh,
            configs: params.configs,
        });

        this.lists.set(id, newList);

        return newList;
    };

    getEventsCollectionList(
        collectionId: string,
        queryParams: EventsCollectionQuery,
        configs?: ConfigsParams,
        currentPage?: number,
    ): EventsCollectionList {
        const newQueryParams = { ...queryParams };

        if (newQueryParams['tags.country'] === SportType.ESoccer.toUpperCase()) {
            newQueryParams['tags.country'] = LHN_SPORTS_ORDER.WRL;
        }

        return this.get({
            collectionId,
            query: {
                ...getQueryList(collectionId),
                ...newQueryParams,
            },
            configs,
            autorefresh: 1800000,
            currentPage,
        });
    }
}
