import { components } from 'react-select';
import type { ControlProps } from 'react-select';

import { S_MarketDropdownValueContainer } from './styled';
import type { Option } from './types';

const Control = ({ children, ...props }: ControlProps<Option>) => {
    const { Control } = components;
    const { isMarket } = props.selectProps;

    return (
        <Control {...props}>
            <S_MarketDropdownValueContainer isMarket={isMarket}>{children}</S_MarketDropdownValueContainer>
        </Control>
    );
};

export default Control;
