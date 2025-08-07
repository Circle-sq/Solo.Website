import type { ReactNode, RefObject } from 'react';
import { useCallback, useState, createRef, useEffect } from 'react';

import { DownArrowIcon, UpArrowIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { useOnClickOutside } from 'src/appState/customHooks';

import { S_Container, S_Item, S_Selected, S_Dropdown } from './styled';

interface Props {
    items: Item[];
    selected?: string;
    onChange: (betType: string) => void;
    optionRenderer?: (item?: Item, isSelected?: boolean) => ReactNode;
}

export interface Item {
    id: string;
    label: ReactNode;
}

const DropdownList = (props: Props) => {
    const { items, selected, onChange, optionRenderer } = props;
    const containerRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

    const [isOpen, setIsOpen] = useState(false);
    const [optionId, setOptionId] = useState(selected);

    useOnClickOutside(containerRef, () => {
        setIsOpen(false);
    });

    const hasItems = items.length > 0;

    useEffect(() => {
        setOptionId(selected);
    }, [selected]);

    const onItemClick = useCallback((id: string) => {
        return () => {
            setIsOpen(false);
            setOptionId(id);

            onChange(id);
        };
    }, []);

    const onClickSelected = useCallback(() => {
        if (hasItems) {
            setIsOpen(!isOpen);
        }
    }, [isOpen, items]);

    let selectedItem;

    const options = items.map((item) => {
        const { id, label } = item;

        if (id === optionId) {
            selectedItem = item;

            return;
        }

        return (
            <S_Item key={id} onClick={onItemClick(id)}>
                {optionRenderer !== undefined ? optionRenderer(item) : label}
            </S_Item>
        );
    });

    return (
        <S_Container ref={containerRef} data-testid='systemBetTypes'>
            <S_Selected isOpen={isOpen} onClick={onClickSelected} data-testid='selectedBetType'>
                {hasItems && optionRenderer !== undefined ? optionRenderer(selectedItem, true) : '-'}
                {hasItems && isOpen ? (
                    <UpArrowIcon fontSize='xsmall' color={cssColor('--icon-arrow-color')} />
                ) : (
                    <DownArrowIcon fontSize='xsmall' color={cssColor('--icon-arrow-color')} />
                )}
            </S_Selected>
            {isOpen ? (
                <S_Dropdown isOpen={isOpen} data-testid='availableBetTypes'>
                    {options}
                </S_Dropdown>
            ) : null}
        </S_Container>
    );
};

export default DropdownList;
