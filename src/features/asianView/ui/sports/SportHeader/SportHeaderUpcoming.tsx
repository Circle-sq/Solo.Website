import { useAtomValue } from 'jotai';

import { useAppStateContext } from 'src/appState/AppState';

import { LHNTimeTab } from '../../../enums';
import { lhnTimeTabAtom } from '../../../store/lhn';
import { sportAtom } from '../../../store/sports';

import SportConfigHeader from './SportConfigHeader';
import SportHeaderIcon from './SportHeaderIcon';
import { S_SportHeader, S_TableHeadCell, S_TableHeadRowUpcoming } from './styled';

const SportHeaderUpcoming = ({ counter }: { counter: number }) => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const lhnTimeTab = useAtomValue(lhnTimeTabAtom);
    const sport = useAtomValue(sportAtom);

    const headerSuffix =
        lhnTimeTab === LHNTimeTab.Upcoming
            ? getTranslation('asianView.eventList.sportHeader.upcoming', 'Upcoming')
            : getTranslation('asianView.eventList.sportHeader.today', 'Today');

    return (
        <S_SportHeader>
            <S_TableHeadRowUpcoming data-testid='sportHeader'>
                <S_TableHeadCell>
                    <SportHeaderIcon />

                    <span>
                        {sport?.name} - {headerSuffix} ( {counter} )
                    </span>
                </S_TableHeadCell>
            </S_TableHeadRowUpcoming>

            <SportConfigHeader />
        </S_SportHeader>
    );
};

export default SportHeaderUpcoming;
