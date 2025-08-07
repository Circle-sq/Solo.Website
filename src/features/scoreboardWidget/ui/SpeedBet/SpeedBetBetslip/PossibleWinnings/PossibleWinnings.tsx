import { useAtomValue } from 'jotai';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useRecoilValue } from 'recoil';

import { currencySelector } from '@sc-account/store/selectors';

import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';
import { I18n } from 'src/ui/common/Language/I18n';
import { amountFormatter, formatStrAmount } from 'src/utils/format';

import { possibleBetsAtom } from '../../../../store/atoms';

import { S_PossibleWinnings } from './styled';

const PossibleWinnings = () => {
    const currency = useAtomValue(currencySelector);

    const translatedCurrency = useTranslatedCurrency();

    const possibleBets = useRecoilValue(possibleBetsAtom);

    const potentialReturns = get(possibleBets, 'bets[0].potentialReturns', 0);

    const parsedPossibleWinnings = formatStrAmount(
        amountFormatter(potentialReturns, false, currency),
        undefined,
        currency,
    );

    if (isEmpty(possibleBets)) {
        return <S_PossibleWinnings data-testid='speedBetslipPossibleWinnings'></S_PossibleWinnings>;
    }

    return (
        <S_PossibleWinnings data-testid='speedBetslipPossibleWinnings'>
            <I18n langKey='betslip.receipt.possible.winning' defaultText='Possible winnings' />:{' '}
            {parsedPossibleWinnings} {translatedCurrency}
        </S_PossibleWinnings>
    );
};

export default PossibleWinnings;
