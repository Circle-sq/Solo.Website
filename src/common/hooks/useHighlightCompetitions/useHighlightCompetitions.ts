import { useQuery } from '@tanstack/react-query';
import includes from 'lodash/includes';
import { atom, useSetRecoilState } from 'recoil';

import { api } from '@sc-api/api';

import type { SportType } from 'src/common/enums';
import type { CountersCounterType } from 'src/ui/crossbetting/hooks/types';

interface UseHighlightCompetitions {
    isFetching: boolean;
    highlightCompetitions?: HighlightCompetition[];
}

type Aggregations = Record<string, Aggregation[]>;

interface Aggregation {
    aggregations: Aggregations;
    count?: number;
    key?: string;
}

export const highlightCompetitionsAtom = atom<HighlightCompetition[]>({
    key: 'highlightCompetitionsAtom',
    default: [],
});

export interface HighlightCompetitionsResponse extends Aggregation {
    totalHints: number;
    results: [];
}

export interface HighlightCompetition extends CountersCounterType {
    isLive?: boolean;
    'sport.id': SportType;
    globalDisplayOrder: number;
    'platformObject.id': string;
}

const MAX_HIGHLIGHTS_TO_DISPLAY = 10;

export const extractData = (aggregations: Aggregations, parent = {}): HighlightCompetition[] => {
    let finalData: HighlightCompetition[] = [];

    for (const key in aggregations) {
        if (Object.prototype.hasOwnProperty.call(aggregations, key)) {
            const items = aggregations[key];

            items.forEach((item) => {
                const data: Partial<HighlightCompetition> = {
                    ...parent,
                    [key.replace('competition.', '')]: item.key,
                };

                if (item.aggregations && Object.keys(item.aggregations).length > 0) {
                    const nestedData = extractData(item.aggregations, data);
                    finalData = finalData.concat(nestedData);
                } else {
                    data.count = item.count;
                    finalData.push(data as unknown as HighlightCompetition);
                }
            });
        }
    }

    return finalData;
};

const sortByDisplayOrderDesc = (data: HighlightCompetition[]) => {
    return data.sort((a, b) => {
        if (a.globalDisplayOrder !== b.globalDisplayOrder) {
            return +b.globalDisplayOrder - +a.globalDisplayOrder;
        }
        if (a.displayOrder !== b.displayOrder) {
            return +b.displayOrder - +a.displayOrder;
        }
        return b.count - a.count;
    });
};

const handleResponse = (response: HighlightCompetitionsResponse): HighlightCompetition[] =>
    sortByDisplayOrderDesc(extractData(response.aggregations));

const terms = {
    active: { type: 'match', value: 'true' },
    display: { type: 'match', value: 'true' },
    'market.active': { type: 'match', value: 'true' },
    'market.display': { type: 'match', value: 'true' },
    'competition.name': {
        type: 'aggregation',
        size: 2000,
        sort: 'term_asc',
        aggs: {
            'competition.id': {
                type: 'aggregation',
                size: 128,
                aggs: {
                    'competition.globalDisplayOrder': {
                        type: 'aggregation',
                        size: 1,
                        aggs: {
                            'competition.platformObject.id': {
                                type: 'aggregation',
                                size: 2000,
                                aggs: {
                                    'competition.displayOrder': {
                                        type: 'aggregation',
                                        size: 1,
                                        aggs: {
                                            'sport.id': {
                                                type: 'aggregation',
                                                size: 100,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const body = {
    eventSearch: {
        terms,
        perPage: 0,
    },
    competitionSearch: { terms: { 'tags.highlight': { type: 'match', value: 'yes' } }, perPage: 1000 },
};

const useHighlightCompetitions = (): UseHighlightCompetitions => {
    const setHighlightCompetitions = useSetRecoilState(highlightCompetitionsAtom);

    const queryFn = async (): Promise<HighlightCompetition[] | undefined> => {
        const liveCompetitionsPromise = api
            .post<HighlightCompetitionsResponse>(`/competitions/search/event`, {
                ...body,
                eventSearch: {
                    perPage: 0,
                    terms: { ...terms, 'timeSettings.started': { type: 'match', value: 'true' } },
                },
            })
            .then(handleResponse);
        const upcomingCompetitionsPromise = api
            .post<HighlightCompetitionsResponse>(`/competitions/search/event`, body)
            .then(handleResponse);

        const [upcomingCompetitions, liveCompetitions] = await Promise.all([
            upcomingCompetitionsPromise,
            liveCompetitionsPromise,
        ]);

        const liveCompetitionIds = liveCompetitions.map((competition) => competition.id);

        const allHighlightCompetitions = upcomingCompetitions.map((competition) => {
            if (includes(liveCompetitionIds, competition.id)) {
                return {
                    ...competition,
                    isLive: true,
                };
            }

            return competition;
        });

        setHighlightCompetitions(allHighlightCompetitions);

        return allHighlightCompetitions.slice(0, MAX_HIGHLIGHTS_TO_DISPLAY);
    };

    const { data, isFetching } = useQuery({
        queryKey: ['get-highlight-competitions'],
        queryFn: async () => queryFn(),
    });

    return {
        highlightCompetitions: data,
        isFetching,
    };
};

export default useHighlightCompetitions;
