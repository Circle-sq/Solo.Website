import type { ElementType, ReactElement } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventFilterOption } from 'src/ui/common/EventsFilter/types';
import type { EventFilterType } from 'src/utils/types';

interface Props {
    name: EventFilterType;
    component?: ElementType;
    onChange?: (value: string) => void;
    sportsCounter?: never[];
    route?: Record<string, unknown>;
    sportToShow?: string;
    options?: EventFilterOption[];
    isValueProvided?: boolean;
    value?: EventFilterOption;
    maxMenuHeight?: number;
    minMenuHeight?: number;
    placeholder?: ReactElement;
    option?: ReactElement;
    styles?: Record<string, unknown>;
    className?: string;
}

const EventsFilter = (props: Props) => {
    const { name, component: FilterComponent, onChange } = props;
    const { router } = useAppStateContext();

    const filterChange = (value: string) => {
        if (onChange !== undefined) {
            onChange(value);
        }
        router.redirect(router.route.name, { ...router.route.params, [`${name}Id`]: value });
    };

    return FilterComponent !== undefined ? <FilterComponent onChange={filterChange} {...props} /> : null;
};

export default EventsFilter;
