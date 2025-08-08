import { useAtomValue } from 'jotai';
import { useRecoilValue } from 'recoil';

import { currencySelector } from '@solo-account/store/selectors';

import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';
import { I18n } from 'src/ui/common/Language/I18n';
import { amountFormatter, formatStrAmount } from 'src/utils/format';

import { isMaxBetValueAvailableSelector } from '../../store/selectors/betslipBets';
import { hasSummaryStakeErrorSelector, summaryStakeErrorSelector } from '../../store/selectors/errors';
import { maxStakeSelector } from '../../store/selectors/stake';
import MinMaxStakeError from '../MinMaxStakeError/MinMaxStakeError';

import { S_MaxBetText, S_TextBold } from './styled';

const SummaryMaxStake = () => {
    const currency = useAtomValue(currencySelector);
    const translatedCurrency = useTranslatedCurrency();

    const maxStake = useRecoilValue(maxStakeSelector);
    const summaryStakeError = useRecoilValue(summaryStakeErrorSelector);
    const hasSummaryStakeError = useRecoilValue(hasSummaryStakeErrorSelector);
    const isMaxBetValueAvailable = useRecoilValue(isMaxBetValueAvailableSelector);

    if (hasSummaryStakeError) {
        return <MinMaxStakeError error={summaryStakeError} />;
    }

    if (isMaxBetValueAvailable && maxStake) {
        const visualMaxStake = formatStrAmount(amountFormatter(maxStake, false, currency), undefined, currency);

        return (
            <S_MaxBetText>
                <I18n langKey='betslip.selection.max-bet.label' defaultText='Max Bet' />
                &nbsp;
                <S_TextBold>{`${visualMaxStake} ${translatedCurrency}`}</S_TextBold>
            </S_MaxBetText>
        );
    }

    return null;
};

export default SummaryMaxStake;
