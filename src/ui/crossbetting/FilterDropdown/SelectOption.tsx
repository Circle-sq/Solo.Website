import { components } from 'react-select';
import type { GroupBase, OptionProps } from 'react-select';

import type { MediaOptionGroup } from '@solo-media/ui/videoStream/dropdown/types';

import { S_DropdownLinkOption, S_DropdownOption } from './styled';
import type { Option } from './types';

const SelectOption = (props: OptionProps<Option, boolean, GroupBase<Option | MediaOptionGroup>>) => {
    const { data, isSelected, innerProps } = props;
    const { isMarket } = props.selectProps;

    if (isMarket) {
        return (
            <components.Option {...props}>
                <S_DropdownLinkOption>
                    {data.icon ? data.icon : null}
                    {data.label}
                </S_DropdownLinkOption>
            </components.Option>
        );
    }

    return (
        <S_DropdownOption isSelected={isSelected} {...innerProps}>
            {data?.icon ? data.icon : null}
            <div>{data.label}</div>
        </S_DropdownOption>
    );
};

export default SelectOption;
