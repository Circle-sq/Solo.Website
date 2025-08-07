import isEmpty from 'lodash/isEmpty';
import type { ChangeEventHandler, HTMLInputAutoCompleteAttribute } from 'react';

import { ErrorText, InputBase, InputLabel, S_LoginFormInput } from './styled';

export interface Props {
    name: string;
    type: string;
    label: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    autoComplete?: HTMLInputAutoCompleteAttribute;
    errorMessage?: string;
}

const LoginFormInput = ({ name, label, value, type, autoComplete, onChange, errorMessage }: Props) => {
    const hasError = !isEmpty(errorMessage);

    return (
        <S_LoginFormInput>
            <InputLabel error={hasError}>{label}</InputLabel>

            <InputBase
                data-testid={name}
                id={`form.input.${name}`}
                type={type}
                name={name}
                value={value}
                error={hasError}
                autoComplete={autoComplete}
                onChange={onChange}
            />

            {hasError && <ErrorText id={`form.input.${name}`}>{errorMessage}</ErrorText>}
        </S_LoginFormInput>
    );
};

export default LoginFormInput;
