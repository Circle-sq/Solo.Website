import { useSetAtom } from 'jotai';

import { LeftUpArrowIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import type { EventItem } from 'src/common/types/event';
import { isSearchModalOpenAtom } from 'src/store/common/atoms';
import Highlight from 'src/ui/common/HighlightedText/HighlightedText';
import { slug } from 'src/utils/deburr';

import { S_SearchResultIcon, S_SearchResultItem, S_SearchResultLink } from './styled';

interface Props {
    active: boolean;
    event: EventItem;
    searchValue: string;
    changeActiveEvent: (item?: EventItem) => void;
}

const SearchResultItem = ({ active, event, searchValue, changeActiveEvent }: Props) => {
    const setIsSearchModalOpen = useSetAtom(isSearchModalOpenAtom);

    const closeSearchModal = () => {
        setIsSearchModalOpen(false);
    };

    return (
        <S_SearchResultItem
            onClick={closeSearchModal}
            onMouseEnter={() => changeActiveEvent(event)}
            onMouseLeave={() => changeActiveEvent()}
        >
            <S_SearchResultLink
                route='event'
                testId={`event-${event.id}`}
                params={{ id: event.id, slug: slug(event.originalName), popup: null }}
                active={active}
            >
                <Highlight name={event.name} query={searchValue} />

                <S_SearchResultIcon>
                    <LeftUpArrowIcon stroke={cssColor('--text-muted')} fontSize='small' />
                </S_SearchResultIcon>
            </S_SearchResultLink>
        </S_SearchResultItem>
    );
};

export default SearchResultItem;
