import isFunction from 'lodash/isFunction';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';

import { S_RadioButtonWrapper, S_Input, S_Icon } from './styled';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'label'> {
    label: ReactNode;
    onChangeValue?: (value: string) => void;
}

const RadioButton = ({ label, id, onChangeValue, checked, ...inputProps }: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isFunction(onChangeValue)) {
            onChangeValue(e.currentTarget.value);
        }
    };

    return (
        <S_RadioButtonWrapper aria-checked={checked}>
            {label}
            <S_Input
                {...inputProps}
                id={id}
                type='radio'
                onChange={handleChange}
                checked={checked}
                aria-checked={checked}
            />
            <S_Icon aria-checked={checked} />
        </S_RadioButtonWrapper>
    );
};

export default RadioButton;
