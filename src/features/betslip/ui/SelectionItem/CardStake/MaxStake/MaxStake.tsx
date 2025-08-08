import isNil from 'lodash/isNil';
import { useAtomValue } from 'jotai';

import { currencySelector } from '@solo-account/store/selectors';

import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';
import { I18n } from 'src/ui/common/Language/I18n';
import { amountFormatter, formatStrAmount } from 'src/utils/format';

import { getFormattedValueWithCurrency } from '../../../SelectionList/utils';
import { S_PossibleWinnings, TextWrapper } from '../styled';

interface Props {
    maxStake: number | null | undefined;
    isDisabled: boolean;
}

const MaxStake = ({ maxStake, isDisabled }: Props) => {
    const currency = useAtomValue(currencySelector);
    const translatedCurrency = useTranslatedCurrency();

    if (isNil(maxStake)) {
        return null;
    }

    const formattedMaxStake = getFormattedValueWithCurrency(
        currency,
        formatStrAmount(amountFormatter(maxStake, false, currency), undefined, currency),
        translatedCurrency,
    );

    return (
        <S_PossibleWinnings isDisabled={isDisabled}>
            <TextWrapper>
                <I18n langKey='betslip.selection.max-bet.label' defaultText='Max Bet:' />
            </TextWrapper>
            &nbsp;
            <TextWrapper>{formattedMaxStake}</TextWrapper>
        </S_PossibleWinnings>
    );
};

export default MaxStake;
