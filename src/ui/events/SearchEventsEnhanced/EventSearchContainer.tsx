import { InputAdornment, Stack } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { type ChangeEvent, useRef } from 'react';

import { CloseIcon, SearchIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import { I18n } from 'src/ui/common/Language/I18n';
import Loader from 'src/ui/common/Loader/Loader';

import NoSearchResultsContainer from './NoSearchResultsContainer';
import SearchResults from './SearchResults';
import SportsNavigation from './SportsNavigation';
import { searchCurrentValueAtom, searchDebouncedValueAtom } from './store/atoms';
import { MIN_SEARCH_LENGTH } from './store/constants';
import { infiniteResultsAtomWithInfiniteQuery } from './store/queries';
import { S_Label, S_ScrollableWrapper, S_TextField } from './styled';

const EventSearchContainer = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const searchValue = useAtomValue(searchCurrentValueAtom);
    const [debouncedSearchValue, setDebouncedSearchValue] = useAtom(searchDebouncedValueAtom);
    const { data, isLoading } = useAtomValue(infiniteResultsAtomWithInfiniteQuery);

    const { language } = useAppStateContext();

    const hasResults = !isLoading && data !== undefined && data.pages[0].total > 0;
    const emptyResults = !isLoading && !hasResults && debouncedSearchValue.length >= MIN_SEARCH_LENGTH;

    const clearInput = () => {
        setDebouncedSearchValue('');
        inputRef.current?.focus();
    };

    const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        if (value.trim() === '' && value !== '') {
            return;
        }

        setDebouncedSearchValue(value);
    };

    return (
        <>
            <Stack spacing={0.5} sx={{ p: '12px 10px 18px' }}>
                <S_Label variant='h3'>
                    <I18n
                        langKey='search.for.teams.players.competitions'
                        defaultText='Search for Teams, Players or Competitions'
                    />
                </S_Label>

                <S_TextField
                    fullWidth
                    autoFocus
                    type='text'
                    value={searchValue}
                    inputRef={inputRef}
                    spellCheck={false}
                    placeholder={language.getTranslation('events.search.placeholder.betfinder', 'Betfinder')}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon fontSize='medium' />
                                </InputAdornment>
                            ),
                            endAdornment: searchValue && (
                                <InputAdornment position='end'>
                                    <CloseIcon
                                        fontSize='small'
                                        color={cssColor('--input-placeholder-color')}
                                        onClick={clearInput}
                                    />
                                </InputAdornment>
                            ),
                        },
                    }}
                    data-testid='search-field'
                    onChange={onChange}
                />
            </Stack>

            {hasResults && <SportsNavigation pages={data.pages} />}

            <S_ScrollableWrapper hasScroll={hasResults}>
                {isLoading && <Loader message={<I18n langKey='events.search.loading' defaultText='Loading...' />} />}
                {emptyResults && <NoSearchResultsContainer />}
                {hasResults && <SearchResults />}
            </S_ScrollableWrapper>
        </>
    );
};

export default EventSearchContainer;
