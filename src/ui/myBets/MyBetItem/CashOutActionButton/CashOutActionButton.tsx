import type { MouseEvent, ReactElement } from 'react';
import { useMemo } from 'react';

import type { MyBet } from 'src/common/types/myBet';
import { formatStrAmount, amountFormatter } from 'src/utils/format';
import useMyBetState from 'src/ui/myBets/hooks/useMyBetState';
import { I18n } from 'src/ui/common/Language/I18n';

import { S_CashOutButton, S_CashOutWrapper, S_CashOutValue } from '../styled';
import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';

import InfoIconContainer from './InfoIconContainer';
import ButtonIcon from './ButtonIcon';
import ButtonLabel from './ButtonLabel';

export interface Props {
    bet: MyBet;
    onCashOutBet: (e: MouseEvent<HTMLButtonElement>) => void;
    isConfirmed: boolean;
    isSuccess: boolean;
}

const CashOutActionButton = ({ bet, onCashOutBet, isConfirmed, isSuccess }: Props) => {
    const { currency: betCurrency } = bet;
    const translatedCurrency = useTranslatedCurrency();

    const { cashOutAmount, isDisabled, isCancelableBet, isCashOutLocked, isCashOutInProgress, isCashOutFulfilled } =
        useMyBetState(bet, isSuccess);

    const showCashOutAmount = isCashOutFulfilled || (!isCashOutLocked && !isCashOutInProgress && !isCancelableBet);
    const showInfoIcon = !isCashOutFulfilled && !isCashOutLocked;

    const amount = useMemo<string | ReactElement>(() => {
        if (cashOutAmount) {
            return `${formatStrAmount(
                amountFormatter(cashOutAmount, false, betCurrency),
                undefined,
                betCurrency,
            )} ${translatedCurrency}`;
        }

        return <I18n langKey='betslip.use-bet-credits-button.na' defaultText='N/A' />;
    }, [cashOutAmount, betCurrency, translatedCurrency]);

    return (
        <S_CashOutWrapper>
            <S_CashOutButton
                size='large'
                testId='cashout'
                onClick={onCashOutBet}
                isCashOutLocked={isCashOutLocked}
                isCashOutFulfilled={isCashOutFulfilled}
                disabled={isDisabled}
                loading={isCashOutInProgress}
            >
                <ButtonIcon isCashOutLocked={isCashOutLocked} isCashOutFulfilled={isCashOutFulfilled} />
                <ButtonLabel bet={bet} isConfirmed={isConfirmed} isSuccess={isSuccess} />
                {showCashOutAmount && <S_CashOutValue>{amount}</S_CashOutValue>}
            </S_CashOutButton>

            {showInfoIcon && <InfoIconContainer />}
        </S_CashOutWrapper>
    );
};

export default CashOutActionButton;
