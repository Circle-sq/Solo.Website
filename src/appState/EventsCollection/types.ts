import type { EventModel } from 'src/appState/models/models/EventModel';
import type { BettingEventTime } from 'src/utils/enums';
import type { TimeRange } from 'src/common/types/main';

import type { ReduxState } from '../redux/ReduxState';
import type { ApiWrapper } from '../ApiWrapper';
import type { ModelsState } from '../models/ModelsState';

import type { ConfigsParams } from './EventsCollectionState';
import type { aggregations } from './config';

type Aggregation = boolean | (typeof aggregations)[number][] | string[];

export interface EventsCollectionQuery {
    state?: 'open';
    'market.display'?: true;
    'market.tradedInPlay'?: boolean;
    sort?: string[] | string;
    display?: true;
    sport?: string | string[];
    started?: boolean;
    time?: BettingEventTime;
    startTime?: TimeRange;
    country?: string;
    competition?: number;
    templates?: string[];
    perPage?: number;
    page?: number;
    marketIndex?: boolean;
    'market.id'?: boolean;
    'market.main'?: string; // possible values 'yes,no,-'
    'market.popular'?: string;
    'market.outright'?: string;
    'timeSettings.tradedInPlay'?: 'true';
    'tags.solo-events'?: string | TimeRange<number>;
    'tags.outright'?: string;
    'tags.country'?: string;
    'tags.tennis-tour'?: string;
    'market.market-display'?: string;
    aggregations?: Aggregation;
    'aggregations-only'?: boolean;
    outright?: 'yes' | 'no';
    availableStreams?: boolean;
    'startTime[from]'?: string;
    'startTime[to]'?: string;
    reduceMarkets?: boolean;
}

export interface MoreParams {
    templatesGroupIds?: string[];
    sport?: string;
    competition?: number;
    page?: number;
    templateList?: string[];
}

export type EventQueryRequest = EventsCollectionQuery & {
    page: number;
};

export interface TryLoadResponseOk {
    total: number;
}

export type TryLoadResponse =
    | {
          type: 'ok';
          data: TryLoadResponseOk;
      }
    | {
          type: 'err';
          data: any;
      };

export interface Params {
    configs?: ConfigsParams;
    reduxState: ReduxState;
    apiWrapper: ApiWrapper;
    modelsState: ModelsState;
    collectionId: string; //TODO - to remove
    eventQuery: EventsCollectionQuery;
    extraFilter?: (event: EventModel) => boolean;
    autorefresh?: number; //TODO - to remove
}

export interface CounterParams {
    configs?: ConfigsParams;
    reduxState: ReduxState;
    apiWrapper: ApiWrapper;
    collectionId: string; //TODO - to remove
    eventQuery: EventsCollectionQuery;
    autorefresh?: number; //TODO - to remove
}
