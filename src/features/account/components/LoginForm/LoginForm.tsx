import { Alert } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useRecoilCallback } from 'recoil';

import { resetBetslipStateTransaction } from '@sc-betslip/store/transactions/betslip';
import { useJotaiCallback } from '@sc-utils/jotai';

import { useAppStateContext } from 'src/appState/AppState';
import { I18n } from 'src/ui/common/Language/I18n';

import { signIn } from '../../actions';
import { closeLoginPopupTask } from '../../store/tasks';

import LoginFormInput from './Input/LoginFormInput';
import { LoginButton, S_LoginForm } from './styled';
import { EMAIL_REGEX, isApiError } from './validation';

const TOKEN_SIZE_MIN = 3;

interface FormValues {
    email: string;
    password: string;
    externalToken: string;
}

const LoginForm = () => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const [{ email, password, externalToken }, setFormData] = useState<FormValues>({
        email: '',
        password: '',
        externalToken: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<FormValues>>({});
    const [globalError, setGlobalError] = useState<string | null>(null);

    const closeLoginPopup = useJotaiCallback(closeLoginPopupTask);

    const resetBetslipState = useRecoilCallback(({ transact_UNSTABLE: transact }) => () => {
        transact(resetBetslipStateTransaction);
    });

    const validateForm = ({ email, password, externalToken }: FormValues) => {
        const newErrors: Partial<FormValues> = {};

        if (externalToken.trim().length > TOKEN_SIZE_MIN) {
            setErrors({});

            return;
        }

        if (!email.trim()) {
            newErrors.email = getTranslation('errors.required-field', 'This field is required.');
        } else if (email.match(EMAIL_REGEX) === null) {
            newErrors.email = getTranslation('errors.invalid-email', 'Incorrect e-mail address.');
        } else {
            newErrors.email = '';
        }

        if (!password.trim()) {
            newErrors.password = getTranslation('errors.required-field', 'This field is required.');
        } else {
            newErrors.password = '';
        }

        setErrors(newErrors);
    };

    const handleApiError = (error: unknown) => {
        const newErrors: Partial<FormValues> = {};

        if (error instanceof Error) {
            setGlobalError(error.message);

            return;
        }

        if (isApiError(error)) {
            const fields: Array<keyof FormValues> = ['email', 'password', 'externalToken'];

            fields.forEach((field) => {
                if (typeof error.errors[field] === 'string') {
                    newErrors[field] = error.errors[field];
                }
            });

            if (!isEmpty(newErrors)) {
                setErrors(newErrors);

                return;
            }
        }

        setGlobalError(getTranslation('errors.unknown', 'Unknown error'));
    };

    const changeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        const updatedFormData = { email, password, externalToken, [name]: value };

        setFormData(updatedFormData);
        validateForm(updatedFormData);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setGlobalError(null);

        try {
            const payload = externalToken.trim().length > TOKEN_SIZE_MIN ? { externalToken } : { email, password };

            await signIn(payload, {
                throwOnError: true,
            });

            resetBetslipState();
            setIsSubmitting(false);
            closeLoginPopup();
        } catch (error) {
            handleApiError(error);
            setIsSubmitting(false);
        }
    };

    const isDisabled = isSubmitting || some(errors, (error) => !isEmpty(error));

    return (
        <S_LoginForm onSubmit={(e) => void handleSubmit(e)}>
            {globalError !== null && (
                <Alert variant='filled' severity='error' sx={{ my: 1.25 }}>
                    {globalError}
                </Alert>
            )}

            <LoginFormInput
                type='email'
                name='email'
                value={email}
                autoComplete='email'
                label={getTranslation('account.input-username-label', 'E-mail')}
                errorMessage={errors.email}
                onChange={changeInput}
            />

            <LoginFormInput
                type='password'
                name='password'
                value={password}
                autoComplete='current-password'
                label={getTranslation('account.input-password-label', 'Password')}
                errorMessage={errors.password}
                onChange={changeInput}
            />

            <LoginFormInput
                type='text'
                name='externalToken'
                value={externalToken}
                label={getTranslation('account.input-external-token-label', 'Token')}
                errorMessage={errors.externalToken}
                onChange={changeInput}
            />

            <LoginButton data-testid='submitLogin' type='submit' size='large' disabled={isDisabled}>
                <I18n defaultText='Login' langKey='account.login' />
            </LoginButton>
        </S_LoginForm>
    );
};

export default LoginForm;
