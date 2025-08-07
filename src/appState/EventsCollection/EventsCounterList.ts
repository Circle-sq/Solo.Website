import get from 'lodash/get';
import includes from 'lodash/includes';
import { computed, makeObservable, observable, runInAction } from 'mobx';

import { timeout } from '@sc-webapi/mobx-utils/timeout';

import { finishCounters } from 'src/modules/events/actions/query';
import { parseData } from 'src/modules/events/services/events-counter';
import { MODAL_ROUTE_NAME, REQUEST_STATUS, SPORT_TYPE } from 'src/utils/constants';

import type { ApiWrapper } from '../ApiWrapper';
import type { ReduxState } from '../redux/ReduxState';

import type {
    CounterParams,
    EventQueryRequest,
    EventsCollectionQuery,
    MoreParams,
    TryLoadResponse,
    TryLoadResponseOk,
} from './types';
import { getTimeRange, mergeEventsCounterResponse, mergeFootballAndESoccerEvents } from './utils';

const LOADING_MAX_RETRY = 3;

const tryLoad = async (
    reduxState: ReduxState,
    apiWrapper: ApiWrapper,
    collectionId: string,
    query: EventQueryRequest,
): Promise<TryLoadResponse> => {
    try {
        const { time } = query;

        const range = getTimeRange(time);

        let response;

        const defaultQuery = {
            ...query,
            ...(range === null ? { time } : { startTime: range, time: undefined }),
        };

        const aggregations = get(query, 'aggregations[0]', []);
        const isTennis = includes(aggregations, SPORT_TYPE.tennis);

        if (collectionId === MODAL_ROUTE_NAME.liveGroupedSports && !isTennis) {
            const [countries, categories] = await Promise.all([
                apiWrapper.getEventsCounterCached(defaultQuery, collectionId),
                apiWrapper.getEventsCounterCached(
                    {
                        ...defaultQuery,
                        aggregations: ['sport-location-aggregation|tags.category|tags.category-label'],
                    },
                    collectionId,
                ),
            ]);
            response = mergeEventsCounterResponse(parseData({ ...countries }), parseData({ ...categories }));
            response = mergeFootballAndESoccerEvents(response);
        } else {
            const defaultRes = await apiWrapper.getEventsCounterCached(defaultQuery, collectionId);

            response = parseData(defaultRes);
        }

        reduxState.dispatch(
            finishCounters(
                collectionId,
                response.sports,
                response.country,
                response.competitions,
                response.total,
                true,
            ),
        );

        return {
            type: 'ok',
            data: response,
        };
    } catch (err) {
        return {
            type: 'err',
            data: err,
        };
    }
};

const tryLoadWithRetry = async (
    reduxState: ReduxState,
    apiWrapper: ApiWrapper,
    collectionId: string,
    query: EventQueryRequest,
): Promise<TryLoadResponseOk> => {
    let tryCounter = 1;

    for (;;) {
        const result = await tryLoad(reduxState, apiWrapper, collectionId, query);

        if (result.type === 'ok') {
            return result.data;
        }

        const error = result.data;

        if (tryCounter >= LOADING_MAX_RETRY) {
            return Promise.reject(error);
        } else {
            console.warn(error);
        }

        await timeout(3000);

        tryCounter++;
    }
};

export class EventsCounterList {
    private readonly reduxState: ReduxState;
    private readonly apiWrapper: ApiWrapper;
    private readonly collectionId: string; //TODO - to remove
    public readonly eventQuery: EventsCollectionQuery;

    private isInit = false;

    private totalFromRequest = 0;
    private isLoadingPage = false;
    private currentLoadedPage: number | null = null;

    constructor(params: CounterParams) {
        makeObservable<EventsCounterList, 'totalFromRequest' | 'isLoadingPage' | 'currentLoadedPage'>(this, {
            totalFromRequest: observable,
            isLoadingPage: observable,
            currentLoadedPage: observable,
            counters: computed.struct,
            country: computed.struct,
            competitions: computed.struct,
            currentLoadedPageNumber: computed,
            status: computed,
            isLoading: computed,
        });

        this.reduxState = params.reduxState;

        this.apiWrapper = params.apiWrapper;

        this.collectionId = params.collectionId;

        this.eventQuery = params.eventQuery;
    }

    public loadMore = (params?: MoreParams) => {
        this.loadMoreAsync(params).catch((err) => {
            throw err;
        });
    };

    private initFirstPage = () => {
        if (this.isInit === false) {
            this.isInit = true;

            setTimeout(this.loadMore, 0);
        }
    };

    private loadMoreAsync = async (moreParams: MoreParams = {}): Promise<void> => {
        this.isLoadingPage = true;
        const page = 0;

        const query = {
            ...this.eventQuery,
            page,
            ...moreParams,
        };

        try {
            this.isLoadingPage = true;

            const data = await tryLoadWithRetry(this.reduxState, this.apiWrapper, this.collectionId, query);

            setTimeout(() => {
                //TODO - to remove (time for redux)
                runInAction(() => {
                    this.isLoadingPage = false;
                    this.currentLoadedPage = page;
                    this.totalFromRequest = data.total;
                });
            }, 300);
        } catch (err) {
            this.isLoadingPage = false;

            throw err;
        }
    };

    public get counters(): [] {
        this.initFirstPage();

        return this.reduxState.getEventsCounter(this.collectionId);
    }

    public get country(): [] {
        this.initFirstPage();

        return this.reduxState.getEventsCountryCounter(this.collectionId);
    }

    public get competitions(): [] {
        this.initFirstPage();

        return this.reduxState.getEventsCompetitionsCounter(this.collectionId);
    }

    public get total(): number {
        this.initFirstPage();

        return this.totalFromRequest;
    }

    get currentLoadedPageNumber(): number | null {
        this.initFirstPage();

        return this.currentLoadedPage;
    }

    get status(): typeof REQUEST_STATUS.PROGRESS | typeof REQUEST_STATUS.READY {
        this.initFirstPage();

        if (this.isLoadingPage === true && this.currentLoadedPage === null) {
            return REQUEST_STATUS.PROGRESS;
        }

        //TODO - add error handling

        return REQUEST_STATUS.READY;
    }

    get isLoading(): boolean {
        this.initFirstPage();

        return this.isLoadingPage;
    }
}
