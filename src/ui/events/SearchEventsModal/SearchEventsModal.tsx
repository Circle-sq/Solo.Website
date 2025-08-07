import { useAtom } from 'jotai';

import { isSearchModalOpenAtom } from 'src/store/common/atoms';
import { I18n } from 'src/ui/common/Language/I18n';
import Modal from 'src/ui/common/Modal';

import SearchEvents from '../SearchEvents/SearchEvents';

const SearchEventsModal = () => {
    const [isSearchModalOpen, setIsSearchModalOpen] = useAtom(isSearchModalOpenAtom);

    const handleClose = () => {
        setIsSearchModalOpen(false);
    };

    if (!isSearchModalOpen) {
        return null;
    }

    return (
        <Modal
            disabledScroll
            onCloseModal={handleClose}
            title={<I18n langKey='header.search.nav.label' defaultText='Search' />}
        >
            <SearchEvents />
        </Modal>
    );
};

export default SearchEventsModal;
