import { forwardRef } from 'react';
import type { InputHTMLAttributes, PropsWithChildren } from 'react';

import { S_Input, S_InputWrapper, S_StakeInputErrorIcon } from './styled';

type Props = Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'onClick' | 'maxLength' | 'disabled' | 'className' | 'placeholder'
> & {
    error?: boolean;
    'data-testid'?: string;
};

const StakeInput = forwardRef<HTMLInputElement, PropsWithChildren<Props>>(
    ({ children: errorIcon, ...inputProps }, ref) => {
        return (
            <S_InputWrapper>
                {inputProps.error === true && <S_StakeInputErrorIcon role='img' className='theme-error-i' />}
                <S_Input ref={ref} type='text' {...inputProps} inputMode='none' />
            </S_InputWrapper>
        );
    },
);

export default StakeInput;
