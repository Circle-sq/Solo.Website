import type { PropsWithChildren, ReactElement, MouseEvent } from 'react';
import { forwardRef } from 'react';

import { DownArrowIcon, UpArrowIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { S_ExpandIcon, S_SelectButton, S_SelectToggle } from './styled';

interface Props {
    label: string;
    onToggle: (event: MouseEvent<HTMLButtonElement>) => void;
    startAdornment?: ReactElement;
    endAdornment?: ReactElement;
    testId?: string;
    isOpen: boolean;
    isDisabled?: boolean;
}

const SelectToggle = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
    (
        {
            label,
            onToggle,
            startAdornment,
            endAdornment,
            testId,
            isOpen,
            children: options,
            isDisabled = false,
        }: PropsWithChildren<Props>,
        ref,
    ) => (
        <S_SelectToggle data-testid={testId} ref={ref}>
            <S_SelectButton role='combobox' onClick={onToggle} disabled={isDisabled}>
                {startAdornment}
                {label}
                {endAdornment}

                <S_ExpandIcon>
                    {isOpen ? (
                        <UpArrowIcon fontSize='xsmall' color={cssColor('--icon-light-color')} />
                    ) : (
                        <DownArrowIcon fontSize='xsmall' color={cssColor('--icon-light-color')} />
                    )}
                </S_ExpandIcon>
            </S_SelectButton>

            {options}
        </S_SelectToggle>
    ),
);
SelectToggle.displayName = 'SelectToggle';

export default SelectToggle;
