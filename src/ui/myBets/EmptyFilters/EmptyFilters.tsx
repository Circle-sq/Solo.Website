import type { MouseEvent } from 'react';
import { useRecoilCallback } from 'recoil';

import { NoBetsIcon } from '@solo-ui/icons/svg';

import { I18n } from 'src/ui/common/Language/I18n';
import { resetTabFiltersTask } from 'src/ui/myBets/store/tasks';

import { EmptyFilterSubHeader, ResetFiltersLink, S_EmptyFilters } from './styled';

const EmptyFilters = () => {
    const resetTabFilters = useRecoilCallback(resetTabFiltersTask);

    const onResetFilters = (e: MouseEvent) => {
        e.preventDefault();
        resetTabFilters();
    };

    return (
        <S_EmptyFilters>
            <NoBetsIcon />

            <EmptyFilterSubHeader>
                <I18n langKey='mybets.filter.empty.results.info' defaultText='No bets found' />
            </EmptyFilterSubHeader>

            <ResetFiltersLink onClick={onResetFilters}>
                <I18n langKey='mybets.filter.empty.results.link' defaultText='Reset Filter' />
            </ResetFiltersLink>
        </S_EmptyFilters>
    );
};

export default EmptyFilters;
