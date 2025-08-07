import { useAtomValue } from 'jotai';

import { LHNTimeTab } from '../../enums';
import { lhnTimeTabAtom } from '../../store/lhn';

import LeaguesFilter from './LeaguesFilter/LeaguesFilter';
import LinesFilter from './LinesFilter/LinesFilter';
import SortFilter from './SortFilter/SortFilter';
import { S_FiltersWrapper } from './styled';
import TimePeriodFilter from './TimePeriodFilter/TimePeriodFilter';

const Filters = () => {
    const timeTab = useAtomValue(lhnTimeTabAtom);

    const isUpcomingTab = timeTab === LHNTimeTab.Upcoming;

    return (
        <S_FiltersWrapper>
            {<TimePeriodFilter isDisabled={!isUpcomingTab} />}
            <LinesFilter />
            <SortFilter />
            <LeaguesFilter />
        </S_FiltersWrapper>
    );
};

export default Filters;
