import { useAtomValue } from 'jotai';
import type { ChangeEvent } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { I18n } from 'src/ui/common/Language/I18n';

import CheckboxCheckedIcon from '../../../icons/CheckboxCheckedIcon';
import CheckboxUncheckedIcon from '../../../icons/CheckboxUncheckedIcon';
import SearchIcon from '../../../icons/SearchIcon';
import { competitionLocationsCountAtom } from '../../../store/competitionLocations';
import { S_CompetitionItem, S_Header, S_HeaderLabel, S_Input, S_SearchFilter, S_SmallerSpan } from '../styled';

interface Props {
    searchValue: string;
    competitionsCount: number;
    changeSearchValue: (value: string) => void;
    selectAll: (isChecked: boolean) => void;
}

const DropdownHeader = ({ searchValue, competitionsCount, changeSearchValue, selectAll }: Props) => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const competitionLocationsCount = useAtomValue(competitionLocationsCountAtom);

    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        changeSearchValue(target.value);
    };

    const isSelectAllChecked = competitionsCount === competitionLocationsCount;

    const toggleSelectAll = () => {
        selectAll(isSelectAllChecked);
    };

    return (
        <S_Header>
            <S_HeaderLabel>
                <I18n langKey='asianView.filters.selectLeagues' defaultText='Select Leagues' />
            </S_HeaderLabel>

            <S_CompetitionItem onClick={toggleSelectAll}>
                <div>{isSelectAllChecked ? <CheckboxCheckedIcon /> : <CheckboxUncheckedIcon />}</div>
                <span>
                    <I18n langKey='asianView.filters.selectAll' defaultText='Select all' />
                </span>
                <S_SmallerSpan>
                    {` (${competitionsCount} / ${competitionLocationsCount}) `}
                    <I18n langKey='asianView.filters.leagues' defaultText='Leagues' />
                </S_SmallerSpan>
            </S_CompetitionItem>

            <S_SearchFilter>
                <SearchIcon />
                <S_Input
                    autoComplete='off'
                    id='competition-search-filter'
                    value={searchValue}
                    onChange={onChange}
                    placeholder={getTranslation('asianView.filters.searchLeagues', 'Search Leagues')}
                    spellCheck={false}
                />
            </S_SearchFilter>
        </S_Header>
    );
};

export default DropdownHeader;
