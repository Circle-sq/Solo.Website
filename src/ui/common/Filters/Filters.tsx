import Box from '@mui/material/Box';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import type { MouseEvent } from 'react';
import { useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { GlobeIcon, PlayIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { sportIconsSelector } from 'src/common/store/icons/selectors';
import { SPORT_ICONS } from 'src/config/sport-icons';
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

    const getSportIcons = (id: string, sportIconClass: string) => {
        if (id === 'live-stream') {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mr: '8px',
                    }}
                >
                    <PlayIcon fontSize='small' data-testid='playIcon' />
                </Box>
            );
        }

        if (sportIconClass === 'sports-globe') {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mr: '8px',
                    }}
                >
                    <GlobeIcon fontSize='small' color={cssColor('--icon-generic-color')} data-testid='globeIcon' />
                </Box>
            );
        }

        return (
            <Box
                className={sportIconClass}
                data-testid='sportIcon'
                sx={{
                    fontSize: '16px',
                    mr: '8px',
                }}
            />
        );
    };

    return (
        <S_FilterWrapper>
            {showSlider ? (
                <SwiperSlider>
                    {sortedFilters.map(({ id, label }) => {
                        const sportIconClass = SPORT_ICONS[id] || SPORT_ICONS.default;
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
                                    getSportIcons(id, sportIconClass)
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
