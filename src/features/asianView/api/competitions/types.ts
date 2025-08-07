import type {
    Aggs,
    MarketTagsParam,
    MatchTermParam,
    RangeTermParam,
    ShouldMatchTermParam,
    StringBoolean,
    YesNo,
} from '@sc-api/types';

import type { BetStatus, SportType } from 'src/common/enums';
import type { CompetitionLocationItem } from 'src/common/types/competition';

import type { TimePeriod, LHNTimeTab } from '../../enums';

export interface SearchCompetitionsKeyParams {
    sport: SportType;
    timeTab?: LHNTimeTab;
    timePeriod?: TimePeriod;
}

export interface SearchCompetitionsWithEventsBaseTerms {
    display?: MatchTermParam<StringBoolean>;
    state?: MatchTermParam<BetStatus>;
    'sport.id'?: ShouldMatchTermParam<SportType>;
    'tags.outright': MatchTermParam<YesNo>;
    'competition.id': {
        type: 'aggregation';
        size: number;
        sort: 'term_asc';
        aggs: Aggs;
    };
    'tags.country': {
        type: 'aggregation';
        size: number;
        aggs: Aggs;
    };
}

export interface SearchCompetitionsWithEventsTermsByTimeTab {
    'market.tradedInPlay'?: MatchTermParam<StringBoolean>;
    'timeSettings.tradedInPlay'?: MatchTermParam<StringBoolean>;
    'timeSettings.started'?: MatchTermParam<StringBoolean>;
    'timeSettings.startTime'?: RangeTermParam;
}

export interface SearchCompetitionsWithEventsQueryParams {
    terms: SearchCompetitionsWithEventsBaseTerms & SearchCompetitionsWithEventsTermsByTimeTab;
    marketTags: MarketTagsParam;
}

export interface CompetitionsWithEventsResponse {
    results: {
        elements: CompetitionLocationItem[];
        elementsCount: number;
        current: number;
        pageSize: number;
    };
    totalHints: number;
    aggregations: unknown;
}
