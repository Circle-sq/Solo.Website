import { List } from 'immutable';
import isUndefined from 'lodash/isUndefined';
import { computed, observable, runInAction, makeObservable } from 'mobx';

import { timeout } from '@solo-webapi/mobx-utils/timeout';

import { RequestStatus } from 'src/common/enums';
import type { Competition } from 'src/common/types/competition';
import { bulk } from 'src/modules/competitions/actions/update';
import {
    finish as saveSportTemplates,
    request as getSportTemplates,
} from 'src/modules/events/actions/get-market-templates';
import { finish } from 'src/modules/events/actions/query';
import { parseData } from 'src/modules/events/services/events';

import type { ApiWrapper } from '../ApiWrapper';
import type { EventModel } from '../models/models/EventModel';
import type { ModelsState } from '../models/ModelsState';
import type { ReduxState } from '../redux/ReduxState';
import type { AggregationItem } from '../redux/types';

import type {
    EventQueryRequest,
    EventsCollectionQuery,
    MoreParams,
    Params,
    TryLoadResponse,
    TryLoadResponseOk,
} from './types';
import { getTimeRange } from './utils';

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
        const jsonText = await apiWrapper.getSportsCached(
            {
                ...query,
                ...(range === null ? { time } : { startTime: range, time: undefined }),
            },
            collectionId,
        );
        const res = parseData(jsonText);

        reduxState.dispatch(bulk(res.aggregations.competition));

        reduxState.dispatch(finish(collectionId, res.events, res.aggregations, res.total, true));

        return {
            type: 'ok',
            data: res,
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
            console.error(error);
        }

        await timeout(3000);

        tryCounter++;
    }
};

export class EventsCollectionList {
    private readonly reduxState: ReduxState;
    private readonly apiWrapper: ApiWrapper;
    private readonly modelsState: ModelsState;
    private readonly collectionId: string; //TODO - to remove
    public readonly eventQuery: EventsCollectionQuery;
    private readonly extraFilter?: (event: EventModel) => boolean;
    private readonly isTemplateBased?: boolean;
    private readonly isTemplateListBased?: boolean;

    //private readonly autorefresh?: number;

    private isInit = false;
    private totalFromRequest = 0;

    private isLoadingPage = false;
    private currentLoadedPage: number | null = null;

    constructor(params: Params) {
        makeObservable<EventsCollectionList, 'totalFromRequest' | 'isLoadingPage' | 'currentLoadedPage'>(this, {
            totalFromRequest: observable,
            isLoadingPage: observable,
            currentLoadedPage: observable,
            isLoadingMoreAvailable: computed,
            ids: computed.struct,
            sportAggregation: computed.struct,
            countryAggregation: computed.struct,
            competitionAggregation: computed.struct,
            aggregatedSportIds: computed.struct,
            status: computed,
            isInitialLoading: computed,
            isLoading: computed,
            events: computed,
            competitionIds: computed.struct,
            competitionForView: computed,
        });

        this.reduxState = params.reduxState;

        this.apiWrapper = params.apiWrapper;

        this.modelsState = params.modelsState;

        this.collectionId = params.collectionId;

        this.eventQuery = params.eventQuery;

        this.extraFilter = params.extraFilter;

        if (params.configs !== undefined) {
            const { isTemplateBased, disableMountLoad, isTemplateListBased } = params.configs;

            this.isTemplateBased = isTemplateBased;

            this.isTemplateListBased = isTemplateListBased;

            if (disableMountLoad === true) {
                this.isInit = disableMountLoad;
            }
        }

        //this.autorefresh = params.autorefresh;
    }

    get isLoadingMoreAvailable(): boolean {
        if (this.currentLoadedPage === null) {
            return false;
        }

        if (isUndefined(this.eventQuery.perPage)) {
            return false;
        }

        return this.eventQuery.perPage * this.currentLoadedPage < this.totalFromRequest;
    }

    public loadMore = (params?: MoreParams) => {
        this.loadMoreAsync(params);
    };

    private initFirstPage = () => {
        if (this.isInit === false) {
            this.isInit = true;

            setTimeout(this.loadMore, 0);
        }
    };

    private getNextPageToLoad(): number {
        const currentLoadedPage = this.currentLoadedPage;

        if (currentLoadedPage === null) {
            return 1;
        }

        return currentLoadedPage + 1;
    }

    private loadMoreAsync = async (moreParams: MoreParams = {}): Promise<void> => {
        const INITIAL_PAGE = 1;

        const { sport, page: queryPage } = this.eventQuery;

        this.isLoadingPage = true;

        let page = this.currentLoadedPage !== null ? this.currentLoadedPage : INITIAL_PAGE;

        //if (moreParams.templatesGroupIds === undefined) {
        //page = queryPage !== undefined ? queryPage : this.getNextPageToLoad();
        //}

        page =
            moreParams.page !== undefined
                ? moreParams.page
                : queryPage !== undefined
                ? queryPage
                : this.getNextPageToLoad();

        let templates: string[] | undefined;

        let hasTemplates = false;

        // Get sport templates ids based on template group id
        if (typeof sport === 'string') {
            const sportTemplates = this.reduxState.getSportTemplates(sport);

            if (sportTemplates !== null) {
                hasTemplates = true;

                if (moreParams.templatesGroupIds !== undefined) {
                    templates = moreParams.templatesGroupIds.reduce(
                        (acc, groupId) => acc.concat(sportTemplates.get(groupId, List()).toArray()),
                        [] as string[],
                    );
                }
            }
        }

        delete moreParams.templatesGroupIds;

        let query = {
            ...this.eventQuery,
            page,
            marketTemplates: templates,
            ...moreParams,
        };

        // Fetch sport templates if these were not requested already
        if (typeof sport === 'string' && this.isTemplateBased === true && !hasTemplates) {
            //const MARKETS_TEMPLATES_END = AMERICAN_SPORTS.includes(sport) ? 1 : 4;
            //const MARKETS_TEMPLATES_START = 0;

            try {
                this.reduxState.dispatch(getSportTemplates(sport));
                // Get sport templates
                const respTemplates = await this.apiWrapper.getSportTemplates(sport);

                // Modify search event query to include search by market templates ids
                if (query.templates === undefined) {
                    query = {
                        ...query,
                        //marketTemplates: respTemplates
                        //.slice(MARKETS_TEMPLATES_START, MARKETS_TEMPLATES_END)
                        //.flatMap((group: [string, string[]]) => {
                        //const [, templateIds] = group;

                        //return templateIds;
                        //}),
                    };
                }

                this.reduxState.dispatch(saveSportTemplates(query.sport, respTemplates));
            } catch (err) {
                console.error(err);
                // Handle exception
            }
        }

        if (typeof sport === 'string' && this.isTemplateListBased === true) {
            if (moreParams.templateList !== undefined) {
                query.marketTemplates = moreParams.templateList;

                delete query.templateList;
            }
        }

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

    //Event list with ids
    public get ids(): number[] {
        this.initFirstPage();

        return this.reduxState.getEventsCollectionIds(this.collectionId);
    }

    public get sportAggregation(): Map<string, AggregationItem> {
        this.initFirstPage();

        return this.reduxState.getAggregations(this.collectionId, 'sport');
    }

    public get countryAggregation(): Map<string, AggregationItem> {
        this.initFirstPage();

        return this.reduxState.getLastAggregations(this.collectionId, 'country');
    }

    public get competitionAggregation(): Map<string, AggregationItem> {
        this.initFirstPage();

        return this.reduxState.getLastAggregations(this.collectionId, 'competition');
    }

    public get aggregatedSportIds(): string[] {
        return Array.from(this.sportAggregation.keys());
    }

    get status(): RequestStatus {
        this.initFirstPage();

        if (this.isLoadingPage === true && this.currentLoadedPage === null) {
            return RequestStatus.Progress;
        }

        //TODO - add error handling

        return RequestStatus.Ready;
    }

    public get getCurrentLoadedPage(): number {
        return this.currentLoadedPage ? this.currentLoadedPage : 0;
    }

    public get total(): number {
        this.initFirstPage();

        return this.totalFromRequest;
    }

    public get getCollectionId(): string {
        return this.collectionId;
    }

    get isInitialLoading(): boolean {
        this.initFirstPage();

        return this.isLoadingPage && this.currentLoadedPage === null;
    }

    get isLoading(): boolean {
        this.initFirstPage();

        return this.isLoadingPage;
    }

    get events(): EventModel[] {
        const out: EventModel[] = [];

        for (const id of this.ids) {
            const event = this.modelsState.getEvent(id);

            if (event !== null) {
                out.push(event);
            }
        }

        return out;
    }

    get competitionIds(): number[] {
        const ids: Set<number> = new Set();

        for (const event of this.events) {
            ids.add(event.competitionId);
        }

        return Array.from(ids);
    }

    get competitionForView(): Competition[] {
        const result: Competition[] = [];

        for (const competitionId of this.competitionIds) {
            const competitionModel = this.modelsState.getCompetitionModel(competitionId);

            if (competitionModel !== null) {
                result.push({
                    id: competitionId,
                    name: competitionModel.name,
                    displayOrder: competitionModel.displayOrder,
                    platformObject: competitionModel.platformObject,
                });
            }
        }

        return result;
    }
}
