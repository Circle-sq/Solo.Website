import { components } from 'react-select';
import type { MenuListProps } from 'react-select';

import CustomScrollbar from 'src/ui/common/CustomScrollbar';
import { S_ScrollBarInner } from 'src/ui/common/DropdownSelect/styled';

import type { Option } from './types';
import { S_DropdownOptionsContainer } from './styled';

const MenuList = ({ children, ...props }: MenuListProps<Option>) => {
    const { MenuList } = components;
    const { showAllItems } = props.selectProps;

    return (
        <MenuList {...props}>
            <S_DropdownOptionsContainer showAllItems={showAllItems}>
                {showAllItems === true ? (
                    children
                ) : (
                    <CustomScrollbar eventSelect>
                        <S_ScrollBarInner>{children}</S_ScrollBarInner>
                    </CustomScrollbar>
                )}
            </S_DropdownOptionsContainer>
        </MenuList>
    );
};

export default MenuList;
