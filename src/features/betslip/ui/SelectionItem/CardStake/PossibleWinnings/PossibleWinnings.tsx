import { useMemo } from 'react';
import { useAtomValue } from 'jotai';

import { currencySelector } from '@solo-account/store/selectors';

import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';
import { I18n } from 'src/ui/common/Language/I18n';
import { amountFormatter, formatStrAmount } from 'src/utils/format';

import { getFormattedValueWithCurrency } from '../../../SelectionList/utils';
import { S_PossibleWinnings, TextBold, TextWrapper } from '../styled';

const PossibleWinnings = ({ possibleReturns, isDisabled }: { possibleReturns: number; isDisabled: boolean }) => {
    const currency = useAtomValue(currencySelector);
    const translatedCurrency = useTranslatedCurrency();

    const possibleWinnings = useMemo(
        () =>
            getFormattedValueWithCurrency(
                currency,
                formatStrAmount(amountFormatter(possibleReturns, false)),
                translatedCurrency,
            ),
        [currency, possibleReturns, translatedCurrency],
    );

    return (
        <S_PossibleWinnings isDisabled={isDisabled}>
            <TextWrapper>
                <I18n langKey='betslip.selection.possible-winnings.label' defaultText='Possible winnings:' />
            </TextWrapper>
            &nbsp;
            <TextBold>{possibleWinnings}</TextBold>
        </S_PossibleWinnings>
    );
};

export default PossibleWinnings;
