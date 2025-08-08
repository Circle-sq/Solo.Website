import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { useRecoilValue } from 'recoil';

import { currencySelector } from '@solo-account/store/selectors';

import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';
import { I18n } from 'src/ui/common/Language/I18n';
import { amountFormatter, formatStrAmount } from 'src/utils/format';

import { possibleWinningsSelector } from '../../../store/selectors/stake';
import { S_StakeAmount, S_SummaryTotal } from '../styled';

const PossibleWinnings = () => {
    const currency = useAtomValue(currencySelector);
    const translatedCurrency = useTranslatedCurrency();
    const possibleWinnings = useRecoilValue(possibleWinningsSelector);

    const visualWinnings = useMemo(
        () => formatStrAmount(amountFormatter(possibleWinnings, false, currency), undefined, currency),
        [possibleWinnings, currency],
    );

    return (
        <S_SummaryTotal>
            <I18n langKey='betslip.system.possible.winnings' defaultText='Possible winnings' />
            <S_StakeAmount data-testid='possibleWinnings'>{`${visualWinnings} ${translatedCurrency}`}</S_StakeAmount>
        </S_SummaryTotal>
    );
};

export default PossibleWinnings;
