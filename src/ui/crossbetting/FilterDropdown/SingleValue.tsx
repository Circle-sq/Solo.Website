import { components } from 'react-select';
import type { GroupBase, SingleValueProps } from 'react-select';

import type { MediaOptionGroup } from '@sc-media/ui/videoStream/dropdown/types';

import { S_DropdownSingleValue, S_DropdownSingleValueContainer } from './styled';
import type { Option } from './types';

const SingleValue = ({
    selectProps,
    ...props
}: SingleValueProps<Option, boolean, GroupBase<Option | MediaOptionGroup>>) => {
    const { icon } = props.data;
    const { SingleValue } = components;

    return (
        <SingleValue {...props} selectProps={selectProps}>
            <S_DropdownSingleValueContainer>
                {icon}
                <S_DropdownSingleValue>{selectProps.getOptionLabel(props.data)}</S_DropdownSingleValue>
            </S_DropdownSingleValueContainer>
        </SingleValue>
    );
};

export default SingleValue;
