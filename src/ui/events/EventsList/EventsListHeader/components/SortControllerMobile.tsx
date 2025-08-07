import Box from '@mui/material/Box';
import find from 'lodash/find';
import orderBy from 'lodash/orderBy';
import type { CSSProperties } from 'react';
import { useRecoilState } from 'recoil';

import { CupIcon, ClockIcon } from '@sc-ui/icons/svg';

import { useAppStateContext } from 'src/appState/AppState';
import EventsFilter from 'src/ui/common/EventsFilter/EventsFilter';
import { I18n } from 'src/ui/common/Language/I18n';
import FilterDropdown from 'src/ui/crossbetting/FilterDropdown/FilterDropdown';
import { useEventsSort } from 'src/ui/crossbetting/hooks/useEventsSort';
import { SORT_OPTIONS, SORT_VALUE } from 'src/ui/events/EventsList/config';
import { sortCriteriaAtomFamily } from 'src/ui/events/store/atoms';
import { EVENT_FILTERS } from 'src/utils/constants';

interface Props {
    collectionId: string;
}

const SortControllerMobile = ({ collectionId }: Props) => {
    const [sortValue, setSortValue] = useRecoilState(sortCriteriaAtomFamily(collectionId));
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const getIconById = (id: string | undefined) => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mr: '5px',
                }}
            >
                {id === SORT_VALUE.time ? <ClockIcon fontSize='xsmall' /> : <CupIcon fontSize='xsmall' />}
            </Box>
        );
    };

    const { options } = useEventsSort();

    const orderedOptions = orderBy(
        options.map(({ id, label }) => ({
            label: getTranslation(`event.list.header.${id}`, label),
            value: id,
            icon: getIconById(id),
        })),
        ['label'],
        ['desc'],
    );

    const defaultSortByText = find(SORT_OPTIONS, (x) => x.id === sortValue)?.label ?? SORT_VALUE.time;

    const timeValue = {
        label: getTranslation(`event.list.header.${sortValue}`, defaultSortByText),
        value: sortValue,
        icon: getIconById(sortValue),
    };

    const handleOnChange = (value: string) => {
        setSortValue(value);
    };

    return (
        <EventsFilter
            key={`event-filter-time`}
            name={EVENT_FILTERS.time}
            options={orderedOptions}
            value={timeValue}
            maxMenuHeight={1000}
            minMenuHeight={0}
            placeholder={<I18n langKey='crossbetting.filters.dropdown.sort' defaultText='Sort' />}
            component={FilterDropdown}
            onChange={handleOnChange}
            styles={{
                menu: (base: CSSProperties) => ({
                    ...base,
                    top: '18px',
                    zIndex: '999',
                    boxShadow: '5px 2px 6px rgb(23, 23, 23)',
                    backgroundColor: 'unset',
                }),
                valueContainer: (base: CSSProperties) => ({
                    ...base,
                    padding: '0 0 0 8px !important',
                }),
            }}
        />
    );
};

export default SortControllerMobile;
