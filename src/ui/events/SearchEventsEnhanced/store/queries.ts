import lodashGet from 'lodash/get';

import { EventsService } from '@solo-api/events/services';
import { queryKeys } from '@solo-api/queryKeys';
import { atomWithInfiniteQueryCbk, jotaiCallback, store } from '@solo-utils/jotai';

import { searchDebouncedValueAtom, searchWarningAtom } from './atoms';
import { extraTerms, getDefaultTerms, query, sortParams } from './config';
import { MIN_SEARCH_LENGTH, searchWarnings } from './constants';
import type { SearchResultsData, SearchResultsResponse } from './types';

const EVENTS_PER_PAGE = 20;

const getNextPageParam = ({ total }: SearchResultsData, pages: SearchResultsData[]) => {
    return total / EVENTS_PER_PAGE <= pages.length ? null : pages.length + 1;
};

const setSearchWarning = jotaiCallback(({ set }) => (error?: unknown): void => {
    const apiErrorMessage = lodashGet(error, 'errors.error', '');

    if (apiErrorMessage.includes('contains invalid characters')) {
        return set(searchWarningAtom, searchWarnings.invalidCharacters);
    }

    if (apiErrorMessage.includes('exceeds the maximum allowed length')) {
        return set(searchWarningAtom, searchWarnings.maxLengthExceeded);
    }

    set(searchWarningAtom, null);
});

export const infiniteResultsAtomWithInfiniteQuery = atomWithInfiniteQueryCbk((get) => {
    const debouncedSearchValue = get(searchDebouncedValueAtom);
    const isSearchEnabled = debouncedSearchValue.length >= MIN_SEARCH_LENGTH;

    const queryFn = async ({ pageParam }: { pageParam: number }): Promise<SearchResultsData> => {
        store.set(searchWarningAtom, null);

        const { results: events, totalHints: total } = await EventsService.search<SearchResultsResponse>({
            terms: getDefaultTerms(debouncedSearchValue),
            extraTerms,
            query,
            marketTags: { 'website-main': ['yes'] },
            sort: sortParams,
            page: pageParam,
            perPage: EVENTS_PER_PAGE,
        });

        return { events, total, pageParam };
    };

    return {
        queryKey: queryKeys.events.search(debouncedSearchValue).queryKey,
        queryFn,
        onError: setSearchWarning,
        initialPageParam: 1,
        getNextPageParam,
        gcTime: 0,
        staleTime: 0,
        retry: false,
        enabled: isSearchEnabled,
    };
});
