import { useWindowWidth } from '@solo-hooks';
import { observer } from 'mobx-react-lite';
import { useRecoilState } from 'recoil';

import { CrossBetIcon, FilterIcon } from '@solo-ui/icons/svg';
import { GreyPalette } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import { toggleState } from 'src/common/helpers/state';
import { I18n } from 'src/ui/common/Language/I18n';
import useCrossBetSportCounters from 'src/ui/crossbetting/hooks/useCrossBetSportCounters';
import { useEventsSort } from 'src/ui/crossbetting/hooks/useEventsSort';
import { showCrossBetMobileFiltersAtom } from 'src/ui/crossbetting/store/atoms';
import SortControllerDesktop from 'src/ui/events/EventsList/SortControllerDesktop';

import { S_Divider, S_FilterButton, S_PageName, S_SportLabel, S_Wrapper } from './styled';

const CrossBettingHeader = () => {
    const [showFilters, setShowFilters] = useRecoilState(showCrossBetMobileFiltersAtom);

    const toggleFilters = () => setShowFilters(toggleState);

    const { router } = useAppStateContext();
    const { sport } = router.route.params;

    const sportLinks = useCrossBetSportCounters();

    const { options, sortValue, onSortChange } = useEventsSort();

    const { isTablet } = useWindowWidth();

    const sportLink = sportLinks.find((sportLink) => sportLink?.sportId === sport);

    const iconFill = showFilters ? GreyPalette.grey7 : GreyPalette.grey4;

    return (
        <S_Wrapper data-testid='crossbetHeader'>
            <CrossBetIcon data-testid='crossbetHeaderIcon' />
            <S_PageName data-testid='crossbetHeaderPageName'>
                <I18n langKey='header.crossbetting.label' defaultText='cross' />
            </S_PageName>
            <S_Divider />
            <S_SportLabel data-testid='crossbetHeaderSportName'>{sportLink ? sportLink.label : ''}</S_SportLabel>

            {isTablet ? (
                <S_FilterButton data-testid='crossbetHeaderFilters' onClick={toggleFilters}>
                    <FilterIcon fontSize='small' color={iconFill} />
                </S_FilterButton>
            ) : (
                <SortControllerDesktop options={options} selectedId={sortValue} setSortValue={onSortChange} />
            )}
        </S_Wrapper>
    );
};

export default observer(CrossBettingHeader);
