import map from 'lodash/map';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';

import { myBetsFiltersAtom } from '../store/atoms';
import { setMyBetsSortTask } from '../store/tasks';
import { SortFilter } from '../store/types';

import { S_BetSortingLabel, S_BetSortingWrapper, S_GroupSortingItem, S_GroupSortingWrapper } from './styled';

const sortItems = [
    { label: 'Most recent', type: SortFilter.DescPLacedAt, translationKey: 'betslip.sort.most.recent' },
    { label: 'Event time', type: SortFilter.EventStartTime, translationKey: 'betslip.sort.event.time' },
];

const BetSorting = () => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const { sort } = useRecoilValue(myBetsFiltersAtom);
    const changeSortType = useRecoilCallback(setMyBetsSortTask, []);

    return (
        <S_BetSortingWrapper>
            <S_BetSortingLabel>{getTranslation('betslip.sort.label', 'Sort by')}: </S_BetSortingLabel>
            <S_GroupSortingWrapper>
                {map(sortItems, ({ label, type, translationKey }) => (
                    <S_GroupSortingItem key={type} active={sort === type} onClick={changeSortType(type)}>
                        {getTranslation(translationKey, label)}
                    </S_GroupSortingItem>
                ))}
            </S_GroupSortingWrapper>
        </S_BetSortingWrapper>
    );
};

export default BetSorting;
