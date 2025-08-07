import { ClickAwayListener } from '@mui/base';
import map from 'lodash/map';
import { type ReactElement, useCallback, useState } from 'react';

import { I18n } from 'src/ui/common/Language/I18n';

import SelectToggle from './SelectToggle';
import { S_Option, S_SelectOptions } from './styled';

interface Option {
    defaultText: string;
    langKey?: string;
    icon?: ReactElement;
}

interface Props<T> {
    label: string;
    value: T;
    onChange: (value: T) => void;
    options: Record<string, Option>;
    startAdornment?: ReactElement;
    testId?: string;
    width?: number;
    isDisabled?: boolean;
}

const Select = <T,>({
    label,
    value,
    options,
    onChange,
    startAdornment,
    testId,
    width,
    isDisabled = false,
}: Props<T>) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = useCallback(() => setIsOpen(false), []);

    const onToggle = useCallback(() => {
        setIsOpen((state) => !state);
    }, []);

    const onSelect = (value: T) => () => {
        onChange(value);
        onClose();
    };

    return (
        <ClickAwayListener onClickAway={onClose}>
            <SelectToggle
                label={label}
                onToggle={onToggle}
                startAdornment={startAdornment}
                testId={testId}
                isOpen={isOpen}
                isDisabled={isDisabled}
            >
                {isOpen && (
                    <S_SelectOptions>
                        {map(options, ({ langKey, defaultText, icon }: Option, key: T) => (
                            <S_Option
                                key={`select-option-${key}`}
                                active={key === value}
                                onClick={onSelect(key)}
                                width={width}
                            >
                                {icon}
                                {langKey !== undefined ? (
                                    <I18n langKey={langKey} defaultText={defaultText} />
                                ) : (
                                    defaultText
                                )}
                            </S_Option>
                        ))}
                    </S_SelectOptions>
                )}
            </SelectToggle>
        </ClickAwayListener>
    );
};

export default Select;
