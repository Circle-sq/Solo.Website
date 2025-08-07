import { useSetAtom } from 'jotai';

import { SearchIcon } from '@sc-ui/icons/svg';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import { isSearchModalOpenAtom } from 'src/store/common/atoms';
import { I18n } from 'src/ui/common/Language/I18n';

import { S_Content, S_SearchButton, S_Wrapper } from './styled';

const SearchButton = () => {
    const { router } = useAppStateContext();
    const setIsSearchModalOpen = useSetAtom(isSearchModalOpenAtom);

    const openSearchModal = () => {
        if (router.route.name !== RouteName.Homepage) {
            router.redirect(RouteName.Homepage);
        }

        setIsSearchModalOpen(true);
    };

    return (
        <S_Wrapper>
            <S_Content>
                <SearchIcon fontSize='medium' />
                <S_SearchButton onClick={openSearchModal} data-testid='burger-search-button'>
                    <I18n langKey='burger.search.button' defaultText='Search for Teams, Players or Competitions' />
                </S_SearchButton>
            </S_Content>
        </S_Wrapper>
    );
};

export default SearchButton;
