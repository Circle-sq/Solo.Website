import isUndefined from 'lodash/isUndefined';
import size from 'lodash/size';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import type { MultiValue, SingleValue as SingleValueType } from 'react-select';

import type { MediaOption } from '@sc-media/ui/videoStream/dropdown/types';

import { hasParamsInValue, hasValueInValue } from 'src/common/typeGuards/select';
import { setEventFilter } from 'src/modules/content/actions/event-filters';
import DropdownSelect from 'src/ui/common/DropdownSelect/DropdownSelect';

import Control from './Control';
import MenuList from './MenuList';
import SelectOption from './SelectOption';
import SingleValue from './SingleValue';
import { S_DropDownFilterContainer } from './styled';
import type { DefaultOption, Market, Option } from './types';

interface Props extends Market {
    name: string;
    value?: Option | undefined;
    placeholder?: ReactNode;
    defaultOption?: DefaultOption;
    options: Option[] | undefined;
    onChange: (value?: string) => void;
    setEventFilter: typeof setEventFilter;
    styles?: Record<string, string>;
    className?: string;
}

export const FilterDropdown = (props: Props) => {
    const dispatch = useDispatch();

    const { onChange, options, placeholder, styles, className, isMarket = false } = props;

    const [value, setFilterValue] = useState<SingleValueType<Option | undefined>>();

    useEffect(() => {
        if (value && value.value === undefined) {
            dispatch(setEventFilter(props.name, value.value));
        }
    }, [value?.value]);

    const handleFilterChange = (option: SingleValueType<Option | MediaOption> | MultiValue<Option | MediaOption>) => {
        if (hasParamsInValue(option) && isMarket) {
            onChange(option?.params?.market);

            return;
        }

        if (hasValueInValue(option) && !isMarket) {
            setFilterValue(option);
            onChange(option?.value);
        }
    };

    const DROPDOWN_ITEMS_MIN_LENGTH = 7;

    return (
        <S_DropDownFilterContainer isMarket={isMarket}>
            <DropdownSelect
                onChange={handleFilterChange}
                placeholder={placeholder}
                value={isMarket || isUndefined(props.value) ? value : props.value}
                options={options}
                components={{ Option: SelectOption, Control, SingleValue, MenuList }}
                isMarket={isMarket}
                showAllItems={size(options) <= DROPDOWN_ITEMS_MIN_LENGTH}
                styles={styles}
                className={className}
            />
        </S_DropDownFilterContainer>
    );
};

export default FilterDropdown;
