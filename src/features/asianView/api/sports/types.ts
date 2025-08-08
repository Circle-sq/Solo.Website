import type { MatchTermParam, RangeTermParam, StringBoolean, YesNo, ShouldMatchTermParam } from '@solo-api/types';

import type { BetStatus, SportType } from 'src/common/enums';

export interface AggregatedSport {
    id: SportType;
    name: string;
    tags: {
        'website-show'?: string[];
        'solo-events'?: string[];
        'market-group'?: string[];
        region?: string[];
        outright?: string[];
        'ante-post'?: string[];
        country?: string[];
        'tennis-tour'?: string[];
    };
    displayOrder: number;
    eventCount: number;
    translations: Record<string, unknown>;
    hasLiveEvents?: boolean;
}

export interface DefaultTerms {
    state: MatchTermParam<BetStatus>;
    display: MatchTermParam<StringBoolean>;
    'tags.outright': MatchTermParam<YesNo>;
    'market.asian-view': ShouldMatchTermParam<YesNo>;
}

export interface AggregatedSportTerms {
    'market.tradedInPlay'?: MatchTermParam<StringBoolean>;
    'timeSettings.tradedInPlay'?: MatchTermParam<StringBoolean>;
    'timeSettings.started'?: MatchTermParam<StringBoolean>;
    'timeSettings.startTime'?: RangeTermParam;
}

export interface AggregatedSportParams {
    terms: DefaultTerms & AggregatedSportTerms;
}
