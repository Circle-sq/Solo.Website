import { Typography } from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';

import { cssColor } from '@solo-ui/system';

import { isSearchModalOpenAtom } from 'src/store/common/atoms';
import { I18n } from 'src/ui/common/Language/I18n';

import EventSearchContainer from './EventSearchContainer';
import { searchDebouncedValueAtom } from './store/atoms';
import { S_CloseIcon, S_Dialog, S_DialogContent, S_Header } from './styled';

const SearchEventsDialog = () => {
    const [isSearchModalOpen, setIsSearchModalOpen] = useAtom(isSearchModalOpenAtom);
    const setDebouncedSearchValue = useSetAtom(searchDebouncedValueAtom);

    const handleClose = () => {
        setIsSearchModalOpen(false);
        setDebouncedSearchValue('');
    };

    return (
        <S_Dialog fullWidth disableEscapeKeyDown open={isSearchModalOpen} maxWidth='md' data-testid='search-dialog'>
            <S_DialogContent data-testid='search-content'>
                <S_Header>
                    <Typography variant='h1' sx={{ lineHeight: 1 }} data-testid='search-title'>
                        <I18n langKey='header.search.nav.label' defaultText='Search' />
                    </Typography>

                    <S_CloseIcon
                        color={cssColor('--body-text')}
                        data-testid='close-dialog-button'
                        onClick={handleClose}
                    />
                </S_Header>
                <EventSearchContainer />
            </S_DialogContent>
        </S_Dialog>
    );
};

export default SearchEventsDialog;
