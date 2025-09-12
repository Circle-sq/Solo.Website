import { useEffect, useRef } from 'react';
import { components } from 'react-select';
import type { ControlProps, IndicatorsContainerProps, MenuListProps, OptionProps } from 'react-select';

import { DownArrowIcon, UpArrowIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import CustomScrollbar from 'src/ui/common/CustomScrollbar';
import type { Option as OptionType } from 'src/common/types/option';

import {
    S_DropdownIconWrapper,
    S_DropdownOption,
    S_DropdownOptionsContainer,
    S_DropdownValueContainer,
    S_ScrollBarInner,
} from './styled';

const Control = ({ children, ...props }: ControlProps<OptionType>) => {
    const { customTheme } = props.selectProps;
    const { Control } = components;

    return (
        <Control {...props}>
            <S_DropdownValueContainer themeName={customTheme}>{children}</S_DropdownValueContainer>
        </Control>
    );
};

const MenuList = ({ children, ...props }: MenuListProps<OptionType>) => {
    const { MenuList } = components;
    const { customTheme, showAllItems } = props.selectProps;

    return (
        <MenuList {...props}>
            <S_DropdownOptionsContainer themeName={customTheme} showAllItems={showAllItems}>
                {showAllItems ? (
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

const Option = ({ children, ...props }: OptionProps<OptionType>) => {
    const { innerProps, isSelected, data } = props;

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isSelected && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [isSelected]);

    return (
        <S_DropdownOption ref={ref} isSelected={isSelected} {...innerProps} data-testid='dropdownOption'>
            {data.label}
        </S_DropdownOption>
    );
};

const IndicatorsContainer = (props: IndicatorsContainerProps<OptionType>) => {
    const { IndicatorsContainer } = components;

    return (
        <IndicatorsContainer {...props}>
            <S_DropdownIconWrapper>
                {props.selectProps.menuIsOpen ? (
                    <UpArrowIcon fontSize='xsmall' color={cssColor('--icon-light-color')} />
                ) : (
                    <DownArrowIcon fontSize='xsmall' color={cssColor('--icon-light-color')} />
                )}
            </S_DropdownIconWrapper>
        </IndicatorsContainer>
    );
};

export { Control, MenuList, IndicatorsContainer, Option };
