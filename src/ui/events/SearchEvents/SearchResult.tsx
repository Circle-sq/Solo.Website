import isEmpty from 'lodash/isEmpty';

import type { EventItem } from 'src/common/types/event';
import CustomScrollbar from 'src/ui/common/CustomScrollbar';
import { I18n } from 'src/ui/common/Language/I18n';
import Loader from 'src/ui/common/Loader/Loader';

import SearchResultItem from './SearchResultItem';
import { S_Loader, S_EmptyResults, Divider, S_SearchResult, S_SearchResultContent } from './styled';

const verticalBarPosition = {
    top: '16px',
};

interface Props {
    exactMatchEvents: EventItem[];
    notExactMatchEvents: EventItem[];
    isSearching: boolean;
    searchValue: string;
    activeEventId?: number;
    changeActiveEvent: (item?: EventItem) => void;
}

const SearchResult = ({
    activeEventId,
    exactMatchEvents,
    notExactMatchEvents,
    isSearching,
    searchValue,
    changeActiveEvent,
}: Props) => {
    if (isEmpty(searchValue)) {
        return null;
    }

    if (isSearching) {
        return (
            <S_Loader>
                <Loader message={<I18n langKey='events.search.loading' defaultText='Loading...' />} />
            </S_Loader>
        );
    }

    const haveExactMatches = !isEmpty(exactMatchEvents);
    const haveNotExactMatches = !isEmpty(notExactMatchEvents);

    if (!haveExactMatches && !haveNotExactMatches) {
        return (
            <S_EmptyResults>
                <I18n langKey='events.search.empty' defaultText='No events have been found.' />
            </S_EmptyResults>
        );
    }

    return (
        <CustomScrollbar verticalBarPosition={verticalBarPosition}>
            <S_SearchResult>
                {haveExactMatches && (
                    <S_SearchResultContent>
                        {exactMatchEvents.map((event) => {
                            return (
                                <SearchResultItem
                                    key={event.id}
                                    event={event}
                                    searchValue={searchValue}
                                    active={event.id === activeEventId}
                                    changeActiveEvent={changeActiveEvent}
                                />
                            );
                        })}
                    </S_SearchResultContent>
                )}

                {haveExactMatches && haveNotExactMatches && <Divider />}

                {haveNotExactMatches && (
                    <S_SearchResultContent>
                        {notExactMatchEvents.map((event) => {
                            return (
                                <SearchResultItem
                                    key={event.id}
                                    event={event}
                                    searchValue={searchValue}
                                    active={event.id === activeEventId}
                                    changeActiveEvent={changeActiveEvent}
                                />
                            );
                        })}
                    </S_SearchResultContent>
                )}
            </S_SearchResult>
        </CustomScrollbar>
    );
};

export default SearchResult;
