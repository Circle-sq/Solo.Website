import { useSetAtom } from 'jotai';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import { useSearchEventsByValueApi } from '@sc-api/events/queries';
import { CloseIcon, SearchIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventItem } from 'src/common/types/event';
import { isSearchModalOpenAtom } from 'src/store/common/atoms';
import { I18n } from 'src/ui/common/Language/I18n';
import { groupEvents } from 'src/ui/events/utils/search';
import { slug } from 'src/utils/deburr';

import SearchResult from './SearchResult';
import {
    S_Autocomplete,
    S_ClearButton,
    S_Input,
    S_InputAdornment,
    S_Label,
    S_SearchEvents,
    S_SearchEventsContent,
} from './styled';

const DELAY = 400;

const defaultQuery = {
    display: true,
    'market.display': true,
    'market.main': 'yes',
    perPage: 20,
    sort: ['timeSettings.startTime', 'name'],
    state: 'open',
    time: 'search-time',
    withMarkets: false,
};

const SearchEvents = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        router,
        language: { getTranslation },
    } = useAppStateContext();

    const [activeEvent, setActiveEvent] = useState<EventItem>();
    const [inputValue, setInputValue] = useState('');
    const [searchValue] = useDebounceValue(inputValue, DELAY);

    const setIsSearchModalOpen = useSetAtom(isSearchModalOpenAtom);

    const { data, isFetching: isSearching } = useSearchEventsByValueApi({ ...defaultQuery, q: searchValue });

    const { exactMatchEvents, notExactMatchEvents } = useMemo(
        () => groupEvents(data?.events, searchValue),
        [data, searchValue],
    );

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const clearInput = () => {
        setInputValue('');
        inputRef.current?.focus();
    };

    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setInputValue(target.value);
    };

    const changeActiveEvent = useCallback((item?: EventItem) => {
        setActiveEvent(item);
    }, []);

    const onKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
        const events = [...exactMatchEvents, ...notExactMatchEvents];

        if ((key === 'ArrowUp' || key === 'ArrowDown') && !isEmpty(events)) {
            let index = -1;

            if (activeEvent !== undefined) {
                index = findIndex(events, ({ id }) => id === activeEvent.id);
            }

            const move = key === 'ArrowUp' ? -1 : 1;

            index += move;

            if (index < 0) {
                index = events.length - 1;
            } else if (index >= events.length) {
                index = 0;
            }

            changeActiveEvent(events[index]);
        } else if (key === 'Enter' && activeEvent !== undefined) {
            const event = find(events, { id: activeEvent.id });

            if (event !== undefined) {
                router.redirect('event', {
                    id: event.id,
                    slug: slug(event.originalName),
                });
            }

            if (typeof window !== 'undefined') {
                window.scrollTo(0, 0);
            }

            setIsSearchModalOpen(false);
        }
    };

    return (
        <S_SearchEvents className={'className'}>
            <S_Autocomplete>
                <S_Label>
                    <I18n
                        langKey='search.for.teams.players.competitions'
                        defaultText='Search for Teams, Players or Competitions'
                    />
                </S_Label>
                <S_Input
                    ref={inputRef}
                    type='text'
                    data-testid='searchField'
                    value={inputValue}
                    placeholder={getTranslation('events.search.placeholder.betfinder', 'Betfinder')}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    spellCheck={false}
                />
                <S_InputAdornment>
                    <SearchIcon fontSize='small' />
                </S_InputAdornment>

                {!isEmpty(inputValue) && (
                    <S_ClearButton onClick={clearInput}>
                        <CloseIcon color={cssColor('--text-muted')} fontSize='small' />
                    </S_ClearButton>
                )}
            </S_Autocomplete>

            <S_SearchEventsContent>
                <SearchResult
                    exactMatchEvents={exactMatchEvents}
                    notExactMatchEvents={notExactMatchEvents}
                    isSearching={isSearching}
                    searchValue={searchValue}
                    activeEventId={activeEvent?.id}
                    changeActiveEvent={changeActiveEvent}
                />
            </S_SearchEventsContent>
        </S_SearchEvents>
    );
};

export default SearchEvents;
