import { useRecoilCallback, useRecoilValue } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import { I18n } from 'src/ui/common/Language/I18n';
import { myBetsFiltersAtom } from 'src/ui/myBets/store/atoms';
import { resetRangeFilterTask, resetStatusFilterTask } from 'src/ui/myBets/store/tasks';
import { TabStatus } from 'src/ui/myBets/store/types';

import { betStatusFilters } from '../config';
import { formatRangeValue } from '../helpers';
import { S_EmptyStatusMessage } from '../styled';

import Chip from './Chip';

const FilterChips = () => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const { status, range } = useRecoilValue(myBetsFiltersAtom);

    const resetStatusFilter = useRecoilCallback(resetStatusFilterTask, []);
    const resetRangeFilter = useRecoilCallback(resetRangeFilterTask, []);

    if (status === TabStatus.All && !range.isTouched) {
        return (
            <S_EmptyStatusMessage>
                <I18n langKey='mybets.filter.popup.no-status' defaultText='No filters selected' />
            </S_EmptyStatusMessage>
        );
    }

    const { langKey, defaultText } = betStatusFilters[status];

    return (
        <>
            {status !== TabStatus.All && (
                <Chip label={getTranslation(langKey, defaultText)} onClick={resetStatusFilter} />
            )}
            {range.isTouched && <Chip label={formatRangeValue(range)} onClick={resetRangeFilter} />}
        </>
    );
};

export default FilterChips;
