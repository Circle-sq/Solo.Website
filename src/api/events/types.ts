import type { BetStatus, SportType } from 'src/common/enums';
import type { TranslationData } from 'src/common/types/event';

import type {
    InfiniteQueryParams,
    MarketTagsParam,
    MatchTermParam,
    RangeTermParam,
    ShouldMatchTermParam,
    SortParam,
    StringBoolean,
    YesNo,
} from '../types';

export interface DefaultTerms {
    display?: MatchTermParam<StringBoolean>;
    state?: MatchTermParam<BetStatus>;
    'sport.id'?: ShouldMatchTermParam<SportType>;
    'tags.outright'?: MatchTermParam<YesNo>;
}

interface QueryParams {
    withMarkets: boolean;
    reduceMarkets: boolean;
}

export interface SearchEventsTermsByTimeTab {
    marketIndex?: { type: 'exists' };
    'market.tradedInPlay'?: MatchTermParam<StringBoolean>;
    'timeSettings.tradedInPlay'?: MatchTermParam<StringBoolean>;
    'timeSettings.started'?: MatchTermParam<StringBoolean>;
    'timeSettings.startTime'?: RangeTermParam;
}

export interface SearchEventsQueryTerms extends DefaultTerms, SearchEventsTermsByTimeTab {
    'competition.id'?: ReadonlyArray<number>;
    'name.ngram'?: ShouldMatchTermParam<string>;
    'market.display'?: MatchTermParam<StringBoolean>;
}

export interface SearchEventsQueryParams extends InfiniteQueryParams {
    terms: SearchEventsQueryTerms;
    sort: SortParam[];
    marketTags: MarketTagsParam;
    query?: QueryParams;
    extraTerms?: {
        'timeSettings.startTime'?: RangeTermParam;
    };
}

export interface SearchEventsByValueQueryParams {
    'market.display': boolean;
    'market.main': string;
    q: string;
    display: boolean;
    perPage: number;
    sort: string[];
    state: string;
    time: string;
    withMarkets: boolean;
}

export interface MarketsByIdsParams {
    eventId: number;
    eventTranslationData: TranslationData;
    marketIds: number[];
}
