import { NumericFormat } from 'react-number-format';

import { ResetIcon } from '../../../../assets/icons';
import { STAKE_INPUT_MAX_LENGTH, STAKE_INPUT_COMMAS_LENGTH } from '../../../../constants';
import usePlaceBet from '../../../../hooks/usePlaceBet';
import { useStakeHandlers } from '../../../../hooks/useStakeHandlers';

import { S_StakeInput, S_Input, S_ResetStakeButton } from './styled';

const MAX_LENGTH = STAKE_INPUT_MAX_LENGTH + STAKE_INPUT_COMMAS_LENGTH;

const isAllowedRule = ({ value }: { value: string }) => !value.startsWith('0');

const StakeInput = ({ hasErrors }: { hasErrors: boolean }) => {
    const { speedBetStake, handleValueChange, handleResetStake } = useStakeHandlers();

    const { isPending } = usePlaceBet();

    return (
        <S_StakeInput>
            <NumericFormat
                data-testid='speedBetBetslipStakeField'
                displayType='input'
                customInput={S_Input}
                value={speedBetStake}
                onValueChange={handleValueChange}
                allowNegative={false}
                thousandSeparator
                placeholder='Stake'
                isAllowed={isAllowedRule}
                decimalScale={0}
                maxLength={MAX_LENGTH}
                inputMode='none'
                hasErrors={hasErrors}
                disabled={isPending}
            />
            {speedBetStake && (
                <S_ResetStakeButton
                    onClick={handleResetStake}
                    data-testid='speedBetBetslipStakeReset'
                    disabled={isPending}
                >
                    <ResetIcon />
                </S_ResetStakeButton>
            )}
        </S_StakeInput>
    );
};

export default StakeInput;
