import { css } from '@emotion/css';
import { createRef, useEffect } from 'react';
import type { NumberFormatValues } from 'react-number-format';
import { NumericFormat } from 'react-number-format';
import { useRecoilCallback } from 'recoil';

import useFetchWalletConfigs, { CurrencyType } from '@sc-betslip/ui/StakeInput/hooks/useFetchWalletConfigs';
import { StakeInput as StakeInputUI } from '@sc-ui/beteast';
import { useAppStateContext } from 'src/appState/AppState';
import { useAtomValue } from 'jotai';

import { currencySelector } from '@sc-account/store/selectors';
import { EMPTY_STRING } from 'src/utils/constants';
import { STAKE_INPUT_MAX_LENGTH } from '../../store/configs';
import { closeNumpadTask, openNumpadTask } from '../../store/tasks/numpad';

import type { Currency } from 'src/common/enums';
import { S_FreeBetStakeInput } from './styled';

export interface Props {
    value: string | number | null | undefined;
    isDisabled: boolean;
    isFreeBet?: boolean;
    hasError?: boolean;
    numpadId: string;
    onChange: (value: number) => void;
}

const StakeInput = ({ value, isDisabled, isFreeBet = false, hasError = false, numpadId, onChange }: Props) => {
    const userCurrency = useAtomValue(currencySelector);
    const { currencyDecimalPrecision, currencyType } = useFetchWalletConfigs(userCurrency as Currency);
    const inputRef = createRef<HTMLInputElement>();

    const closeNumpad = useRecoilCallback(closeNumpadTask, []);
    const openNumpad = useRecoilCallback(openNumpadTask, []);

    const {
        language: { getTranslation },
    } = useAppStateContext();

    const placeholder = getTranslation('betslip.input.stake', 'Stake');

    useEffect(() => {
        if (isDisabled) {
            closeNumpad(numpadId);
        }
    }, [isDisabled]);

    const onValueChange = ({ value }: NumberFormatValues) => {
        if (value !== undefined) {
            const stringValue = value.toString();

            if (stringValue.includes('.')) {
                const [, decimalPart] = stringValue.split('.');

                if (decimalPart !== '') {
                    onChange(Number(value));
                }
            } else {
                onChange(Number(value));
            }
        }
    };

    const allowedInput = ({ value }: NumberFormatValues) =>
        !(currencyType !== CurrencyType.Crypto && value.startsWith('0')) && !value.startsWith('.');

    const styles = isFreeBet ? [S_FreeBetStakeInput()] : [];

    return (
        <NumericFormat
            getInputRef={inputRef}
            className={css(styles)}
            customInput={StakeInputUI}
            decimalScale={currencyDecimalPrecision}
            disabled={isDisabled}
            data-testid='stakeAmount'
            maxLength={STAKE_INPUT_MAX_LENGTH}
            placeholder={placeholder}
            value={value !== 0 ? value : EMPTY_STRING}
            allowNegative={false}
            thousandSeparator
            onValueChange={onValueChange}
            isAllowed={allowedInput}
            error={hasError}
            onClick={() => openNumpad(numpadId)}
        />
    );
};

export default StakeInput;
