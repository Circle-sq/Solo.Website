import { useAtomValue } from 'jotai';

import { currencySelector } from '@solo-account/store/selectors';

import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';
import { I18n } from 'src/ui/common/Language/I18n';
import { amountFormatter, formatStrAmount } from 'src/utils/format';

import { S_AmountLabel, S_AmountValue, S_PossibleWinnings, S_TotalStake } from './styled';

interface Props {
    potentialReturns: number;
    stakePerLine?: number | null;
}

const BetReceiptLegStakeInfo = ({ potentialReturns, stakePerLine = null }: Props) => {
    const currency = useAtomValue(currencySelector);
    const translatedCurrency = useTranslatedCurrency();
    const totalStakeAmount = formatStrAmount(amountFormatter(stakePerLine, false, currency), undefined, currency);
    const possibleWinning = formatStrAmount(amountFormatter(potentialReturns, false, currency), undefined, currency);

    return (
        <>
            <S_TotalStake>
                <S_AmountLabel>
                    <I18n langKey='betslip.receipt.stake' defaultText='Stake' />
                </S_AmountLabel>
                &nbsp;
                <S_AmountValue>
                    {totalStakeAmount} {translatedCurrency}
                </S_AmountValue>
            </S_TotalStake>

            <S_PossibleWinnings>
                <S_AmountLabel>
                    <I18n langKey='betslip.receipt.possible.winning' defaultText='Possible winnings' />
                </S_AmountLabel>
                &nbsp;
                <S_AmountValue>
                    {possibleWinning} {translatedCurrency}
                </S_AmountValue>
            </S_PossibleWinnings>
        </>
    );
};

export default BetReceiptLegStakeInfo;
