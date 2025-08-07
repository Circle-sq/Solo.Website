import { useAtom } from 'jotai';

import { useAppStateContext } from 'src/appState/AppState';

import { SortBy } from '../../../enums';
import ClockIcon from '../../../icons/ClockIcon';
import TrophyIcon from '../../../icons/TrophyIcon';
import { sortByFilterAtom } from '../../../store/filters';
import { sortOptions } from '../configs';
import Select from '../Select/Select';

const SortFilter = () => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const [sortByFilter, setSortByFilter] = useAtom(sortByFilterAtom);

    const label = getTranslation(`asianView.filters.sort.sort`, 'Sort');
    const startAdornment = sortByFilter === SortBy.Time ? <ClockIcon /> : <TrophyIcon />;

    return (
        <Select
            testId='sortByFilter'
            label={label}
            value={sortByFilter}
            options={sortOptions}
            onChange={setSortByFilter}
            startAdornment={startAdornment}
            width={90}
        />
    );
};

export default SortFilter;
