import { format } from 'date-fns';
import { type ChangeEvent, type MouseEvent, useCallback, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { S_FilterItemsContainer } from '@sc-ui/beteast';
import { CloseIcon, FilterIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { I18n } from 'src/ui/common/Language/I18n';
import { myBetsFiltersAtom } from 'src/ui/myBets/store/atoms';
import { setTabFiltersTask } from 'src/ui/myBets/store/tasks';
import type { TabStatus, RangeType } from 'src/ui/myBets/store/types';
import { DATE_FORMAT } from 'src/utils/constants';

import FilterButtons from './FilterButtons';
import FilterChips from './FilterChips/FilterChips';
import { validateDateRange } from './helpers';
import RangePicker from './RangePicker';
import {
    S_CloseButton,
    S_Content,
    S_ContentHeader,
    S_FiltersContainer,
    S_FilterToggleContainer,
    S_Overlay,
    S_Header,
    S_ShowResultButton,
    S_ToggleButton,
} from './styled';

const BetsFilters = () => {
    const { status, range } = useRecoilValue(myBetsFiltersAtom);
    const setTabFilters = useRecoilCallback(setTabFiltersTask);

    const [isOpen, setIsOpen] = useState(false);
    const [rangeFilter, setRangeFilter] = useState(range);
    const [statusFilter, setStatusFilter] = useState(status);

    const onOpenFilterPopup = () => setIsOpen(true);

    const onCloseFilterPopup = () => {
        setIsOpen(false);
    };

    const onStatusChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setStatusFilter(value as TabStatus);
    }, []);

    const onFilter = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setTabFilters({ status: statusFilter, range: rangeFilter });
        onCloseFilterPopup();
    };

    const handleDateChange = useCallback((newDate: Date | null, rangeType: RangeType) => {
        if (!newDate) {
            return;
        }

        const formattedDate = format(newDate, DATE_FORMAT.NUMERIC_DATE);

        setRangeFilter((state) => ({
            ...state,
            // 'yyyy-MM-dd' is the format that the date picker accepts
            [rangeType]: formattedDate,
            isTouched: true,
            isValid: true,
            ...validateDateRange(rangeType, {
                ...state,
                [rangeType]: formattedDate,
            }),
        }));
    }, []);

    return (
        <>
            <S_FilterToggleContainer>
                <FilterChips />
                <S_ToggleButton data-testid='openFilter' onClick={onOpenFilterPopup}>
                    <FilterIcon fontSize='small' />
                </S_ToggleButton>
            </S_FilterToggleContainer>
            {isOpen && (
                <S_Overlay>
                    <S_FiltersContainer data-testid='filtersContainer'>
                        <S_Header data-testid='filtersHeader'>
                            <h3>
                                <I18n langKey='mybets.filter.popup.header' defaultText='Filter your bets by' />
                            </h3>
                            <S_CloseButton onClick={onCloseFilterPopup}>
                                <CloseIcon color={cssColor('--icon-generic-color')} />
                            </S_CloseButton>
                        </S_Header>
                        <S_Content data-testid='filtersContent'>
                            <S_ContentHeader />
                            <S_FilterItemsContainer>
                                <FilterButtons status={statusFilter} onStatusChange={onStatusChange} />
                                <S_ContentHeader data-testid='dateRangeHeader'>
                                    <I18n
                                        langKey='mybets.filter.popup.content.date.range.header'
                                        defaultText='Time range (maximum 90 days)'
                                    />
                                </S_ContentHeader>
                                <RangePicker range={rangeFilter} handleDateChange={handleDateChange} />
                            </S_FilterItemsContainer>
                            <S_ShowResultButton data-testid='filterItem-showResults' onClick={onFilter}>
                                <I18n langKey='mybets.filter.popup.show.result.button' defaultText='SHOW RESULTS' />
                            </S_ShowResultButton>
                        </S_Content>
                    </S_FiltersContainer>
                </S_Overlay>
            )}
        </>
    );
};

export default BetsFilters;
