import Box from '@mui/material/Box';
import find from 'lodash/find';
import orderBy from 'lodash/orderBy';

import { ClockIcon, CupIcon } from '@solo-ui/icons/svg';

import { useAppStateContext } from 'src/appState/AppState';
import EventsFilter from 'src/ui/common/EventsFilter/EventsFilter';
import { I18n } from 'src/ui/common/Language/I18n';
import FilterDropdown from 'src/ui/crossbetting/FilterDropdown';
import { useEventsSort } from 'src/ui/crossbetting/hooks/useEventsSort';
import { SORT_VALUE, SORT_OPTIONS } from 'src/ui/events/EventsList/config';
import { EVENT_FILTERS } from 'src/utils/constants';

interface Props {
    styles?: Record<string, unknown>;
}

const SortFilter = ({ styles }: Props) => {
    const appState = useAppStateContext();

    const { options, sortValue, onSortChange } = useEventsSort();

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

    const orderedOptions = orderBy(
        options.map(({ id, label }) => ({
            label: appState.language.getTranslation(`event.list.header.${id}`, label),
            value: id,
            icon: getIconById(id),
        })),
        ['label'],
        ['desc'],
    );

    const defaultSortByText = find(SORT_OPTIONS, (x) => x.id === sortValue)?.label ?? SORT_VALUE.time;

    const timeValue = {
        label: appState.language.getTranslation(`event.list.header.${sortValue}`, defaultSortByText),
        value: sortValue as string,
        icon: getIconById(sortValue),
    };

    return (
        <EventsFilter
            name={EVENT_FILTERS.time}
            options={orderedOptions}
            value={timeValue}
            maxMenuHeight={1000}
            minMenuHeight={0}
            placeholder={<I18n langKey='crossbetting.filters.dropdown.sort' defaultText='Sort' />}
            component={FilterDropdown}
            onChange={onSortChange}
            styles={styles}
        />
    );
};

export default SortFilter;
