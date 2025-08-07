import { useAtom } from 'jotai';

import { useAppStateContext } from 'src/appState/AppState';

import { timePeriodFilterAtom } from '../../../store/filters';
import { getTimePeriodOptions } from '../configs';
import Select from '../Select/Select';

interface Props {
    isDisabled?: boolean;
}

const TimePeriodFilter = ({ isDisabled = false }: Props) => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const [timePeriodFilter, setTimePeriodFilter] = useAtom(timePeriodFilterAtom);

    const options = getTimePeriodOptions();

    const label = getTranslation(`asianView.filters.${timePeriodFilter}`, options[timePeriodFilter].defaultText);

    return (
        <Select
            testId='timePeriodFilter'
            label={label}
            value={timePeriodFilter}
            options={options}
            onChange={setTimePeriodFilter}
            isDisabled={isDisabled}
        />
    );
};

export default TimePeriodFilter;
