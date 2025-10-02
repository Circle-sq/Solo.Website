import Box from '@mui/material/Box';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import type { MouseEvent } from 'react';
import { useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { sportIconsSelector } from 'src/common/store/icons/selectors';
import SwiperSlider from 'src/ui/common/Carousel/SwiperSlider';
import { S_ContentIcon } from 'src/ui/common/NavigationList/styled';
import { EVENT_FILTERS } from 'src/utils/constants';
import type { EventFilterType } from 'src/utils/types';

import { FilterItem, S_FilterWrapper } from './styled';
import type { Filter } from './types';

interface Props {
    active?: string;
    filters: Filter[];
    onChange: (id: string) => void;
    type?: EventFilterType;
    centered?: boolean;
    labelSort?: boolean;
    showSlider?: boolean;
}

const Filters = ({ active, filters, onChange, type, centered, labelSort = false, showSlider = false }: Props) => {
    const getLabelForSort = (label: Filter['label']): string => {
        if (typeof label === 'string') {
            return label;
        }

        return '';
    };

    const sportIcons = useRecoilValue(sportIconsSelector);

    const sortedFilters = useMemo<Filter[]>(() => {
        if (labelSort) {
            return [
                ...filters.sort((a, b) => {
                    const aLabel = getLabelForSort(a.label);
                    const bLabel = getLabelForSort(b.label);

                    return aLabel.localeCompare(bLabel);
                }),
            ];
        }

        return filters;
    }, [labelSort, filters]);

    const handleFilterChange = (id: string, event: MouseEvent) => {
        event.preventDefault();
        onChange(id);
    };

    useEffect(() => {
        if (type === EVENT_FILTERS.day && !isEmpty(filters)) {
            const [firstFilter] = filters;
            const { id: filterId } = firstFilter;

            onChange(filterId);
        }
    }, []);

    return (
        <S_FilterWrapper>
            {showSlider ? (
                <SwiperSlider>
                    {sortedFilters.map(({ id, label, Icon }) => {
                        const sportIcon = get(sportIcons, id);

                        return (
                            <FilterItem
                                key={`sport-${id}`}
                                active={active === id}
                                centered={centered}
                                testId={`sport-${id}`}
                                onClick={(e) => handleFilterChange(id, e)}
                            >
                                {sportIcon !== undefined ? (
                                    <S_ContentIcon src={sportIcon.url} isLoaded />
                                ) : (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mr: '8px',
                                        }}
                                    >
                                        {Icon}
                                    </Box>
                                )}
                                <span>{label}</span>
                            </FilterItem>
                        );
                    })}
                </SwiperSlider>
            ) : (
                sortedFilters.map(({ id, label }) => {
                    return (
                        <FilterItem
                            key={`sport-${id}`}
                            active={active === id}
                            centered={centered}
                            onClick={(e) => handleFilterChange(id, e)}
                            testId={`sport-${id}`}
                        >
                            <span>{label}</span>
                        </FilterItem>
                    );
                })
            )}
        </S_FilterWrapper>
    );
};

export default Filters;
